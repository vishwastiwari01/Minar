"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/minar/Navbar";
import { Footer } from "@/components/minar/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Store, CheckCircle2 } from "lucide-react";

export default function SellerRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    
    // Business Info
    businessName: "",
    businessType: "",
    gstNumber: "",
    panNumber: "",
    
    // Address
    address: "",
    city: "",
    pincode: "",
    
    // Bank Details
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setError("");
    
    if (step === 1) {
      if (!formData.ownerName || !formData.email || !formData.phone || !formData.password) {
        setError("Please fill all required fields");
        return;
      }
    }
    
    if (step === 2) {
      if (!formData.businessName || !formData.gstNumber) {
        setError("Please fill all required fields");
        return;
      }
    }
    
    if (step === 3) {
      if (!formData.address || !formData.city || !formData.pincode) {
        setError("Please fill all required fields");
        return;
      }
    }
    
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Seller registration successful:", formData);
      router.push("/seller/dashboard");
      setLoading(false);
    }, 1500);

    // TODO: Replace with actual Supabase registration
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container-minar">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <Store className="h-8 w-8 text-yellow-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Become a MINAR Seller</h1>
              <p className="text-gray-600">
                Join thousands of sellers and grow your business
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
                      step >= stepNumber
                        ? "bg-yellow-600 border-yellow-600 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {step > stepNumber ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  {stepNumber < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > stepNumber ? "bg-yellow-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1 && "Personal Information"}
                  {step === 2 && "Business Details"}
                  {step === 3 && "Address Information"}
                  {step === 4 && "Bank Details"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Let's start with your basic information"}
                  {step === 2 && "Tell us about your business"}
                  {step === 3 && "Where is your business located?"}
                  {step === 4 && "Final step - Payment details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Full Name *</Label>
                      <Input
                        id="ownerName"
                        name="ownerName"
                        placeholder="John Doe"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Must be at least 8 characters
                      </p>
                    </div>

                    <Button onClick={handleNext} className="w-full">
                      Continue
                    </Button>
                  </div>
                )}

                {/* Step 2: Business Info */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        placeholder="ABC Hardware Store"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type</Label>
                      <Input
                        id="businessType"
                        name="businessType"
                        placeholder="e.g., Retailer, Wholesaler, Manufacturer"
                        value={formData.businessType}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gstNumber">GST Number *</Label>
                      <Input
                        id="gstNumber"
                        name="gstNumber"
                        placeholder="22AAAAA0000A1Z5"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="panNumber">PAN Number</Label>
                      <Input
                        id="panNumber"
                        name="panNumber"
                        placeholder="AAAAA0000A"
                        value={formData.panNumber}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={handleNext} className="flex-1">
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Address */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Business Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Street address, building number"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="Bangalore"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          placeholder="560001"
                          value={formData.pincode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={handleNext} className="flex-1">
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Bank Details */}
                {step === 4 && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountHolderName">Account Holder Name</Label>
                      <Input
                        id="accountHolderName"
                        name="accountHolderName"
                        placeholder="As per bank records"
                        value={formData.accountHolderName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        name="accountNumber"
                        placeholder="xxxxxxxxxxxx"
                        value={formData.accountNumber}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <Input
                        id="ifscCode"
                        name="ifscCode"
                        placeholder="SBIN0000123"
                        value={formData.ifscCode}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm font-normal cursor-pointer"
                      >
                        I agree to the{" "}
                        <Link href="/seller/terms" className="text-yellow-600 hover:underline">
                          Seller Terms & Conditions
                        </Link>
                      </Label>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(3)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button type="submit" className="flex-1" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Complete Registration"
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already registered as a seller?{" "}
              <Link
                href="/login"
                className="font-semibold text-yellow-600 hover:text-yellow-700"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}