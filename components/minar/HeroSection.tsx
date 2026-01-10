"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-minar-gray-50 to-background">
      <div className="container-minar">
        <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm">
            <span className="mr-2">🎯</span>
            <span className="font-medium">No Bargaining. No Hustle.</span>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-minar-black sm:text-6xl lg:text-7xl">
            Hardware & Construction
            <br />
            <span className="text-minar-gold">Without the Chaos</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Fixed prices from verified sellers. Built for contractors, architects, and homeowners who value their time.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild className="text-base">
              <Link href="/products">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base">
              <Link href="/seller/register">
                Become a Seller
              </Link>
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-minar-black">500+</div>
              <div className="mt-1 text-sm text-muted-foreground">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-minar-black">50+</div>
              <div className="mt-1 text-sm text-muted-foreground">Verified Sellers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-minar-black">2</div>
              <div className="mt-1 text-sm text-muted-foreground">Cities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-minar-gold/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
}