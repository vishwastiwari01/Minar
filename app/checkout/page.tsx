"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/minar/Navbar";
import { Footer } from "@/components/minar/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, Wallet, Banknote, MapPin, Loader2, ShieldCheck } from "lucide-react";

// Mock cart data - would come from state management
const cartItems = [
  {
    id: "1",
    name: "Bosch Professional Angle Grinder GWS 800",
    quantity: 2,
    price: 3499,
  },
  {
    id: "2",
    name: "Stanley 100pc Socket Set",
    quantity: 1,
    price: 2899,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Address form
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateAddress = () => {
    if (!address.fullName || !address.phone || !address.street || !address.city || !address.pincode) {
      setError("Please fill all required fields");
      return false;
    }
    return true;
  };

  const handleContinueToPayment = () => {
    setError("");
    if (!validateAddress()) return;
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setError("");
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      // Mock order ID
      const orderId = `ORD-${Date.now()}`;
      
      console.log("Order placed:", {
        orderId,
        address,
        paymentMethod,
        items: cartItems,
      });

      setLoading(false);
      router.push(`/order-confirmation?orderId=${orderId}`);
    }, 2000);

    // TODO: Integrate with Razorpay
    // const { data, error } = await initiatePayment({
    //   amount: total,
    //   method: paymentMethod,
    // });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.18;
  const deliveryCharge = subtotal > 5000 ? 0 : 99;
  const total = subtotal + gst + deliveryCharge;

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
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= 1 ? "bg-yellow-600 text-white" : "bg-gray-300 text-gray-600"
                } font-semibold`}
              >
                1
              </div>
              <span className="ml-2 mr-4 text-sm font-medium">Delivery Address</span>
            </div>
            <div className={`h-1 w-12 ${step >= 2 ? "bg-yellow-600" : "bg-gray-300"}`} />
            <div className="flex items-center ml-4">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= 2 ? "bg-yellow-600 text-white" : "bg-gray-300 text-gray-600"
                } font-semibold`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Step 1: Delivery Address */}
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="John Doe"
                          value={address.fullName}
                          onChange={handleAddressChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={address.phone}
                          onChange={handleAddressChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address *</Label>
                      <Input
                        id="street"
                        name="street"
                        placeholder="House/Flat No., Building Name, Street"
                        value={address.street}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark</Label>
                      <Input
                        id="landmark"
                        name="landmark"
                        placeholder="Near Metro Station, etc."
                        value={address.landmark}
                        onChange={handleAddressChange}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="Bangalore"
                          value={address.city}
                          onChange={handleAddressChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          placeholder="Karnataka"
                          value={address.state}
                          onChange={handleAddressChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          placeholder="560001"
                          value={address.pincode}
                          onChange={handleAddressChange}
                          required
                        />
                      </div>
                    </div>

                    <Button onClick={handleContinueToPayment} className="w-full" size="lg">
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment Method */}
              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      {/* UPI */}
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Wallet className="h-5 w-5 text-purple-600" />
                          <div>
                            <p className="font-semibold">UPI</p>
                            <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</p>
                          </div>
                        </Label>
                      </div>

                      {/* Cards */}
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-semibold">Credit / Debit Card</p>
                            <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                          </div>
                        </Label>
                      </div>

                      {/* COD */}
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Banknote className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-semibold">Cash on Delivery</p>
                            <p className="text-sm text-gray-600">Pay when you receive</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                      <ShieldCheck className="h-5 w-5 text-blue-600" />
                      <p className="text-sm text-blue-900">
                        Your payment information is secure and encrypted
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="flex-1"
                        size="lg"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          `Place Order • ${formatPrice(total)}`
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-medium line-clamp-1">{item.name}</p>
                          <p className="text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%)</span>
                      <span>{formatPrice(gst)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Charges</span>
                      <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
                        {deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="font-mono">{formatPrice(total)}</span>
                  </div>

                  {deliveryCharge > 0 && (
                    <p className="text-xs text-gray-600 text-center">
                      Add {formatPrice(5000 - subtotal)} more for free delivery
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}