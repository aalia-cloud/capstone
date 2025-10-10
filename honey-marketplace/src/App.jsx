import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider, useCart } from './contexts/CartContext';
import './App.css';

// Components
import Header from './components/ui/Header';
import HeroSection from './components/ui/HeroSection';
import ProductCard from './components/ui/ProductCard';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';

// Icons
import { 
  Scan, 
  Leaf, 
  Award, 
  Users, 
  ArrowRight,
  Star,
  MapPin,
  Calendar
} from 'lucide-react';

// Sample data
const sampleProducts = [
  {
    id: 1,
    name: "Mint Blossom Honey",
    price: 25,
    image: "/src/assets/anNLvZ16TeG7.jpg",
    origin: "Al Dhafra Apiary",
    harvestSeason: "Spring 2024",
    quality: "Organic",
    description: "Refreshing minty flavor with delicate floral notes. Perfect for tea and desserts.",
    hasNFT: true,
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Acacia Honey",
    price: 30,
    image: "/src/assets/D5ZGzxW0P3i3.jpg",
    origin: "Bee Farm #5",
    harvestSeason: "Summer 2024",
    quality: "Grade A",
    description: "Delicate, lightly sweet taste with subtle floral undertones.",
    hasNFT: true,
    inStock: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: "Raw Honeycomb",
    price: 40,
    image: "/src/assets/UmwNcmqldblm.jpg",
    origin: "Al Dhafra Apiary",
    harvestSeason: "Spring 2024",
    quality: "Premium",
    description: "Rich floral aroma with natural caramel notes. Straight from the hive.",
    hasNFT: true,
    inStock: true,
    rating: 5.0,
    reviews: 67
  }
];

const HomePage = () => {
  const { addToCart } = useCart();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log('Added to cart:', product);
  };

  const handleViewDetails = (product) => {
    console.log('View details:', product);
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
    console.log('Wallet connection toggled');
  };

  const handleScanBarcode = () => {
    console.log('Scan barcode clicked');
  };

  const handleExploreClick = () => {
    navigate('/marketplace');
  };

  const handleTraceClick = () => {
    console.log('Trace honey clicked');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isWalletConnected={isWalletConnected}
        onConnectWallet={handleConnectWallet}
        onProfileClick={() => console.log('Profile clicked')}
        onScanBarcode={handleScanBarcode}
      />

      {/* Hero Section */}
      <HeroSection 
        onExploreClick={handleExploreClick}
        onTraceClick={handleTraceClick}
      />

      {/* How BeeSure Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">How BeeSure Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our blockchain-powered platform ensures complete transparency from hive to home
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Scan className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan your jar's code</h3>
              <p className="text-muted-foreground">
                Use our QR scanner to instantly access your honey's digital certificate
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">See its farm-to-jar journey</h3>
              <p className="text-muted-foreground">
                Track the complete journey from the apiary to your table
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Know it's 100% pure and local</h3>
              <p className="text-muted-foreground">
                Verified authenticity through blockchain technology and NFT certificates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-2">Featured Honey</h2>
              <p className="text-muted-foreground">
                Premium honey with blockchain verification
              </p>
            </div>
            <Button
              variant="outline"
              className="smooth-hover"
              onClick={() => navigate('/marketplace')}
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="nft-badge mb-4">
              <Leaf className="w-3 h-3 mr-1" />
              Sustainability & Ethics
            </Badge>
            
            <h2 className="text-3xl font-serif font-bold mb-6">
              Sustainability & Ethical Beekeeping
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              We are committed to promoting sustainable and ethical beekeeping practices. 
              By supporting responsible beekeepers, we help protect bee populations and preserve biodiversity.
            </p>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <Card className="smooth-hover">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Environmental Protection</h3>
                      <p className="text-sm text-muted-foreground">
                        Our partner apiaries follow sustainable practices that protect local ecosystems and promote biodiversity.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="smooth-hover">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Supporting Beekeepers</h3>
                      <p className="text-sm text-muted-foreground">
                        We work directly with local beekeepers, ensuring fair compensation and supporting traditional practices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground">
              Trusted by honey lovers worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="smooth-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "I love knowing exactly where my honey comes from. BeeSure gives me confidence in the product's authenticity."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Sarah Johnson</div>
                    <div className="text-xs text-muted-foreground">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="smooth-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "As a beekeeper, partnering with BeeSure has been a game changer. It showcases the hard work and authenticity of our craft."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Ahmed Al-Rashid</div>
                    <div className="text-xs text-muted-foreground">Partner Beekeeper</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 honey-gradient rounded-sm"></div>
                  </div>
                </div>
                <div className="font-serif font-bold text-lg text-primary">
                  BeeSure
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Blockchain-verified honey marketplace ensuring authenticity and traceability.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="/marketplace" className="hover:text-primary transition-colors">Marketplace</a></li>
                <li><a href="/trace" className="hover:text-primary transition-colors">Trace your Honey</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="/support" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Use</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 BeeSure - All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Import the new Marketplace component
import MarketplacePage from './components/MarketplacePage';
import AboutPage from './components/AboutPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';

// Import admin components
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ProfilePage from './components/ProfilePage';
import CustomerDashboard from './components/CustomerDashboard';
import CartPage from './components/CartPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import ProductManagement from './components/admin/ProductManagement';
import ProductForm from './components/admin/ProductForm';
import UserManagement from './components/admin/UserManagement';
import Analytics from './components/admin/Analytics';
import DebugPage from './components/DebugPage';

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700">Loading BeeSure...</h2>
      <p className="text-gray-500 mt-2">Initializing your honey marketplace</p>
    </div>
  </div>
);

// Main app content that uses AuthContext
const AppContent = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute requireCustomer={true}>
                <CustomerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/debug" element={<DebugPage />} />

            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="products/new" element={<ProductForm mode="create" />} />
              <Route path="products/:id/edit" element={<ProductForm mode="edit" />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
    </Routes>
  );
};

// Main App component
function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;

