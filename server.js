import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt"; // for hashing passwords
 
dotenv.config();
 
const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});
 
 
const pool = new Pool({
  user: "postgres",       // your PostgreSQL username
  host: "localhost",      // database host
  database: "postgres",    // your database name
  password: "root", // your PostgreSQL password
  port: 5432,             // default PostgreSQL port
});

// Test connection and initialize database
pool.connect()
  .then(async client => {
    console.log("✅ Connected to PostgreSQL database");

    // Initialize users table with authentication fields if it doesn't exist
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255),
          role VARCHAR(50) DEFAULT 'customer',
          wallet VARCHAR(255),
          phone VARCHAR(50),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Add password and role columns if they don't exist (for existing tables)
      await client.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='password') THEN
            ALTER TABLE users ADD COLUMN password VARCHAR(255);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
            ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'customer';
          END IF;
        END $$;
      `);

      console.log("✅ Database schema initialized");

      // Create default admin user if it doesn't exist
      const adminEmail = 'admin@beesure.com';
      const adminCheck = await client.query("SELECT * FROM users WHERE email = $1", [adminEmail]);

      if (adminCheck.rows.length === 0) {
        const hashedAdminPassword = await bcrypt.hash('admin123', 10);
        await client.query(
          "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
          ['Admin User', adminEmail, hashedAdminPassword, 'admin']
        );
        console.log("✅ Default admin user created");
      }

      // Create default customer user if it doesn't exist
      const customerEmail = 'user@beesure.com';
      const customerCheck = await client.query("SELECT * FROM users WHERE email = $1", [customerEmail]);

      if (customerCheck.rows.length === 0) {
        const hashedCustomerPassword = await bcrypt.hash('user123', 10);
        await client.query(
          "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
          ['John Doe', customerEmail, hashedCustomerPassword, 'customer']
        );
        console.log("✅ Default customer user created");
      }

    } catch (err) {
      console.error("❌ Database initialization error:", err);
    }

    client.release();
  })
  .catch(err => console.error("❌ Database connection error:", err.stack));


/**
 * Example routes
 */

// Get all users
app.get("/allusers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User Registration (Sign Up)
app.post("/signup", async (req, res) => {
  const { name, email, password, role = 'customer' } = req.body;

  try {
    // Check if user already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, created_at)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING id, name, email, role, created_at`,
      [name, email, hashedPassword, role]
    );

    // Return user data (without password)
    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0]
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Insert a new user (legacy endpoint - keeping for compatibility)
app.post("/users", async (req, res) => {
  const { wallet, name, email, phone } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (wallet, name, email, phone)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [wallet, name, email, phone]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all batches
app.get("/batches", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM batches ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching batches:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get jars for a specific batch
app.get("/batches/:id/jars", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM jars WHERE batch_id = $1 ORDER BY jar_no ASC",
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching jars:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new order
app.post("/orders", async (req, res) => {
  const { user_id, status, total_aed, chain_tx_hash } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO orders (user_id, status, total_aed, chain_tx_hash)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, status, total_aed, chain_tx_hash]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get an order with its items
app.get("/orders/:id", async (req, res) => {
  try {
    const orderRes = await pool.query("SELECT * FROM orders WHERE id = $1", [req.params.id]);
    const itemsRes = await pool.query("SELECT * FROM order_items WHERE order_id = $1", [req.params.id]);

    res.json({
      order: orderRes.rows[0],
      items: itemsRes.rows,
    });
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    // Check password (compare with hashed password in DB)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // If login successful, return user data (without password)
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || "customer", // default to customer if no role specified
      createdAt: user.created_at
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
