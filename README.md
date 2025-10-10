# BeeSure - Blockchain Verified Honey Marketplace

## 🍯 Project Overview

BeeSure is a premium honey marketplace that leverages blockchain technology to provide complete transparency and traceability from hive to home. The platform features NFT certificates, barcode verification, and a modern e-commerce interface for purchasing authentic honey products.

## ✨ Key Features

- **Blockchain Verification**: Each honey product comes with an NFT certificate stored on the blockchain
- **Barcode & QR Code Scanning**: Verify product authenticity through barcode scanning
- **Product Traceability**: Complete supply chain transparency from apiary to consumer
- **Wallet Integration**: MetaMask and Web3 wallet support for blockchain interactions
- **Modern UI/UX**: Built with React, Tailwind CSS, and shadcn/ui components
- **Real-time Inventory**: Live product availability and pricing
- **Responsive Design**: Optimized for desktop and mobile devices

## 🏗️ Architecture

### Frontend (React/Vite)
- **Framework**: React 19 with Vite build tool
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **State Management**: React hooks and context
- **Routing**: React Router DOM
- **Blockchain**: ethers.js and web3.js for Web3 integration

### Backend Options

#### Option 1: Flask API (Python)
- **Framework**: Flask with SQLAlchemy ORM
- **Database**: SQLite with models for Products, Users, and Certificates
- **Features**: Full CRUD operations, barcode generation, user management

#### Option 2: Node.js API (JavaScript)
- **Framework**: Native Node.js HTTP server
- **Features**: RESTful API endpoints, CORS support, static file serving
- **Data**: In-memory sample data for demonstration

## 📁 Project Structure

```
honey-marketplace/
├── honey-frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   └── ui/               # shadcn/ui components
│   │   ├── lib/                  # Utility libraries
│   │   │   ├── blockchain.js     # Web3 integration
│   │   │   ├── utils.js          # Helper functions
│   │   │   └── design-system.js  # Design tokens
│   │   ├── hooks/                # Custom React hooks
│   │   ├── assets/               # Images and static files
│   │   ├── App.jsx               # Main application component
│   │   └── main.jsx              # Application entry point
│   ├── package.json              # Dependencies and scripts
│   ├── vite.config.js            # Vite configuration
│   └── tailwind.config.js        # Tailwind CSS configuration
│
└── honey-backend/                 # Backend API server
    ├── src/
    │   ├── models/               # Database models
    │   │   ├── product.py        # Product, Certificate, User models
    │   │   └── user.py           # User model
    │   ├── routes/               # API route handlers
    │   │   ├── user.py           # User management endpoints
    │   │   └── barcode.py        # Barcode generation/verification
    │   ├── database/             # SQLite database files
    │   ├── static/               # Static file serving
    │   └── main.py               # Flask application entry point
    ├── simple-api-server.js      # Alternative Node.js server
    └── requirements.txt          # Python dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **pnpm** package manager
- **Python 3.8+** (optional, for Flask backend)
- **Git** for version control

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd honey-marketplace
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd honey-marketplace
   npm install --legacy-peer-deps
   ```

3. **Install Backend Dependencies (Python)**
   ```bash
   cd honey-backend
   pip install -r requirements.txt
   ```

### Running the Application

#### Option 1: Using Node.js Backend (Recommended for quick start)

1. **Start the Backend Server**
   ```bash
   # From project root
   node honey-backend/simple-api-server.js
   ```
   Server runs on: `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   # From honey-marketplace directory
   cd honey-marketplace
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173` (or next available port)

#### Option 2: Using Flask Backend (Full features)

1. **Start the Flask Server**
   ```bash
   cd honey-backend
   python src/main.py
   ```

2. **Start the Frontend** (same as above)

### 🌐 Application URLs

- **Frontend**: http://localhost:5175/
- **Backend API**: http://localhost:5000/
- **API Documentation**: Available through endpoint testing

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all honey products
- `GET /api/products/:id` - Get specific product details

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID

### Barcode & Verification
- `POST /api/barcode/generate` - Generate barcode for product
- `GET /api/barcode/verify?barcode=<code>` - Verify product authenticity

## 🔗 Blockchain Integration

### Smart Contract Features
- **NFT Minting**: Each honey product can be minted as an NFT certificate
- **Metadata Storage**: Product details stored on-chain or IPFS
- **Ownership Tracking**: Track product ownership through blockchain
- **Verification**: Immutable proof of authenticity

### Supported Networks
- Ethereum Mainnet
- Polygon
- Binance Smart Chain
- Local development networks

## 🎨 Design System

### Color Palette
- **Primary**: Honey gold (#F59E0B)
- **Secondary**: Deep amber (#D97706)
- **Accent**: Forest green (#059669)
- **Background**: Warm whites and creams
- **Text**: Rich browns and blacks

### Typography
- **Headings**: Serif fonts for elegance
- **Body**: Sans-serif for readability
- **Accent**: Script fonts for branding

### Components
- Modern card-based layouts
- Smooth animations and transitions
- Responsive grid systems
- Accessible form controls

## 🧪 Testing

### Frontend Testing
```bash
cd honey-marketplace
npm run test
```

### Backend Testing
```bash
cd honey-backend
python -m pytest tests/
```

## 🚀 Deployment

### Frontend Deployment
```bash
cd honey-marketplace
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
- **Flask**: Deploy to Heroku, AWS, or similar platforms
- **Node.js**: Deploy to Vercel, Netlify, or cloud providers

## 🔧 Configuration

### Environment Variables
Create `.env` files for configuration:

**Frontend (.env)**
```
VITE_API_BASE_URL=http://localhost:5000
VITE_BLOCKCHAIN_NETWORK=polygon
VITE_CONTRACT_ADDRESS=0x...
```

**Backend (.env)**
```
DATABASE_URL=sqlite:///app.db
SECRET_KEY=your-secret-key
CORS_ORIGINS=http://localhost:5173
```

## 📦 Dependencies

### Frontend Key Dependencies
- React 19 - UI framework
- Vite - Build tool and dev server
- Tailwind CSS - Utility-first CSS framework
- shadcn/ui - Component library
- ethers.js - Ethereum library
- React Router - Client-side routing
- Framer Motion - Animations

### Backend Key Dependencies
- Flask - Web framework
- SQLAlchemy - ORM
- Flask-CORS - Cross-origin requests
- python-barcode - Barcode generation
- qrcode - QR code generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation wiki

## 🔮 Future Roadmap

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Integration with more blockchain networks
- [ ] AI-powered quality assessment
- [ ] Subscription-based premium features
- [ ] Marketplace for beekeepers
- [ ] Carbon footprint tracking

---

**BeeSure** - *Bringing transparency to the honey supply chain through blockchain technology* 🍯⛓️
