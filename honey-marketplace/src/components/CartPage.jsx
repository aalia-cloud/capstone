import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Header from './ui/Header';
import Footer from './ui/Footer';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { 
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Home,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  AlertTriangle
} from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    cartItems,
    isLoading,
    updateQuantity,
    removeFromCart,
    clearCart,
    calculateTotals,
    formatCurrency,
    TAX_RATE,
    SHIPPING_COST,
    FREE_SHIPPING_THRESHOLD
  } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header />
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

 /* if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header />
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <Card className="p-12 text-center border-red-200 bg-red-50">
              <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h2 className="text-2xl font-bold text-red-800 mb-4">Error Loading Cart</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }*/

  const { subtotal, tax, shipping, total } = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      <main className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-amber-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-amber-700 font-medium">Shopping Cart</span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Button
              onClick={() => navigate('/marketplace')}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </div>

          {/* Empty Cart State */}
          {cartItems.length === 0 ? (
            <Card className="p-12 text-center bg-white border-gray-200">
              <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any honey products to your cart yet.
                Explore our premium collection of blockchain-verified honey.
              </p>
              <Button
                onClick={() => navigate('/marketplace')}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </Card>
          ) : (
            /* Cart Content */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white border-gray-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">Cart Items</CardTitle>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear Cart
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Clear Shopping Cart</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove all items from your cart?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={clearCart}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Clear Cart
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <ShoppingBag className="w-8 h-8 text-amber-600" />
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">
                            Producer: {item.producer || 'BeeSure Verified'}
                          </p>
                          <p className="text-lg font-bold text-amber-600">
                            {formatCurrency(item.price)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 text-center"
                            min="1"
                            max={item.stockQuantity || 99}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= (item.stockQuantity || 99)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Item Subtotal */}
                        <div className="text-right min-w-0">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} × {formatCurrency(item.price)}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card className="bg-white border-gray-200 sticky top-6">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                      <span className="font-semibold">{formatCurrency(subtotal)}</span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shipping</span>
                      <div className="text-right">
                        {shipping === 0 ? (
                          <div>
                            <span className="font-semibold text-green-600">FREE</span>
                            <p className="text-xs text-green-600">Free shipping applied!</p>
                          </div>
                        ) : (
                          <div>
                            <span className="font-semibold">{formatCurrency(shipping)}</span>
                            <p className="text-xs text-gray-500">
                              Free shipping on orders over {formatCurrency(FREE_SHIPPING_THRESHOLD)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tax */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">VAT (5%)</span>
                      <span className="font-semibold">{formatCurrency(tax)}</span>
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-amber-600">{formatCurrency(total)}</span>
                    </div>

                    {/* Free Shipping Progress */}
                    {subtotal < FREE_SHIPPING_THRESHOLD && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-sm text-amber-800 mb-2">
                          Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping!
                        </p>
                        <div className="w-full bg-amber-200 rounded-full h-2">
                          <div
                            className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Checkout Button */}
                    <div className="space-y-3 pt-4">
                      <Button
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3"
                        onClick={() => {
                          if (!isAuthenticated()) {
                            navigate('/login');
                          } else {
                            // For now, show coming soon message
                            alert('Checkout functionality coming soon! 🚀');
                          }
                        }}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        {!isAuthenticated() ? 'Login to Checkout' : 'Proceed to Checkout'}
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                        onClick={() => navigate('/marketplace')}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Continue Shopping
                      </Button>
                    </div>

                    {/* Security Badge */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center gap-2 text-green-700">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">Secure Checkout</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        Your payment information is protected
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommended Products */}
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">You might also like</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">Wildflower Honey</h4>
                          <p className="text-xs text-gray-600">Premium quality</p>
                          <p className="text-sm font-semibold text-amber-600">AED 45.00</p>
                        </div>
                        <Button size="sm" variant="outline">Add</Button>
                      </div>

                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">Manuka Honey</h4>
                          <p className="text-xs text-gray-600">Medicinal grade</p>
                          <p className="text-sm font-semibold text-amber-600">AED 120.00</p>
                        </div>
                        <Button size="sm" variant="outline">Add</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
