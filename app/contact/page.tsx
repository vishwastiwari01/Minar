"use client";

import { Navbar } from "@/components/minar/Navbar";
import { Footer } from "@/components/minar/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, 
  Mail, 
  PhoneCall, 
  MapPin, 
  Clock, 
  MessagesSquare, 
  Headphones 
} from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate contact form submission
    alert("Message sent! Our support team will contact you shortly.");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* ── Hero Section ── */}
        <section className="relative py-24 bg-[#1C1F26] text-white">
          <div className="container-minar">
            <div className="max-w-3xl">
              <div className="w-20 h-1.5 bg-[#F5C518] mb-8"></div>
              <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.85]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Get in <br />
                <span className="text-[#F5C518]">Touch</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                Whether you're a project manager, individual builder, or a seller looking to join our platform, our team is ready to assist you.
              </p>
            </div>
          </div>
        </section>

        {/* ── Contact Layout ── */}
        <section className="py-24 relative overflow-hidden">
          <div className="container-minar">
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              
              {/* ── Left: Contact Info ── */}
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-1.5 bg-[#F5C518]/10 text-[#1C1F26] text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    Support Channels
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tight leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    How can we <span className="text-[#F5C518]">Help?</span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our verified support team is available mon-sat to assist you with order tracking, seller verification, and project procurement.
                  </p>
                </div>

                <div className="grid gap-6">
                  <div className="group flex items-start gap-4 p-6 bg-white border-2 border-gray-50 rounded-3xl hover:border-[#F5C518] transition-all">
                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-2xl group-hover:bg-[#F5C518] transition-colors">
                      <PhoneCall className="w-6 h-6 text-[#1C1F26]" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">Call Center</div>
                      <div className="text-xl font-bold text-[#1C1F26] tracking-tight">+91 80888 08880</div>
                      <div className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">English, Hindi, Kannada, Telugu</div>
                    </div>
                  </div>

                  <div className="group flex items-start gap-4 p-6 bg-white border-2 border-gray-50 rounded-3xl hover:border-[#F5C518] transition-all">
                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-2xl group-hover:bg-[#F5C518] transition-colors">
                      <Mail className="w-6 h-6 text-[#1C1F26]" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">Email Support</div>
                      <div className="text-xl font-bold text-[#1C1F26] tracking-tight hover:text-[#F5C518]">support@minar.in</div>
                      <div className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">Average response: 2 Hours</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="inline-block px-4 py-1.5 bg-[#F5C518]/10 text-[#1C1F26] text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    Our Hubs
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                    <MapPin className="w-5 h-5 text-[#F5C518]" />
                      <div className="text-sm font-black uppercase tracking-tight text-[#1C1F26]">Bangalore HQ</div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        HSR Layout Sector 2, <br />
                        Bengaluru, KA 560102
                      </p>
                    </div>
                    <div className="space-y-2">
                      <MapPin className="w-5 h-5 text-[#F5C518]" />
                      <div className="text-sm font-black uppercase tracking-tight text-[#1C1F26]">Hyderabad Hub</div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        HITEC City Phase 3, <br />
                        Hyderabad, TS 500081
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Right: Contact Form ── */}
              <div className="lg:col-span-7">
                <div className="bg-[#1C1F26] p-10 lg:p-14 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5C518]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black uppercase tracking-tight mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Send Us a <span className="text-[#F5C518]">Message</span>
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                          <Input className="bg-white/5 border-white/10 rounded-xl h-14 focus:ring-[#F5C518] focus:border-[#F5C518] text-white" placeholder="Arjun Reddy" required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                          <Input type="email" className="bg-white/5 border-white/10 rounded-xl h-14 focus:ring-[#F5C518] focus:border-[#F5C518] text-white" placeholder="arjun@constructions.com" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Subject / Category</label>
                        <select className="flex h-14 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#F5C518] disabled:cursor-not-allowed disabled:opacity-50 text-white">
                          <option className="bg-[#1C1F26]">Bulk Order Inquiry</option>
                          <option className="bg-[#1C1F26]">Seller Onboarding</option>
                          <option className="bg-[#1C1F26]">Order Support</option>
                          <option className="bg-[#1C1F26]">Logistics & Delivery</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Your Message</label>
                        <Textarea className="bg-white/5 border-white/10 rounded-xl min-h-[160px] focus:ring-[#F5C518] focus:border-[#F5C518] text-white" placeholder="Tell us more about your requirements..." required />
                      </div>

                      <Button className="w-full bg-[#F5C518] hover:bg-white text-[#1C1F26] h-14 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-[#F5C518]/20">
                        Submit Request
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Quick Links ── */}
        <section className="py-24 bg-[#F8F9FA]">
          <div className="container-minar text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-12" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Quick <span className="text-[#F5C518]">Support</span> Access
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { icon: MessagesSquare, title: "Chat Live", desc: "Average wait: 3 mins" },
                { icon: Headphones, title: "Phone Support", desc: "Available 9am - 7pm" },
                { icon: Clock, title: "Knowledge Base", desc: "Read documentation" }
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-white rounded-3xl border border-gray-100 flex flex-col items-center hover:shadow-xl transition-shadow cursor-pointer">
                  <item.icon className="w-10 h-10 text-[#F5C518] mb-4" />
                  <div className="font-bold text-[#1C1F26] uppercase tracking-tight">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-2 font-medium">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
