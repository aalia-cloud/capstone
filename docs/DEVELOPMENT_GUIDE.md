# BeeSure Development Guide

## Development Environment Setup

### Prerequisites
- **Node.js** 18+ with npm/pnpm
- **Python** 3.8+ (for Flask backend)
- **Git** for version control
- **VS Code** (recommended IDE)
- **MetaMask** browser extension for Web3 testing

### IDE Configuration

#### VS Code Extensions
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-python.python",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

#### Settings.json
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "html": "HTML"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

### Local Development Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd honey-marketplace
   
   # Frontend setup
   cd honey-marketplace
   npm install --legacy-peer-deps
   
   # Backend setup
   cd ../honey-backend
   pip install -r requirements.txt
   ```

2. **Environment Configuration**
   ```bash
   # Frontend .env.local
   VITE_API_BASE_URL=http://localhost:5000
   VITE_BLOCKCHAIN_NETWORK=localhost
   VITE_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
   
   # Backend .env
   DATABASE_URL=sqlite:///dev.db
   SECRET_KEY=dev-secret-key
   FLASK_ENV=development
   ```

3. **Start Development Servers**
   ```bash
   # Terminal 1: Backend
   cd honey-backend
   python src/main.py
   
   # Terminal 2: Frontend
   cd honey-marketplace
   npm run dev
   ```

## Project Architecture

### Frontend Structure
```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
├── lib/                # Utility libraries
│   ├── blockchain.js   # Web3 integration
│   ├── utils.js        # Helper functions
│   └── design-system.js # Design tokens
├── hooks/              # Custom React hooks
├── assets/             # Static assets
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

### Backend Structure
```
src/
├── models/             # Database models
├── routes/             # API endpoints
├── database/           # Database files
├── static/             # Static file serving
└── main.py             # Flask app entry
```

## Coding Standards

### JavaScript/React Guidelines

#### Component Structure
```jsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ProductCard = ({ 
  product, 
  onAddToCart, 
  className,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart(product);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("product-card", className)} {...props}>
      {/* Component content */}
    </div>
  );
};

export default ProductCard;
```

#### Naming Conventions
- **Components**: PascalCase (`ProductCard`)
- **Functions**: camelCase (`handleAddToCart`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Files**: kebab-case (`product-card.jsx`)

#### State Management
```jsx
// Use useState for local component state
const [products, setProducts] = useState([]);

// Use useEffect for side effects
useEffect(() => {
  fetchProducts();
}, []);

// Custom hooks for reusable logic
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return { products, loading, fetchProducts };
};
```

### Python/Flask Guidelines

#### Route Structure
```python
from flask import Blueprint, request, jsonify
from src.models.product import Product, db

product_bp = Blueprint('product', __name__)

@product_bp.route('/products', methods=['GET'])
def get_products():
    """Get all products with optional filtering."""
    try:
        # Query parameters
        origin = request.args.get('origin')
        in_stock = request.args.get('in_stock', type=bool)
        
        # Build query
        query = Product.query
        if origin:
            query = query.filter(Product.origin.ilike(f'%{origin}%'))
        if in_stock is not None:
            query = query.filter(Product.in_stock == in_stock)
        
        products = query.all()
        
        return jsonify({
            'success': True,
            'data': [product.to_dict() for product in products],
            'count': len(products)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
```

#### Model Structure
```python
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convert model to dictionary."""
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Product {self.name}>'
```

## Testing Strategy

### Frontend Testing

#### Unit Tests (Jest + React Testing Library)
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

const mockProduct = {
  id: 1,
  name: 'Test Honey',
  price: 25,
  image: '/test-image.jpg'
};

describe('ProductCard', () => {
  test('renders product information', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Honey')).toBeInTheDocument();
    expect(screen.getByText('$25')).toBeInTheDocument();
  });
  
  test('calls onAddToCart when button clicked', () => {
    const mockAddToCart = jest.fn();
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart} 
      />
    );
    
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
```

#### Integration Tests
```jsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock API calls
jest.mock('./lib/api', () => ({
  getProducts: jest.fn(() => Promise.resolve({ data: [] }))
}));

test('loads and displays products', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  await waitFor(() => {
    expect(screen.getByText('Featured Honey')).toBeInTheDocument();
  });
});
```

### Backend Testing

#### Unit Tests (pytest)
```python
import pytest
from src.main import app
from src.models.product import Product, db

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client

def test_get_products(client):
    """Test getting all products."""
    # Create test product
    product = Product(name='Test Honey', price=25.0)
    db.session.add(product)
    db.session.commit()
    
    response = client.get('/api/products')
    assert response.status_code == 200
    
    data = response.get_json()
    assert data['success'] is True
    assert len(data['data']) == 1
    assert data['data'][0]['name'] == 'Test Honey'

def test_create_product(client):
    """Test creating a new product."""
    product_data = {
        'name': 'New Honey',
        'price': 30.0,
        'origin': 'Test Farm'
    }
    
    response = client.post('/api/products', json=product_data)
    assert response.status_code == 201
    
    data = response.get_json()
    assert data['success'] is True
    assert data['data']['name'] == 'New Honey'
```

## Blockchain Development

### Smart Contract Integration

#### Contract Interface
```javascript
// lib/contracts/HoneyNFT.js
export const HONEY_NFT_ABI = [
  {
    "inputs": [
      {"name": "to", "type": "address"},
      {"name": "tokenURI", "type": "string"}
    ],
    "name": "mintNFT",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
  }
];

export const CONTRACT_ADDRESS = "0x742d35Cc6634C0532925a3b8D4C0C8b3C2e1e1e1";
```

#### Web3 Integration
```javascript
// lib/blockchain.js
import { ethers } from 'ethers';
import { HONEY_NFT_ABI, CONTRACT_ADDRESS } from './contracts/HoneyNFT';

class BlockchainService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
  }

  async connect() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.signer = this.provider.getSigner();
      this.contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        HONEY_NFT_ABI,
        this.signer
      );
      return true;
    }
    return false;
  }

  async mintHoneyNFT(productData) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const metadata = {
      name: `BeeSure Certificate - ${productData.name}`,
      description: productData.description,
      image: productData.image,
      attributes: [
        { trait_type: "Origin", value: productData.origin },
        { trait_type: "Harvest Season", value: productData.harvestSeason }
      ]
    };
    
    // In production, upload metadata to IPFS
    const tokenURI = `https://ipfs.io/ipfs/${metadataHash}`;
    
    const tx = await this.contract.mintNFT(
      await this.signer.getAddress(),
      tokenURI
    );
    
    return await tx.wait();
  }
}

export default new BlockchainService();
```

## API Development

### Error Handling
```python
from functools import wraps
from flask import jsonify

def handle_errors(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except ValidationError as e:
            return jsonify({
                'success': False,
                'error': 'Validation error',
                'details': e.messages
            }), 400
        except NotFoundError as e:
            return jsonify({
                'success': False,
                'error': 'Resource not found'
            }), 404
        except Exception as e:
            return jsonify({
                'success': False,
                'error': 'Internal server error'
            }), 500
    return decorated_function

@product_bp.route('/products/<int:product_id>')
@handle_errors
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify({
        'success': True,
        'data': product.to_dict()
    })
```

### Input Validation
```python
from marshmallow import Schema, fields, validate

class ProductSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    price = fields.Float(required=True, validate=validate.Range(min=0))
    origin = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    description = fields.Str(validate=validate.Length(max=500))

@product_bp.route('/products', methods=['POST'])
def create_product():
    schema = ProductSchema()
    try:
        data = schema.load(request.json)
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 400
    
    product = Product(**data)
    db.session.add(product)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'data': product.to_dict()
    }), 201
```

## Performance Optimization

### Frontend Optimization
```jsx
// Lazy loading components
const ProductDetails = lazy(() => import('./ProductDetails'));

// Memoization for expensive calculations
const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveCalculation(item));
  }, [data]);
  
  return <div>{/* Render processed data */}</div>;
});

// Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window';

const ProductList = ({ products }) => (
  <List
    height={600}
    itemCount={products.length}
    itemSize={200}
    itemData={products}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <ProductCard product={data[index]} />
      </div>
    )}
  </List>
);
```

### Backend Optimization
```python
# Database query optimization
def get_products_optimized():
    products = Product.query.options(
        joinedload(Product.certificates)
    ).filter(
        Product.in_stock == True
    ).all()
    
    return products

# Caching with Redis
from flask_caching import Cache

cache = Cache(app, config={'CACHE_TYPE': 'redis'})

@cache.memoize(timeout=300)
def get_popular_products():
    return Product.query.filter(
        Product.rating >= 4.5
    ).limit(10).all()
```

## Debugging and Troubleshooting

### Frontend Debugging
```jsx
// Debug hooks
const useDebugValue = (value, label) => {
  useEffect(() => {
    console.log(`${label}:`, value);
  }, [value, label]);
};

// Error boundaries
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### Backend Debugging
```python
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s %(name)s %(message)s'
)

logger = logging.getLogger(__name__)

@product_bp.route('/products')
def get_products():
    logger.debug('Fetching products from database')
    
    try:
        products = Product.query.all()
        logger.info(f'Found {len(products)} products')
        return jsonify({'data': [p.to_dict() for p in products]})
    except Exception as e:
        logger.error(f'Error fetching products: {str(e)}')
        raise
```

## Git Workflow

### Branch Strategy
```bash
# Feature development
git checkout -b feature/product-search
git commit -m "feat: add product search functionality"
git push origin feature/product-search

# Bug fixes
git checkout -b fix/cart-calculation
git commit -m "fix: correct cart total calculation"

# Releases
git checkout -b release/v1.1.0
git commit -m "chore: bump version to 1.1.0"
```

### Commit Messages
Follow conventional commits:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks
