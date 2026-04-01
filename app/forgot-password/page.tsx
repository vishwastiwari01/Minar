"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/minar/Navbar";
import { Footer } from "@/components/minar/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/account/update-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage("Password reset link has been sent to your email.");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center bg-[#F8F9FA] py-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1C1F26]/[0.02] transform skew-x-12 translate-x-1/2"></div>
        
        <div className="w-full max-w-md px-4 relative z-10">
          <Link 
            href="/login" 
            className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-[#F5C518] transition-colors mb-6 group"
          >
            <ArrowLeft className="mr-2 h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>

          <Card className="border-none shadow-2xl overflow-hidden rounded-2xl">
            <CardHeader className="space-y-3 bg-[#1C1F26] text-white p-8 pb-10">
              <div className="w-12 h-1.5 bg-[#F5C518] mb-2"></div>
              <CardTitle className="text-4xl font-black uppercase tracking-tight leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Recover <span className="text-[#F5C518]">Access</span>
              </CardTitle>
              <CardDescription className="text-gray-400 font-medium">
                Enter your email to receive a secure recovery link.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-10 bg-white">
              <form onSubmit={handleReset} className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="bg-red-50 text-red-700 border-red-200">
                    <AlertDescription className="font-medium text-xs font-sans">{error}</AlertDescription>
                  </Alert>
                )}
                {message && (
                  <Alert className="bg-green-50 text-green-700 border-green-200">
                    <AlertDescription className="font-medium text-xs font-sans">{message}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Registered Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-gray-200 focus:ring-[#F5C518] focus:border-[#F5C518] rounded-lg"
                  />
                </div>

                <Button type="submit" className="w-full h-12 bg-[#1C1F26] hover:bg-[#F5C518] text-white hover:text-[#1C1F26] transition-all font-bold uppercase tracking-widest text-xs" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Link...
                    </>
                  ) : (
                    <>
                      Send Recovery Link <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col items-center gap-4">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  Need more help?
                </p>
                <Link href="/contact">
                  <Button variant="link" className="text-xs font-bold text-[#F5C518] uppercase tracking-widest p-0 h-auto">
                    Contact Security Support
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
