"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/minar/Navbar";
import { Footer } from "@/components/minar/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  ShoppingCart, 
  IndianRupee, 
  TrendingUp,
  Plus,
  Eye,
  Edit,
  MoreVertical
} from "lucide-react";

// Mock seller data
const sellerStats = {
  totalProducts: 24,
  activeOrders: 12,
  totalRevenue: 145000,
  monthlyGrowth: 15.5,
};

const mockProducts = [
  {
    id: "1",
    name: "Bosch Professional Angle Grinder GWS 800",
    price: 3499,
    stock: 15,
    status: "active",
    sales: 45,
  },
  {
    id: "2",
    name: "Stanley 100pc Socket Set",
    price: 2899,
    stock: 8,
    status: "active",
    sales: 32,
  },
  {
    id: "3",
    name: "Makita Cordless Drill Driver 18V",
    price: 8999,
    stock: 0,
    status: "out_of_stock",
    sales: 18,
  },
];

const mockOrders = [
  {
    id: "ORD-001",
    customer: "Rahul Kumar",
    product: "Bosch Angle Grinder",
    amount: 3499,
    status: "shipped",
    date: "2025-01-07",
  },
  {
    id: "ORD-002",
    customer: "Priya Sharma",
    product: "Stanley Socket Set",
    amount: 2899,
    status: "pending",
    date: "2025-01-07",
  },
  {
    id: "ORD-003",
    customer: "Amit Patel",
    product: "Bosch Angle Grinder",
    amount: 6998,
    status: "delivered",
    date: "2025-01-06",
  },
];

export default function SellerDashboardPage() {
  const [products] = useState(mockProducts);
  const [orders] = useState(mockOrders);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <div className="container-minar py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Seller Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your products and orders</p>
            </div>
            <Button asChild>
              <Link href="/seller/products/new">
                <Plus className="mr-2 h-5 w-5" />
                Add Product
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Products
                </CardTitle>
                <Package className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{sellerStats.totalProducts}</div>
                <p className="text-xs text-gray-600 mt-1">Active listings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Orders
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{sellerStats.activeOrders}</div>
                <p className="text-xs text-gray-600 mt-1">Pending fulfillment</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Revenue
                </CardTitle>
                <IndianRupee className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatPrice(sellerStats.totalRevenue)}
                </div>
                <p className="text-xs text-gray-600 mt-1">All time earnings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Growth
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  +{sellerStats.monthlyGrowth}%
                </div>
                <p className="text-xs text-gray-600 mt-1">vs last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold">{product.name}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>Price: {formatPrice(product.price)}</span>
                            <span>•</span>
                            <span>Stock: {product.stock}</span>
                            <span>•</span>
                            <span>Sales: {product.sales}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge
                            className={
                              product.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          >
                            {product.status === "active" ? "Active" : "Out of Stock"}
                          </Badge>

                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">#{order.id}</h3>
                            <Badge
                              className={
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : order.status === "shipped"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {order.customer} • {order.product}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(order.date).toLocaleDateString("en-IN")}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-bold font-mono">
                            {formatPrice(order.amount)}
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-600">
                    <TrendingUp className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                    <p>Analytics dashboard coming soon</p>
                    <p className="text-sm mt-2">
                      Track your sales, revenue, and customer insights
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}