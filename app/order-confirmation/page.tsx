"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/minar/Navbar";
import { Footer } from "@/components/minar/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Package, MapPin, Calendar, Download } from "lucide-react";

// Force dynamic rendering to prevent build-time errors with useSearchParams
export const dynamic = 'force-dynamic';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  const { orderDate, estimatedDelivery } = useMemo(() => {
    const today = new Date();
    const delivery = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    
    return {
      orderDate: today.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      estimatedDelivery: delivery.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  }, []);

  if (!orderId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Order not found</h2>
            <Button onClick={() => router.push("/")}>Go to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container-minar">
          <div className="max-w-3xl mx-auto">
            {/* Success Message */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
              <p className="text-gray-600 text-lg">
                Thank you for your order. We&apos;ll send you shipping confirmation soon.
              </p>
            </div>

            {/* Order ID Card */}
            <Card className="mb-6 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Number</p>
                    <p className="text-2xl font-bold font-mono">{orderId}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card className="mb-6">
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Order Date */}
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg shrink-0">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Order Date</p>
                      <p className="font-semibold">{orderDate}</p>
                    </div>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg shrink-0">
                      <Package className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                      <p className="font-semibold">{estimatedDelivery}</p>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg shrink-0">
                      <MapPin className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Delivering to</p>
                      <p className="font-semibold">Bangalore, 560001</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-4">Order Items</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Bosch Professional Angle Grinder GWS 800</p>
                        <p className="text-sm text-gray-600">Quantity: 2</p>
                      </div>
                      <p className="font-semibold">₹6,998</p>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Stanley 100pc Socket Set</p>
                        <p className="text-sm text-gray-600">Quantity: 1</p>
                      </div>
                      <p className="font-semibold">₹2,899</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Price Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹9,897</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GST (18%)</span>
                    <span>₹1,781</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Charges</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Paid</span>
                    <span className="font-mono">₹11,678</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">What happens next?</h3>
                <ol className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-semibold">1.</span>
                    <span>We&apos;ll send you an email confirmation with order details</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-semibold">2.</span>
                    <span>Seller will prepare your order for shipment</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-semibold">3.</span>
                    <span>You&apos;ll receive tracking details once shipped</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-semibold">4.</span>
                    <span>Expect delivery within 2-3 business days</span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1" size="lg">
                <Link href="/orders">View My Orders</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1" size="lg">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>

            {/* Help Section */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Need help with your order?{" "}
                <Link href="/help" className="text-yellow-600 hover:underline font-semibold">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}