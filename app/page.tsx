import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/minar/Navbar";
import { Footer } from "@/components/minar/Footer";
import { supabase } from "@/lib/supabase";
import {
  ShieldCheck,
  FileText,
  Truck,
  ArrowRight,
  Search,
  Star,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────
const categories = [
  {
    name: "Cement &\nConcrete",
    slug: "cement",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=450&fit=crop&auto=format",
    count: 120,
  },
  {
    name: "Steel &\nRebars",
    slug: "steel",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=450&fit=crop&auto=format",
    count: 85,
  },
  {
    name: "Electrical\nSupplies",
    slug: "electrical",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop&auto=format",
    count: 210,
  },
  {
    name: "Tools &\nMachinery",
    slug: "tools",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=450&fit=crop&auto=format",
    count: 175,
  },
];

const featuredDeals = [
  {
    name: "Cement\nConcrete",
    badge: "25% OFF",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=280&fit=crop&auto=format",
    slug: "cement",
  },
  {
    name: "Steel &\nRebars",
    badge: "BULK DEAL",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=280&fit=crop&auto=format",
    slug: "steel",
  },
  {
    name: "Logistics",
    badge: "FREE DELIVERY",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&h=280&fit=crop&auto=format",
    slug: "logistics",
  },
];

const trendingItems = [
  {
    name: "Angle Grinder",
    brand: "Bosch",
    price: "₹3,499",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&h=200&fit=crop&auto=format",
    slug: "tools",
  },
  {
    name: "TMT Steel Bars",
    brand: "TATA Steel",
    price: "₹68/kg",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=200&fit=crop&auto=format",
    slug: "steel",
  },
  {
    name: "Emulsion Paint",
    brand: "Asian Paints",
    price: "₹5,200",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&h=200&fit=crop&auto=format",
    slug: "paint",
  },
];

const topBrands = [
  "Bosch", "TATA Steel", "Asian Paints", "Makita",
  "Fevicol", "Ultratech", "Cera", "Stanley",
];

const reviews = [
  {
    name: "Rajesh Kumar",
    role: "General Contractor, Bangalore",
    text: "MINAR saved us hours of price negotiation. We ordered TMT bars for ₹68/kg and delivery was on time to site.",
    stars: 5,
  },
  {
    name: "Sunita Patel",
    role: "Interior Designer, Hyderabad",
    text: "The verified seller badge gives me confidence. Found everything from tiles to electrical fittings in one place.",
    stars: 5,
  },
  {
    name: "Arvind Singh",
    role: "Site Engineer",
    text: "GST invoices are auto-generated. My accounts team loves it. Will definitely keep using MINAR for bulk orders.",
    stars: 5,
  },
];

// ─── PAGE ────────────────────────────────────────────────
export default async function HomePage() {
  // Fetch real data from Supabase, but use mock data if DB isn't set up
  let finalFeaturedDeals = featuredDeals;
  let finalTrendingItems = trendingItems;

  try {
    const { data: featuredData, error: featuredError } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .limit(3);
    
    if (!featuredError && featuredData && featuredData.length > 0) {
      finalFeaturedDeals = featuredData.map((item) => ({
        name: item.name,
        badge: "FEATURED DEAL",
        image: item.image_url || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=280&fit=crop",
        slug: item.category?.toLowerCase() || "supplies",
      }));
    }
  } catch (err) {
    console.warn('Could not fetch featured deals, using mock data.');
  }

  try {
    const { data: trendingData, error: trendingError } = await supabase
      .from('products')
      .select('*')
      .eq('is_trending', true)
      .limit(3);
    
    if (!trendingError && trendingData && trendingData.length > 0) {
      finalTrendingItems = trendingData.map((item) => ({
        name: item.name,
        brand: item.brand || "Verified Vendor",
        price: `₹${item.price.toLocaleString("en-IN")}`,
        image: item.image_url || "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&h=200&fit=crop",
        slug: item.category?.toLowerCase() || "tools",
      }));
    }
  } catch (err) {
    console.warn('Could not fetch trending items, using mock data.');
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="hero-section">
        {/* Background image */}
        <div className="hero-bg" />
        {/* Gradient overlay */}
        <div className="hero-overlay" />

        <div className="container-minar relative z-10 py-24 lg:py-32">
          <div className="max-w-2xl">
            {/* Eye-brow */}
            <p className="inline-flex items-center gap-2 text-[#F5C518] text-sm font-semibold tracking-widest uppercase mb-5 animate-fade-in-up">
              <span className="w-8 h-px bg-[#F5C518]" />
              India&#39;s Fixed-Price Construction Marketplace
            </p>

            {/* Heading */}
            <h1
              className="text-6xl lg:text-8xl font-display font-black text-white leading-[0.9] tracking-tight mb-6 animate-fade-in-up delay-100"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              BUILD WITH
              <span className="block text-[#F5C518]">AUTHORITY.</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-10 max-w-lg animate-fade-in-up delay-200">
              Your Source for Premium Construction Supplies.
              Fixed prices · Verified sellers · GST invoices on every order.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4 mb-16 animate-fade-in-up delay-300">
              <Link href="/products" className="btn-primary text-base">
                Browse Materials
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/seller/register" className="btn-outline-light text-base">
                <Search className="h-4 w-4" />
                Bulk Order / Get Quote
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 animate-fade-in-up delay-400">
              {[
                { value: "500+", label: "Trusted Suppliers" },
                { value: "₹2.5Cr+", label: "Materials Supplied" },
                { value: "2", label: "Cities Active" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="stat-number">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TRUST BAR
      ════════════════════════════════════════ */}
      <div className="trust-bar">
        <div className="container-minar">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {[
              { icon: ShieldCheck, label: "500+ Trusted Suppliers", sub: "Every seller verified" },
              { icon: FileText, label: "GST Invoice Available", sub: "Auto-generated on every order" },
              { icon: Truck, label: "Direct Site Delivery", sub: "Same-day within city" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="trust-item sm:justify-center px-4">
                <div className="trust-icon">
                  <Icon className="h-5 w-5 text-[#1C1F26]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm leading-tight">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SHOP BY CATEGORY
      ════════════════════════════════════════ */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="container-minar">
          {/* Heading */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold tracking-widest text-[#F5C518] uppercase mb-2">
                Browse by Category
              </p>
              <h2
                className="section-title text-4xl lg:text-5xl text-[#1C1F26]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Shop by <span>Category</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#1C1F26] hover:text-[#F5C518] transition-colors"
            >
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <Link
                href={`/products?category=${cat.slug}`}
                key={cat.slug}
                className={`category-card animate-fade-in-up delay-${(i + 1) * 100}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name.replace("\n", " ")}
                  className="category-card-img"
                  loading={i < 2 ? "eager" : "lazy"}
                />
                <div className="category-card-overlay" />
                <div className="category-card-label">
                  <h3
                    className="text-white font-black text-2xl leading-tight whitespace-pre-line"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-[#F5C518] text-sm mt-1 font-medium">
                    {cat.count}+ products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FEATURED DEALS
      ════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container-minar">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest text-[#F5C518] uppercase mb-2">
              Limited Time
            </p>
            <h2
              className="section-title text-4xl lg:text-5xl text-[#1C1F26]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Featured <span>Deals</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {finalFeaturedDeals.map((deal, idx) => (
              <Link
                href={`/products?category=${deal.slug}`}
                key={deal.slug + idx}
                className="deal-card group"
              >
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={deal.image}
                    alt={deal.name.replace("\n", " ")}
                    className="deal-card-img w-full"
                    loading="lazy"
                  />
                </div>
                <div className="deal-card-label">
                  <span className="inline-block bg-[#F5C518] text-[#1C1F26] text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded mb-2">
                    {deal.badge}
                  </span>
                  <h3
                    className="text-white font-black text-xl leading-tight whitespace-pre-line"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {deal.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          THREE COLUMN: Featured · Trending · Brands
      ════════════════════════════════════════ */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="container-minar">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Col 1: Featured Deals mini ── */}
            <div>
              <h3
                className="text-2xl font-black text-[#1C1F26] mb-5"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Featured <span className="heading-underline">Deals</span>
              </h3>
              <div className="space-y-3">
                {finalFeaturedDeals.map((deal, idx) => (
                  <Link
                    href={`/products?category=${deal.slug}`}
                    key={`mini-${deal.slug}-${idx}`}
                    className="flex items-center gap-3 bg-white rounded-xl p-3 hover:shadow-md transition-shadow group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={deal.image}
                      alt={deal.name.replace("\n", " ")}
                      className="w-16 h-14 rounded-lg object-cover flex-shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <p
                        className="font-bold text-[#1C1F26] leading-snug group-hover:text-[#F5C518] transition-colors"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.05rem" }}
                      >
                        {deal.name.replace("\n", " ")}
                      </p>
                      <span className="text-xs text-gray-500">{deal.badge}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Col 2: Trending ── */}
            <div>
              <h3
                className="text-2xl font-black text-[#1C1F26] mb-5"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Trending <span className="heading-underline">This Week</span>
              </h3>
              <div className="space-y-3">
                {finalTrendingItems.map((item, idx) => (
                  <Link
                    href={`/products?category=${item.slug}`}
                    key={`trend-${item.name}-${idx}`}
                    className="flex items-center gap-3 bg-white rounded-xl p-3 hover:shadow-md transition-shadow group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-14 rounded-lg object-cover flex-shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <p
                        className="font-bold text-[#1C1F26] leading-snug group-hover:text-[#F5C518] transition-colors"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.05rem" }}
                      >
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">{item.brand}</p>
                      <p className="text-sm font-bold text-[#F5C518] mt-0.5">{item.price}</p>
                    </div>
                    <TrendingUp className="h-4 w-4 text-[#F5C518] ml-auto flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Col 3: Top Brands ── */}
            <div>
              <h3
                className="text-2xl font-black text-[#1C1F26] mb-5"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Top <span className="heading-underline">Brands</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {topBrands.map((brand) => (
                  <Link
                    href={`/products?brand=${encodeURIComponent(brand)}`}
                    key={brand}
                    className="brand-pill"
                  >
                    {brand}
                  </Link>
                ))}
              </div>
              <div className="mt-8 bg-[#1C1F26] rounded-2xl p-6 text-white">
                <p className="text-xs font-bold tracking-widest text-[#F5C518] uppercase mb-2">
                  Sell on MINAR
                </p>
                <p
                  className="text-2xl font-black leading-tight mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Are you a supplier or manufacturer?
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  List your products and reach thousands of contractors.
                </p>
                <Link
                  href="/seller/register"
                  className="inline-flex items-center gap-2 bg-[#F5C518] text-[#1C1F26] font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-yellow-400 transition-colors"
                >
                  Start Selling <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          REVIEWS
      ════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container-minar">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest text-[#F5C518] uppercase mb-2">
              What Professionals Say
            </p>
            <h2
              className="section-title text-4xl lg:text-5xl text-[#1C1F26]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Trusted by <span>Builders</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="bg-[#F8F9FA] rounded-2xl p-7 hover:shadow-lg transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#F5C518] fill-[#F5C518]" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">
                  &quot;{r.text}&quot;
                </p>
                <div>
                  <p className="font-bold text-[#1C1F26] text-sm">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════ */}
      <section className="py-20 bg-[#1C1F26] relative overflow-hidden">
        {/* Yellow accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#F5C518]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-minar relative z-10 text-center">
          <p className="text-xs font-bold tracking-widest text-[#F5C518] uppercase mb-4">
            Start Today
          </p>
          <h2
            className="text-5xl lg:text-7xl font-black text-white mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            READY TO BUILD
            <span className="text-[#F5C518] block">WITHOUT THE HUSTLE?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of contractors and builders who trust MINAR for transparent,
            hassle-free procurement.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products" className="btn-primary text-base px-8 py-4">
              Start Shopping <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/seller/register" className="btn-outline-light text-base px-8 py-4">
              Become a Seller
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}