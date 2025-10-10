# BeeSure API Documentation

## Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://api.beesure.com`

## Authentication
Currently, the API does not require authentication for most endpoints. Future versions will implement JWT-based authentication.

## Response Format
All API responses follow a consistent JSON format:

```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "timestamp": "2025-01-01T00:00:00Z"
}
```

## Error Handling
Error responses include appropriate HTTP status codes and error details:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2025-01-01T00:00:00Z"
}
```

## Endpoints

### Products

#### Get All Products
```http
GET /api/products
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Mint Blossom Honey",
      "price": 25.0,
      "origin": "Al Dhafra Apiary",
      "harvest_season": "Spring 2024",
      "quality": "Organic",
      "description": "Refreshing minty flavor with delicate floral notes.",
      "image_url": "/src/assets/anNLvZ16TeG7.jpg",
      "barcode": "DEMO-123456789",
      "in_stock": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Get Product by ID
```http
GET /api/products/{id}
```

**Parameters:**
- `id` (integer): Product ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Mint Blossom Honey",
    "price": 25.0,
    "origin": "Al Dhafra Apiary",
    "harvest_season": "Spring 2024",
    "quality": "Organic",
    "description": "Refreshing minty flavor with delicate floral notes.",
    "image_url": "/src/assets/anNLvZ16TeG7.jpg",
    "barcode": "DEMO-123456789",
    "in_stock": true,
    "certificates": [],
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### Users

#### Get All Users
```http
GET /api/users
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "wallet_address": "0x742d35Cc6634C0532925a3b8D4C0C8b3C2e1e1e1",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Create User
```http
POST /api/users
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "wallet_address": "0x742d35Cc6634C0532925a3b8D4C0C8b3C2e1e1e1"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "email": "john@example.com",
    "name": "John Doe",
    "wallet_address": "0x742d35Cc6634C0532925a3b8D4C0C8b3C2e1e1e1",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "User created successfully"
}
```

#### Get User by ID
```http
GET /api/users/{id}
```

**Parameters:**
- `id` (integer): User ID

### Barcode & Verification

#### Generate Barcode
```http
POST /api/barcode/generate
```

**Request Body:**
```json
{
  "product_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "barcode_value": "DEMO-abc123def",
    "barcode_image_url": "/static/codes/DEMO-abc123def_barcode.png",
    "qr_code_image_url": "/static/codes/DEMO-abc123def_qr.png",
    "verification_url": "https://beesure.com/verify?barcode=DEMO-abc123def"
  },
  "message": "Barcode and QR code generated successfully"
}
```

#### Verify Barcode
```http
GET /api/barcode/verify?barcode={barcode_value}
```

**Query Parameters:**
- `barcode` (string): Barcode value to verify

**Response (Valid Barcode):**
```json
{
  "success": true,
  "data": {
    "product": {
      "id": 1,
      "name": "Mint Blossom Honey",
      "origin": "Al Dhafra Apiary",
      "harvest_season": "Spring 2024",
      "quality": "Organic",
      "description": "Refreshing minty flavor with delicate floral notes."
    }
  },
  "message": "Product verified successfully"
}
```

**Response (Invalid Barcode):**
```json
{
  "success": false,
  "error": "Invalid or unregistered barcode",
  "code": "BARCODE_NOT_FOUND"
}
```

### Certificates

#### Get Product Certificates
```http
GET /api/products/{id}/certificates
```

**Parameters:**
- `id` (integer): Product ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "product_id": 1,
      "certificate_id": "CERT-2024-001",
      "batch_number": "BATCH-001",
      "harvest_date": "2024-03-15",
      "expiry_date": "2026-03-15",
      "quality_tests": {
        "moisture_content": "18.2%",
        "ph_level": "3.9",
        "antibacterial_activity": "High"
      },
      "beekeeper_signature": "0x...",
      "blockchain_hash": "0x...",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Status Codes

- `200` - OK: Request successful
- `201` - Created: Resource created successfully
- `400` - Bad Request: Invalid request parameters
- `404` - Not Found: Resource not found
- `500` - Internal Server Error: Server error

## Rate Limiting

Currently, no rate limiting is implemented. Future versions will include:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## CORS Policy

The API supports CORS for the following origins:
- `http://localhost:5173` (Development frontend)
- `http://localhost:5175` (Alternative development port)
- `https://beesure.com` (Production frontend)

## Data Models

### Product Model
```json
{
  "id": "integer",
  "name": "string",
  "price": "float",
  "origin": "string",
  "harvest_season": "string",
  "quality": "string",
  "description": "text",
  "image_url": "string",
  "barcode": "string",
  "nft_token_id": "string",
  "in_stock": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### User Model
```json
{
  "id": "integer",
  "email": "string",
  "name": "string",
  "password_hash": "string",
  "wallet_address": "string",
  "created_at": "datetime"
}
```

### Certificate Model
```json
{
  "id": "integer",
  "product_id": "integer",
  "certificate_id": "string",
  "batch_number": "string",
  "harvest_date": "date",
  "expiry_date": "date",
  "quality_tests": "json",
  "beekeeper_signature": "string",
  "blockchain_hash": "string",
  "created_at": "datetime"
}
```

## Testing the API

### Using cURL

```bash
# Get all products
curl -X GET http://localhost:5000/api/products

# Verify a barcode
curl -X GET "http://localhost:5000/api/barcode/verify?barcode=DEMO-123456789"

# Generate barcode
curl -X POST http://localhost:5000/api/barcode/generate \
  -H "Content-Type: application/json" \
  -d '{"product_id": 1}'
```

### Using Postman

Import the API collection:
1. Create a new collection in Postman
2. Add the base URL as a variable
3. Create requests for each endpoint
4. Test with sample data

## Future Enhancements

- JWT authentication
- API versioning
- GraphQL support
- WebSocket real-time updates
- Advanced filtering and pagination
- API analytics and monitoring
