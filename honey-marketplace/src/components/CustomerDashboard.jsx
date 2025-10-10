import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './ui/Header';
import Footer from './ui/Footer';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  DollarSign,
  ShoppingBag,
  Clock,
  Store,
  Package,
  CreditCard,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  ExternalLink,
  Truck
} from 'lucide-react';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');

  // Mock customer data - in production, this would come from API
  const [customerData] = useState({
    totalSpent: 1250.00,
    totalOrders: 15,
    averageOrderValue: 83.33,
    pendingOrders: 3,
    wishlistCount: 7
  });

  // Mock orders data
  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-12-15T10:30:00Z',
      status: 'delivered',
      total: 125.50,
      items: [
        { name: 'Wildflower Honey', quantity: 2, price: 45.00, image: '/src/assets/aV3WMp6rvvkb.jpg' },
        { name: 'Raw Honeycomb', quantity: 1, price: 35.50, image: '/src/assets/anNLvZ16TeG7.jpg' }
      ],
      shippingAddress: '123 Main St, Dubai, UAE',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-12-10T14:20:00Z',
      status: 'shipped',
      total: 89.75,
      items: [
        { name: 'Mint Blossom Honey', quantity: 1, price: 52.25, image: '/src/assets/UmwNcmqldblm.jpg' },
        { name: 'Acacia Honey', quantity: 1, price: 37.50, image: '/src/assets/dxnCnOdsg3Id.jpg' }
      ],
      shippingAddress: '123 Main St, Dubai, UAE',
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-12-05T09:15:00Z',
      status: 'processing',
      total: 156.25,
      items: [
        { name: 'Premium Manuka Honey', quantity: 1, price: 125.00, image: '/src/assets/E09YjvUNs8AL.jpg' },
        { name: 'Organic Clover Honey', quantity: 1, price: 31.25, image: '/src/assets/pSpYZBrQtoC3.jpeg' }
      ],
      shippingAddress: '123 Main St, Dubai, UAE',
      trackingNumber: null
    }
  ]);

  // Mock payment methods data
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'pm-1',
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
      holderName: 'John Doe'
    },
    {
      id: 'pm-2',
      type: 'card',
      brand: 'mastercard',
      last4: '8888',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
      holderName: 'John Doe'
    }
  ]);

  // Mock transaction history
  const [transactions] = useState([
    {
      id: 'txn-1',
      orderId: 'ORD-2024-001',
      date: '2024-12-15T10:30:00Z',
      amount: 125.50,
      status: 'completed',
      paymentMethod: 'Visa ****4242'
    },
    {
      id: 'txn-2',
      orderId: 'ORD-2024-002',
      date: '2024-12-10T14:20:00Z',
      amount: 89.75,
      status: 'completed',
      paymentMethod: 'Mastercard ****8888'
    },
    {
      id: 'txn-3',
      orderId: 'ORD-2024-003',
      date: '2024-12-05T09:15:00Z',
      amount: 156.25,
      status: 'pending',
      paymentMethod: 'Visa ****4242'
    }
  ]);

  // Mock addresses data
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      type: 'shipping',
      isDefault: true,
      firstName: 'John',
      lastName: 'Doe',
      company: '',
      address1: '123 Main Street',
      address2: 'Apt 4B',
      city: 'Dubai',
      state: 'Dubai',
      postalCode: '12345',
      country: 'UAE',
      phone: '+971-50-123-4567'
    },
    {
      id: 'addr-2',
      type: 'billing',
      isDefault: false,
      firstName: 'John',
      lastName: 'Doe',
      company: 'Tech Corp',
      address1: '456 Business Ave',
      address2: 'Suite 100',
      city: 'Abu Dhabi',
      state: 'Abu Dhabi',
      postalCode: '54321',
      country: 'UAE',
      phone: '+971-50-987-6543'
    }
  ]);

  // Filter and search states
  const [orderFilter, setOrderFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderSort, setOrderSort] = useState('date-desc');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Format currency as AED
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format date with time
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-AE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'processing':
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'processing':
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      if (orderFilter !== 'all' && order.status !== orderFilter) return false;
      if (orderSearch && !order.id.toLowerCase().includes(orderSearch.toLowerCase()) &&
          !order.items.some(item => item.name.toLowerCase().includes(orderSearch.toLowerCase()))) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (orderSort) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'amount-desc':
          return b.total - a.total;
        case 'amount-asc':
          return a.total - b.total;
        default:
          return 0;
      }
    });

  // Handle back to marketplace
  const handleBackToMarketplace = () => {
    navigate('/marketplace');
  };

  // Handle order tracking
  const handleTrackOrder = (trackingNumber) => {
    // In production, this would open tracking page or external tracking service
    window.open(`https://tracking.example.com/${trackingNumber}`, '_blank');
  };

  // Handle payment method deletion
  const handleDeletePaymentMethod = (paymentMethodId) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== paymentMethodId));
  };

  // Handle setting default payment method
  const handleSetDefaultPayment = (paymentMethodId) => {
    setPaymentMethods(prev => prev.map(pm => ({
      ...pm,
      isDefault: pm.id === paymentMethodId
    })));
  };

  // Handle address deletion
  const handleDeleteAddress = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  // Handle setting default address
  const handleSetDefaultAddress = (addressId) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your dashboard...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <Card className="p-12 text-center border-red-200 bg-red-50">
              <h2 className="text-2xl font-bold text-red-800 mb-4">Error Loading Dashboard</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section with Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name || 'Customer'}!
              </h1>
              <p className="text-gray-600">
                Manage your orders, payments, and addresses
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleBackToMarketplace}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <Store className="w-4 h-4 mr-2" />
                Back to Marketplace
              </Button>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-800">Total Spent</CardTitle>
                <DollarSign className="h-5 w-5 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-900">
                  {formatCurrency(customerData.totalSpent)}
                </div>
                <p className="text-xs text-amber-700 mt-1">
                  Lifetime purchases
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-800">Total Orders</CardTitle>
                <ShoppingBag className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">
                  {customerData.totalOrders}
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  Successfully completed
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-800">Pending Orders</CardTitle>
                <Clock className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">
                  {customerData.pendingOrders}
                </div>
                <p className="text-xs text-green-700 mt-1">
                  In progress
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Addresses
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab Content */}
            <TabsContent value="orders" className="space-y-6">
              {/* Orders Header with Filters */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
                  <p className="text-gray-600">Track and manage your orders</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search orders..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Select value={orderFilter} onValueChange={setOrderFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={orderSort} onValueChange={setOrderSort}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Newest First</SelectItem>
                      <SelectItem value="date-asc">Oldest First</SelectItem>
                      <SelectItem value="amount-desc">Highest Amount</SelectItem>
                      <SelectItem value="amount-asc">Lowest Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <Card className="p-12 text-center">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-600 mb-6">
                      {orderSearch || orderFilter !== 'all'
                        ? 'Try adjusting your search or filter criteria.'
                        : 'You haven\'t placed any orders yet.'}
                    </p>
                    <Button onClick={handleBackToMarketplace}>
                      Start Shopping
                    </Button>
                  </Card>
                ) : (
                  filteredOrders.map((order) => (
                    <Card key={order.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                              <Badge variant={getStatusBadgeVariant(order.status)} className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              Ordered on {formatDate(order.date)}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-6 h-6 rounded object-cover"
                                  />
                                  <span className="text-sm text-gray-700">
                                    {item.name} × {item.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">
                              Shipping to: {order.shippingAddress}
                            </p>
                          </div>
                          <div className="flex flex-col lg:items-end gap-3">
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-900">
                                {formatCurrency(order.total)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Order Details - {order.id}</DialogTitle>
                                  </DialogHeader>
                                  {selectedOrder && (
                                    <div className="space-y-6">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="font-semibold text-gray-900 mb-2">Order Information</h4>
                                          <div className="space-y-1 text-sm">
                                            <p><span className="font-medium">Order ID:</span> {selectedOrder.id}</p>
                                            <p><span className="font-medium">Date:</span> {formatDateTime(selectedOrder.date)}</p>
                                            <p><span className="font-medium">Status:</span>
                                              <Badge variant={getStatusBadgeVariant(selectedOrder.status)} className="ml-2">
                                                {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                              </Badge>
                                            </p>
                                            {selectedOrder.trackingNumber && (
                                              <p><span className="font-medium">Tracking:</span> {selectedOrder.trackingNumber}</p>
                                            )}
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                                          <p className="text-sm text-gray-600">{selectedOrder.shippingAddress}</p>
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                                        <div className="space-y-3">
                                          {selectedOrder.items.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                              <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-lg object-cover"
                                              />
                                              <div className="flex-1">
                                                <h5 className="font-medium text-gray-900">{item.name}</h5>
                                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                              </div>
                                              <div className="text-right">
                                                <p className="font-semibold text-gray-900">
                                                  {formatCurrency(item.price * item.quantity)}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                  {formatCurrency(item.price)} each
                                                </p>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                          <span className="text-lg font-semibold text-gray-900">Total</span>
                                          <span className="text-2xl font-bold text-gray-900">
                                            {formatCurrency(selectedOrder.total)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              {order.trackingNumber && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleTrackOrder(order.trackingNumber)}
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Track
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Payments Tab Content */}
            <TabsContent value="payments" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Payment Methods Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                      <p className="text-gray-600">Manage your saved payment methods</p>
                    </div>
                    <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Payment Method
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Payment Method</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Card Number
                              </label>
                              <Input placeholder="1234 5678 9012 3456" />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Cardholder Name
                              </label>
                              <Input placeholder="John Doe" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Expiry Date
                              </label>
                              <Input placeholder="MM/YY" />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">
                                CVV
                              </label>
                              <Input placeholder="123" type="password" />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="default-payment" className="rounded" />
                            <label htmlFor="default-payment" className="text-sm text-gray-700">
                              Set as default payment method
                            </label>
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button className="flex-1">Add Payment Method</Button>
                            <Button variant="outline" onClick={() => setShowAddPayment(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Payment Methods List */}
                  <div className="space-y-3">
                    {paymentMethods.length === 0 ? (
                      <Card className="p-8 text-center">
                        <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No payment methods</h3>
                        <p className="text-gray-600 mb-4">Add a payment method to make checkout faster</p>
                        <Button onClick={() => setShowAddPayment(true)}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Payment Method
                        </Button>
                      </Card>
                    ) : (
                      paymentMethods.map((method) => (
                        <Card key={method.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} ****{method.last4}
                                  </span>
                                  {method.isDefault && (
                                    <Badge variant="secondary">Default</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">
                                  {method.holderName} • Expires {method.expiryMonth}/{method.expiryYear}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!method.isDefault && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSetDefaultPayment(method.id)}
                                >
                                  Set Default
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeletePaymentMethod(method.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </div>

                {/* Transaction History Section */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
                    <p className="text-gray-600">View your recent payment transactions</p>
                  </div>

                  <div className="space-y-3">
                    {transactions.length === 0 ? (
                      <Card className="p-8 text-center">
                        <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions</h3>
                        <p className="text-gray-600">Your payment history will appear here</p>
                      </Card>
                    ) : (
                      transactions.map((transaction) => (
                        <Card key={transaction.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                transaction.status === 'completed'
                                  ? 'bg-green-100 text-green-600'
                                  : transaction.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-red-100 text-red-600'
                              }`}>
                                {transaction.status === 'completed' ? (
                                  <CheckCircle className="w-5 h-5" />
                                ) : transaction.status === 'pending' ? (
                                  <Clock className="w-5 h-5" />
                                ) : (
                                  <XCircle className="w-5 h-5" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Order {transaction.orderId}
                                  </span>
                                  <Badge variant={getStatusBadgeVariant(transaction.status)}>
                                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {transaction.paymentMethod} • {formatDateTime(transaction.date)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                {formatCurrency(transaction.amount)}
                              </p>
                              <Button variant="ghost" size="sm" className="text-xs">
                                <Download className="w-3 h-3 mr-1" />
                                Receipt
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Addresses Tab Content */}
            <TabsContent value="addresses" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Address Book</h2>
                  <p className="text-gray-600">Manage your shipping and billing addresses</p>
                </div>
                <Dialog open={showAddAddress} onOpenChange={setShowAddAddress}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            First Name
                          </label>
                          <Input placeholder="John" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Last Name
                          </label>
                          <Input placeholder="Doe" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Company (Optional)
                        </label>
                        <Input placeholder="Company Name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Address Line 1
                        </label>
                        <Input placeholder="123 Main Street" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Address Line 2 (Optional)
                        </label>
                        <Input placeholder="Apt, Suite, Unit, etc." />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            City
                          </label>
                          <Input placeholder="Dubai" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            State/Emirate
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dubai">Dubai</SelectItem>
                              <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                              <SelectItem value="sharjah">Sharjah</SelectItem>
                              <SelectItem value="ajman">Ajman</SelectItem>
                              <SelectItem value="fujairah">Fujairah</SelectItem>
                              <SelectItem value="ras-al-khaimah">Ras Al Khaimah</SelectItem>
                              <SelectItem value="umm-al-quwain">Umm Al Quwain</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Postal Code
                          </label>
                          <Input placeholder="12345" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Country
                          </label>
                          <Select defaultValue="uae">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="uae">United Arab Emirates</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Phone Number
                        </label>
                        <Input placeholder="+971-50-123-4567" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="shipping" name="addressType" value="shipping" defaultChecked />
                          <label htmlFor="shipping" className="text-sm text-gray-700">
                            Shipping Address
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="billing" name="addressType" value="billing" />
                          <label htmlFor="billing" className="text-sm text-gray-700">
                            Billing Address
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="default-address" className="rounded" />
                          <label htmlFor="default-address" className="text-sm text-gray-700">
                            Set as default address
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button className="flex-1">
                          {editingAddress ? 'Update Address' : 'Add Address'}
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setShowAddAddress(false);
                          setEditingAddress(null);
                        }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Addresses List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.length === 0 ? (
                  <Card className="p-8 text-center md:col-span-2">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No addresses saved</h3>
                    <p className="text-gray-600 mb-4">Add an address to make checkout faster</p>
                    <Button onClick={() => setShowAddAddress(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Address
                    </Button>
                  </Card>
                ) : (
                  addresses.map((address) => (
                    <Card key={address.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant={address.type === 'shipping' ? 'default' : 'secondary'}>
                            {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                          </Badge>
                          {address.isDefault && (
                            <Badge variant="outline">Default</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingAddress(address);
                              setShowAddAddress(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAddress(address.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="font-medium text-gray-900">
                          {address.firstName} {address.lastName}
                        </p>
                        {address.company && (
                          <p className="text-sm text-gray-600">{address.company}</p>
                        )}
                        <p className="text-sm text-gray-600">{address.address1}</p>
                        {address.address2 && (
                          <p className="text-sm text-gray-600">{address.address2}</p>
                        )}
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p className="text-sm text-gray-600">{address.country}</p>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                      </div>

                      {!address.isDefault && (
                        <div className="mt-4 pt-4 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => handleSetDefaultAddress(address.id)}
                          >
                            Set as Default
                          </Button>
                        </div>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
