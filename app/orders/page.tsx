"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/minar/Navbar";
import { Footer } from "@/components/minar/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Package, Truck, CheckCircle2, Clock } from "lucide-react";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2025-01-05",
    status: "DELIVERED",
    total: 6998,
    items: [
      {
        id: "1",
        productId: "1",
        name: "Bosch Professional Angle Grinder GWS 800",
        image: "/placeholder-product.jpg",
        quantity: 2,
        price: 3499,
      },
    ],
  },
  {
    id: "ORD-002",
    date: "2025-01-06",
    status: "SHIPPED",
    total: 2899,
    trackingNumber: "MINAR1234567890",
    items: [
      {
        id: "2",
        productId: "2",
        name: "Stanley 100pc Socket Set",
        image: "/placeholder-product.jpg",
        quantity: 1,
        price: 2899,
      },
    ],
  },
  {
    id: "ORD-003",
    date: "2025-01-07",
    status: "PAYMENT_PENDING",
    total: 5200,
    items: [
      {
        id: "3",
        productId: "3",
        name: "Asian Paints Tractor Emulsion 20L",
        image: "/placeholder-product.jpg",
        quantity: 1,
        price: 5200,
      },
    ],
  },
];

type OrderStatus = "PAYMENT_PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: any }> = {
  PAYMENT_PENDING: {
    label: "Payment Pending",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  PAID: {
    label: "Order Confirmed",
    color: "bg-blue-100 text-blue-700",
    icon: CheckCircle2,
  },
  SHIPPED: {
    label: "Shipped",
    color: "bg-purple-100 text-purple-700",
    icon: Truck,
  },
  DELIVERED: {
    label: "Delivered",
    color: "bg-green-100 text-green-700",
    icon: Package,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: Package,
  },
};

export default function OrdersPage() {
  const [orders] = useState(mockOrders);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (orders.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">
              Start shopping to see your orders here
            </p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <div className="container-minar py-8">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>

          <div className="space-y-6">
            {orders.map((order) => {
              const statusInfo = statusConfig[order.status as OrderStatus];
              const StatusIcon = statusInfo.icon;

              return (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold">Order #{order.id}</h3>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Placed on {formatDate(order.date)}
                        </p>
                        {order.trackingNumber && (
                          <p className="text-sm text-gray-600 mt-1">
                            Tracking: <span className="font-mono">{order.trackingNumber}</span>
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                        <p className="text-2xl font-bold font-mono">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Order Items */}
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <Link href={`/products/${item.productId}`}>
                            <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </Link>

                          <div className="flex-1 min-w-0">
                            <Link href={`/products/${item.productId}`}>
                              <h4 className="font-semibold hover:text-yellow-600 transition-colors">
                                {item.name}
                              </h4>
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-sm font-semibold mt-1">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t">
                      {order.status === "SHIPPED" && (
                        <Button variant="outline">Track Order</Button>
                      )}
                      {order.status === "DELIVERED" && (
                        <>
                          <Button variant="outline">Download Invoice</Button>
                          <Button variant="outline">Leave Review</Button>
                        </>
                      )}
                      {order.status === "PAYMENT_PENDING" && (
                        <Button>Complete Payment</Button>
                      )}
                      <Button variant="outline" asChild>
                        <Link href={`/orders/${order.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}