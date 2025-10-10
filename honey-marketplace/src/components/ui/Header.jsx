import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from './button';
import { Badge } from './badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Wallet,
  QrCode,
  Settings,
  LogOut,
  UserCircle
} from 'lucide-react';
import { Input } from './input';
import beesureLogo from '../../assets/beesurelogo.png';

const Header = ({
  isWalletConnected = false,
  onConnectWallet,
  onProfileClick,
  onScanBarcode,
  className = ""
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Get cart count from cart context
  let cartItemsCount = 0;
  let getCartItemCount = null;

  try {
    const cartContext = useCart();
    getCartItemCount = cartContext.getCartItemCount;
    cartItemsCount = getCartItemCount();
  } catch {
    // Cart context might not be available in all contexts
    cartItemsCount = 0;
  }

  // Safely use auth context - it might not be available in all contexts
  let user = null;
  let isAdmin = () => false;
  let logout = () => {};

  try {
    const auth = useAuth();
    user = auth.user;
    isAdmin = auth.isAdmin;
    logout = auth.logout;
  } catch {
    // AuthContext not available, use defaults
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAdminDashboard = () => {
    navigate('/admin');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleProfile = () => {
    // Call the original onProfileClick if provided, or navigate to profile page
    if (onProfileClick) {
      onProfileClick();
    } else {
      navigate('/profile');
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Trace Honey', href: '/trace' },
    { name: 'About us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  // Add admin navigation for admin users
  if (isAdmin()) {
    navigation.push({ name: 'Admin', href: '/admin' });
  }

  return (
    <header className={`bg-background border-b border-border sticky top-0 z-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={beesureLogo}
              alt="BeeSure Logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors font-medium ${
                  location.pathname === item.href
                    ? 'text-primary font-semibold'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search honey products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Barcode Scanner */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onScanBarcode}
              className="hidden sm:flex smooth-hover"
            >
              <QrCode className="w-5 h-5" />
            </Button>

            {/* Wallet Connection */}
            <Button
              variant={isWalletConnected ? "secondary" : "outline"}
              size="sm"
              onClick={onConnectWallet}
              className="hidden sm:flex smooth-hover"
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isWalletConnected ? 'Connected' : 'Connect Wallet'}
            </Button>

            {/* Shopping Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCartClick}
              className="relative smooth-hover"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* User Profile / Login */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 smooth-hover"
                  >
                    <span className="text-sm text-muted-foreground hidden sm:block">
                      {user.name}
                    </span>
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleProfile}>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  {isAdmin() && (
                    <DropdownMenuItem onClick={handleAdminDashboard}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="smooth-hover"
              >
                <Link to="/login">Login</Link>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search honey products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors font-medium px-2 py-1 ${
                    location.pathname === item.href
                      ? 'text-primary font-semibold'
                      : 'text-foreground hover:text-primary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile-only actions */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onScanBarcode?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Scan Barcode
                </Button>

                <Button
                  variant={isWalletConnected ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => {
                    onConnectWallet?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
                </Button>
              </div>

              {/* Mobile User Account Section */}
              {user && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                  <div className="px-2 py-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleProfile();
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <UserCircle className="w-4 h-4 mr-2" />
                    Profile
                  </Button>

                  {isAdmin() && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleAdminDashboard();
                        setIsMobileMenuOpen(false);
                      }}
                      className="justify-start"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

