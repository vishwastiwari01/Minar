"use client";

import { Navbar } from "@/components/minar/Navbar";
import { Footer } from "@/components/minar/Footer";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  ShieldCheck, 
  Zap, 
  Target, 
  Users, 
  Trophy 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* ── Hero Section ── */}
        <section className="relative py-24 lg:py-32 bg-[#1C1F26] text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1F26] to-transparent"></div>
            <Image 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop"
              alt="Construction background"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="container-minar relative z-10">
            <div className="max-w-3xl">
              <div className="w-20 h-1.5 bg-[#F5C518] mb-8"></div>
              <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.85]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Building with <br />
                <span className="text-[#F5C518]">Authority</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light max-w-2xl">
                Minar is India's premier fixed-price construction marketplace, designed to bring transparency, efficiency, and uncompromising quality to the building industry.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#F5C518] hover:bg-white text-[#1C1F26] px-8 h-14 rounded-none font-bold uppercase tracking-widest text-xs transition-all">
                  Our Mission
                </Button>
                <Link href="/products">
                  <Button variant="outline" className="border-white/20 hover:border-[#F5C518] text-white hover:bg-[#F5C518] hover:text-[#1C1F26] px-8 h-14 rounded-none font-bold uppercase tracking-widest text-xs transition-all">
                    Explore Inventory
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Value Propositions ── */}
        <section className="py-24 bg-white">
          <div className="container-minar">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-[#F5C518]/10 flex items-center justify-center rounded-2xl">
                  <ShieldCheck className="w-8 h-8 text-[#1C1F26]" />
                </div>
                <h3 className="text-3xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Verified Quality
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every seller on our platform undergoes a rigorous 50-point verification process. We ensure that only authentic, certified building materials reach your site.
                </p>
              </div>

              <div className="space-y-6">
                <div className="w-16 h-16 bg-[#F5C518]/10 flex items-center justify-center rounded-2xl">
                  <Zap className="w-8 h-8 text-[#1C1F26]" />
                </div>
                <h3 className="text-3xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Fixed Pricing
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  No bargaining, no hidden costs. Our transparent pricing model saves time and allows project managers to budget with 100% accuracy from day one.
                </p>
              </div>

              <div className="space-y-6">
                <div className="w-16 h-16 bg-[#F5C518]/10 flex items-center justify-center rounded-2xl">
                  <Target className="w-8 h-8 text-[#1C1F26]" />
                </div>
                <h3 className="text-3xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Precision Logistics
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our proprietary tracking system ensures your materials arrive exactly when they're scheduled. We minimize downtime on your construction site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats/Impact ── */}
        <section className="py-24 bg-[#F8F9FA] border-y border-gray-100">
          <div className="container-minar">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: "Products Listed", value: "50,000+" },
                { label: "Verified Sellers", value: "1,200+" },
                { label: "Cities Served", value: "2" },
                { label: "Success Rate", value: "99.8%" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl font-black text-[#1C1F26] mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section className="py-24">
          <div className="container-minar">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1974&auto=format&fit=crop"
                    alt="Our work"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-[#F5C518] p-12 hidden lg:block rounded-3xl shadow-xl">
                  <Trophy className="w-12 h-12 text-[#1C1F26] mb-4" />
                  <div className="text-4xl font-bold uppercase tracking-tighter" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Since <br /> 2024
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="inline-block px-4 py-1.5 bg-[#F5C518]/10 text-[#1C1F26] text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  Our Origins
                </div>
                <h2 className="text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Revolutionizing <br /> an <span className="text-[#F5C518]">Industry</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Minar was born out of a simple observation: the construction material procurement process was broken. Between fluctuating prices, unreliable sellers, and inconsistent quality, project timelines were suffering.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We set out to build a platform that treated construction materials like specialized commodities—where quality is guaranteed and prices are fixed. Today, we serve thousands of builders across Bangalore and Hyderabad.
                </p>
                <div className="pt-6 grid grid-cols-2 gap-8 text-[#1C1F26]">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-[#F5C518]" />
                    <span className="font-bold text-sm uppercase tracking-widest">Corp HQ: Bangalore</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-[#F5C518]" />
                    <span className="font-bold text-sm uppercase tracking-widest">200+ Experts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
