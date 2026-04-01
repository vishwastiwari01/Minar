"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Package,
  Heart,
  LogOut,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setIsOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm border-b border-gray-100"
        }`}
      >
        <div className="container-minar">
          <div className="flex h-[60px] items-center justify-between gap-6">
            {/* ── Logo ── */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/logo.png"
                alt="MINAR"
                width={260}
                height={60}
                className="h-[48px] w-auto object-contain scale-[1.4] origin-left"
                priority
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-7">
              {navigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`navbar-link ${isActive ? "active" : ""}`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop Actions ── */}
            <div className="hidden md:flex items-center gap-2">
              {/* Search */}
              <button
                id="navbar-search-btn"
                aria-label="Search"
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                id="navbar-cart-btn"
                className="relative p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#F5C518] text-[10px] font-bold text-[#1C1F26] flex items-center justify-center leading-none">
                  0
                </span>
              </Link>

              {/* Sign In / Account */}
              <div className="relative ml-1">
                <button
                  id="navbar-account-btn"
                  onClick={() => setAccountOpen((v) => !v)}
                  className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:border-[#F5C518] hover:text-gray-900 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Sign in
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      accountOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-xl bg-white shadow-xl border border-gray-100 py-2 z-50">
                    <Link
                      href="/login"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="h-4 w-4 text-gray-400" />
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Package className="h-4 w-4 text-gray-400" />
                      Create Account
                    </Link>
                    <Link
                      href="/orders"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Package className="h-4 w-4 text-gray-400" />
                      My Orders
                    </Link>
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Heart className="h-4 w-4 text-gray-400" />
                      Wishlist
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <Link
                      href="/seller/register"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#1C1F26] hover:bg-[#F5C518]/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4 text-[#F5C518]" />
                      Become a Seller
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* ── Mobile: cart + hamburger ── */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/cart"
                className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#F5C518] text-[10px] font-bold text-[#1C1F26] flex items-center justify-center leading-none">
                  0
                </span>
              </Link>
              <button
                id="mobile-menu-btn"
                aria-label="Toggle menu"
                onClick={() => setIsOpen((v) => !v)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
            <div className="container-minar py-4 space-y-1">
              {navigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-[#F5C518]/10 text-[#1C1F26] font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <hr className="my-2 border-gray-100" />
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                <User className="h-4 w-4" /> Sign In
              </Link>
              <Link
                href="/seller/register"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-semibold text-center bg-[#F5C518] text-[#1C1F26] mt-2"
              >
                Become a Seller
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop for account dropdown */}
      {accountOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setAccountOpen(false)}
        />
      )}
    </>
  );
}