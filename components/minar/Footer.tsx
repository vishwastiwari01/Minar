"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-minar-gray-50">
      <div className="container-minar py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-minar-black">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-minar-black transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/careers" 
                  className="text-muted-foreground hover:text-minar-black transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-minar-black transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Buyers */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-minar-black">
              For Buyers
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/products" 
                  className="text-muted-foreground hover:text-minar-black transition-colors"
                >
                  Browse Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/orders" 
                  className="text-muted-foreground hover:text-minar-black transition-colors"
                >
                  Track Orders
                </Link>
              </li>
              <li>
                <Link 
                  href="/help" 
                  className="text-muted-foreground hover:text-minar-black transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-minar-black">
              For Sellers
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/seller/register" 
                  className="text-muted-foreground hover:text-minar-black transition-colors"
                >
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link 
                  href="/seller/dashboard" 
                  className="text-muted-foreground hover:text-minar-black transition-colors"
                >
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/seller/guide" 
                  className="text-muted-foreground hover:text-minar-black transition-colors"
                >
                  Seller Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-minar-black">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-minar-black transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-muted-foreground hover:text-minar-black transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/returns" 
                  className="text-muted-foreground hover:text-minar-black transition-colors"
                >
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-minar-black">MINAR</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Hardware & Construction Marketplace
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:flex-row md:items-end">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MINAR. All rights reserved.
            </p>
            <div className="flex gap-4">
              <span className="text-sm text-muted-foreground">🇮🇳 Bangalore</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">Hyderabad</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}