import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
  Edit,
  Activity,
  Calendar,
  Clock,
  Star
} from 'lucide-react';

const AdminDashboard = () => {
  const { products } = useProducts();

  const [stats, setStats] = useState({
    totalProducts: products.length,
    totalUsers: 156,
    totalOrders: 89,
    totalRevenue: 12450,
    monthlyGrowth: {
      products: 12,
      users: 23,
      orders: 18,
      revenue: 15
    }
  });

  // Update stats when products change
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      totalProducts: products.length
    }));
  }, [products]);

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'order',
      message: 'New order #1234 placed by John Doe',
      timestamp: '2 minutes ago',
      icon: ShoppingCart,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'product',
      message: 'Lavender Honey marked as out of stock',
      timestamp: '15 minutes ago',
      icon: Package,
      color: 'text-orange-600'
    },
    {
      id: 3,
      type: 'user',
      message: 'New user registration: Sarah Wilson',
      timestamp: '1 hour ago',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'product',
      message: 'Manuka Honey price updated to $85',
      timestamp: '2 hours ago',
      icon: Edit,
      color: 'text-purple-600'
    },
    {
      id: 5,
      type: 'order',
      message: 'Order #1230 shipped to customer',
      timestamp: '3 hours ago',
      icon: Package,
      color: 'text-green-600'
    }
  ]);

  const [topProducts] = useState([
    {
      id: 1,
      name: 'Manuka Honey',
      sales: 45,
      revenue: 3825,
      image: '/src/assets/CQt9kOxky7QR.jpg',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Acacia Honey',
      sales: 38,
      revenue: 1140,
      image: '/src/assets/D5ZGzxW0P3i3.jpg',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Raw Honeycomb',
      sales: 32,
      revenue: 1280,
      image: '/src/assets/UmwNcmqldblm.jpg',
      rating: 5.0
    }
  ]);

  // eslint-disable-next-line no-unused-vars
  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend === 'up' ? (
            <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
          )}
          <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
            {change}%
          </span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your honey marketplace.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/admin/products/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">
              <Eye className="w-4 h-4 mr-2" />
              View Store
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          change={stats.monthlyGrowth.products}
          icon={Package}
          trend="up"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change={stats.monthlyGrowth.users}
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          change={stats.monthlyGrowth.orders}
          icon={ShoppingCart}
          trend="up"
        />
        <StatCard
          title="Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change={stats.monthlyGrowth.revenue}
          icon={DollarSign}
          trend="up"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Top Performing Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {index + 1}
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={product.image} alt={product.name} />
                    <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{product.sales} sales</span>
                      <span>•</span>
                      <span>${product.revenue}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-yellow-400" />
                        {product.rating}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/admin/products/${product.id}`}>
                      <Eye className="w-3 h-3" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/admin/products">
                  View All Products
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/admin/products/new">
                <Plus className="w-6 h-6" />
                Add New Product
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/admin/products">
                <Package className="w-6 h-6" />
                Manage Products
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/admin/users">
                <Users className="w-6 h-6" />
                Manage Users
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/admin/analytics">
                <TrendingUp className="w-6 h-6" />
                View Analytics
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
