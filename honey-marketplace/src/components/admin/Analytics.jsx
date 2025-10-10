import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  Calendar,
  Download,
  Eye,
  Star
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 12450,
      totalOrders: 89,
      totalCustomers: 156,
      avgOrderValue: 139.89,
      revenueGrowth: 15.2,
      ordersGrowth: 18.5,
      customersGrowth: 23.1,
      avgOrderGrowth: -2.3
    },
    topProducts: [
      { name: 'Manuka Honey', revenue: 3825, orders: 45, growth: 25.3 },
      { name: 'Acacia Honey', revenue: 1140, orders: 38, growth: 12.8 },
      { name: 'Raw Honeycomb', revenue: 1280, orders: 32, growth: 8.5 },
      { name: 'Wildflower Honey', revenue: 1474, orders: 67, growth: 15.2 },
      { name: 'Lavender Honey', revenue: 980, orders: 28, growth: -5.1 }
    ],
    recentActivity: [
      { type: 'sale', amount: 85, product: 'Manuka Honey', time: '2 hours ago' },
      { type: 'sale', amount: 25, product: 'Mint Blossom Honey', time: '3 hours ago' },
      { type: 'sale', amount: 40, product: 'Raw Honeycomb', time: '5 hours ago' },
      { type: 'sale', amount: 30, product: 'Acacia Honey', time: '6 hours ago' },
      { type: 'sale', amount: 22, product: 'Wildflower Honey', time: '8 hours ago' }
    ],
    customerInsights: {
      newCustomers: 34,
      returningCustomers: 122,
      customerRetentionRate: 78.2,
      avgCustomerLifetime: 245.67
    }
  };

  // eslint-disable-next-line no-unused-vars
  const StatCard = ({ title, value, change, icon: Icon, trend, prefix = '', suffix = '' }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{prefix}{value}{suffix}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend === 'up' ? (
            <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
          )}
          <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
            {Math.abs(change)}%
          </span>
          <span className="ml-1">from last period</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your marketplace performance and customer insights.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={analyticsData.overview.totalRevenue.toLocaleString()}
          change={analyticsData.overview.revenueGrowth}
          icon={DollarSign}
          trend="up"
          prefix="$"
        />
        <StatCard
          title="Total Orders"
          value={analyticsData.overview.totalOrders}
          change={analyticsData.overview.ordersGrowth}
          icon={ShoppingCart}
          trend="up"
        />
        <StatCard
          title="Total Customers"
          value={analyticsData.overview.totalCustomers}
          change={analyticsData.overview.customersGrowth}
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Avg. Order Value"
          value={analyticsData.overview.avgOrderValue.toFixed(2)}
          change={Math.abs(analyticsData.overview.avgOrderGrowth)}
          icon={BarChart3}
          trend="down"
          prefix="$"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Top Performing Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{product.orders} orders</span>
                      <span>•</span>
                      <span>${product.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-medium ${
                      product.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.growth > 0 ? '+' : ''}{product.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Recent Sales Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      ${activity.amount} - {activity.product}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Sale
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Customer Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {analyticsData.customerInsights.newCustomers}
              </div>
              <div className="text-sm text-muted-foreground">New Customers</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {analyticsData.customerInsights.returningCustomers}
              </div>
              <div className="text-sm text-muted-foreground">Returning Customers</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {analyticsData.customerInsights.customerRetentionRate}%
              </div>
              <div className="text-sm text-muted-foreground">Retention Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                ${analyticsData.customerInsights.avgCustomerLifetime.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Avg. Customer LTV</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Revenue Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Chart Coming Soon</h3>
              <p className="text-muted-foreground">
                Interactive revenue and sales charts will be available in the next update.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
