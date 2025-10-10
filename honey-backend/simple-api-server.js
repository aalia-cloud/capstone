const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

// Sample product data
const products = [
  {
    id: 1,
    name: "Mint Blossom Honey",
    price: 25.0,
    origin: "Al Dhafra Apiary",
    harvest_season: "Spring 2024",
    quality: "Organic",
    description: "Refreshing minty flavor with delicate floral notes. Perfect for tea and desserts.",
    image_url: "/src/assets/anNLvZ16TeG7.jpg",
    in_stock: true,
    barcode: "DEMO-123456789"
  },
  {
    id: 2,
    name: "Acacia Honey",
    price: 30.0,
    origin: "Bee Farm #5",
    harvest_season: "Summer 2024",
    quality: "Grade A",
    description: "Delicate, lightly sweet taste with subtle floral undertones.",
    image_url: "/src/assets/D5ZGzxW0P3i3.jpg",
    in_stock: true,
    barcode: "DEMO-987654321"
  },
  {
    id: 3,
    name: "Raw Honeycomb",
    price: 40.0,
    origin: "Al Dhafra Apiary",
    harvest_season: "Spring 2024",
    quality: "Premium",
    description: "Rich floral aroma with natural caramel notes. Straight from the hive.",
    image_url: "/src/assets/UmwNcmqldblm.jpg",
    in_stock: true,
    barcode: "DEMO-456789123"
  }
];

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse URL
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  // Handle API routes
  if (pathname.startsWith('/api/')) {
    handleAPIRequest(req, res, url);
    return;
  }

  // Serve static files
  let filePath = path.join(__dirname, 'src', 'static', req.url === '/' ? 'index.html' : req.url);
  
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'src', 'static', 'index.html');
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

function handleAPIRequest(req, res, url) {
  const pathname = url.pathname;
  
  if (pathname === '/api/users' && req.method === 'GET') {
    // Return sample users
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
      { id: 1, email: 'user@example.com', name: 'John Doe' },
      { id: 2, email: 'admin@example.com', name: 'Jane Smith' }
    ]));
  } 
  else if (pathname === '/api/barcode/generate' && req.method === 'POST') {
    // Generate barcode
    const productId = url.searchParams.get('product_id') || '1';
    const barcodeValue = 'DEMO-' + Math.random().toString(36).substr(2, 9);
    
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Barcode and QR code generated successfully',
      barcode_value: barcodeValue,
      barcode_image_url: `/static/codes/${barcodeValue}_barcode.png`,
      qr_code_image_url: `/static/codes/${barcodeValue}_qr.png`,
      verification_url: `https://beesure.com/verify?barcode=${barcodeValue}`
    }));
  }
  else if (pathname === '/api/barcode/verify' && req.method === 'GET') {
    // Verify barcode
    const barcodeValue = url.searchParams.get('barcode');
    
    if (!barcodeValue) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Barcode is required' }));
      return;
    }
    
    const product = products.find(p => p.barcode === barcodeValue);
    
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid or unregistered barcode' }));
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        origin: product.origin,
        harvest_season: product.harvest_season,
        quality: product.quality,
        description: product.description
      }
    }));
  }
  else if (pathname === '/api/products' && req.method === 'GET') {
    // Return all products
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  }
  else if (pathname === '/api/admin/products' && req.method === 'POST') {
    // Create new product (admin only)
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const productData = JSON.parse(body);
        const newProduct = {
          id: products.length + 1,
          ...productData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        products.push(newProduct);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          data: newProduct,
          message: 'Product created successfully'
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid product data'
        }));
      }
    });
  }
  else if (pathname.startsWith('/api/admin/products/') && req.method === 'PUT') {
    // Update product (admin only)
    const productId = parseInt(pathname.split('/').pop());
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const productData = JSON.parse(body);
        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            error: 'Product not found'
          }));
          return;
        }

        products[productIndex] = {
          ...products[productIndex],
          ...productData,
          updated_at: new Date().toISOString()
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          data: products[productIndex],
          message: 'Product updated successfully'
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid product data'
        }));
      }
    });
  }
  else if (pathname.startsWith('/api/admin/products/') && req.method === 'DELETE') {
    // Delete product (admin only)
    const productId = parseInt(pathname.split('/').pop());
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: 'Product not found'
      }));
      return;
    }

    products.splice(productIndex, 1);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      message: 'Product deleted successfully'
    }));
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
}

server.listen(PORT, () => {
  console.log(`Backend API server running at http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET /api/products - Get all products`);
  console.log(`  GET /api/users - Get all users`);
  console.log(`  POST /api/barcode/generate - Generate barcode`);
  console.log(`  GET /api/barcode/verify - Verify barcode`);
});
