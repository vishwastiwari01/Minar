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
import { Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            phone: formData.phone,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/login?message=Check your email for the confirmation link");
      }
    } catch (err) {
      setError("An unexpected error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) setError(error.message);
    } catch (err) {
      setError("Failed to initialize Google login");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center bg-[#F8F9FA] py-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-[#F5C518]/[0.02] transform -skew-x-12 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-64 bg-[#1C1F26]/[0.03] blur-3xl rounded-full translate-y-1/2 translate-x-1/2"></div>

        <div className="w-full max-w-lg px-4 relative z-10">
          <Card className="border-none shadow-2xl overflow-hidden rounded-2xl">
            <CardHeader className="space-y-3 bg-[#1C1F26] text-white p-8 pb-10">
              <div className="w-12 h-1.5 bg-[#F5C518] mb-2"></div>
              <CardTitle className="text-4xl font-black uppercase tracking-tight leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Create <span className="text-[#F5C518]">Account</span>
              </CardTitle>
              <CardDescription className="text-gray-400 font-medium">
                Join the premier marketplace for construction materials.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-10 bg-white">
              <form onSubmit={handleRegister} className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="bg-red-50 text-red-700 border-red-200">
                    <AlertDescription className="font-medium text-xs">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 border-gray-200 focus:ring-[#F5C518] focus:border-[#F5C518] rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-12 border-gray-200 focus:ring-[#F5C518] focus:border-[#F5C518] rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 80888 08880"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="h-12 border-gray-200 focus:ring-[#F5C518] focus:border-[#F5C518] rounded-lg"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="h-12 border-gray-200 focus:ring-[#F5C518] focus:border-[#F5C518] rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="h-12 border-gray-200 focus:ring-[#F5C518] focus:border-[#F5C518] rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    className="border-[#1C1F26] data-[state=checked]:bg-[#1C1F26] data-[state=checked]:border-[#1C1F26]"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-xs font-semibold cursor-pointer text-gray-600 leading-tight"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#F5C518] hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="text-[#F5C518] hover:underline">Privacy Policy</Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full h-12 bg-[#1C1F26] hover:bg-[#F5C518] text-white hover:text-[#1C1F26] transition-all font-bold uppercase tracking-widest text-xs" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Register Account <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-100" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    <span className="bg-white px-4">
                      Social Registration
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-2 border-gray-100 hover:border-[#1C1F26] hover:bg-[#1C1F26] hover:text-white transition-all font-bold uppercase tracking-widest text-xs" 
                    disabled={loading}
                    onClick={handleGoogleLogin}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </div>
              </div>

              <p className="mt-8 text-center text-[11px] font-bold uppercase tracking-widest text-gray-500">
                Already registered?{" "}
                <Link
                  href="/login"
                  className="text-[#F5C518] hover:text-[#1C1F26] transition-colors"
                >
                  Sign In instead
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}