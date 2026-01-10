import { Navbar } from "@/components/minar/Navbar";
import { HeroSection } from "@/components/minar/HeroSection";
import { CategoryGrid } from "@/components/minar/CategoryGrid";
import { Footer } from "@/components/minar/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Truck, IndianRupee } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Category Grid */}
        <CategoryGrid />

        {/* Why MINAR Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-minar">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black sm:text-4xl">
                Why Choose MINAR?
              </h2>
              <p className="mt-4 text-gray-600">
                Built for professionals who value transparency and efficiency
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <Card className="border-gray-200">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex rounded-lg bg-yellow-100 p-3">
                    <IndianRupee className="h-6 w-6 text-yellow-700" />
                  </div>
                  <h3 className="mb-2 font-semibold text-lg">Fixed Pricing</h3>
                  <p className="text-sm text-gray-600">
                    No bargaining. No hidden costs. What you see is what you pay.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="border-gray-200">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2 font-semibold text-lg">Verified Sellers</h3>
                  <p className="text-sm text-gray-600">
                    Every seller is verified with certifications and business documents.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="border-gray-200">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex rounded-lg bg-green-100 p-3">
                    <Truck className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mb-2 font-semibold text-lg">Fast Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Same-day delivery within city limits for most products.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card className="border-gray-200">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex rounded-lg bg-purple-100 p-3">
                    <Check className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="mb-2 font-semibold text-lg">Quality Assured</h3>
                  <p className="text-sm text-gray-600">
                    Authentic products with brand warranties and quality guarantees.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container-minar">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-gray-600">
                Simple, transparent, and efficient
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-600 text-white text-xl font-bold">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">Browse & Select</h3>
                <p className="text-gray-600">
                  Search through our catalog of verified products with transparent pricing.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-600 text-white text-xl font-bold">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Place Order</h3>
                <p className="text-gray-600">
                  Add to cart and checkout securely with UPI, cards, or cash on delivery.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-600 text-white text-xl font-bold">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Receive & Build</h3>
                <p className="text-gray-600">
                  Get fast delivery and start your project with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-black text-white">
          <div className="container-minar text-center">
            <Badge className="mb-6 bg-yellow-600 text-black hover:bg-yellow-700">
              Join the Revolution
            </Badge>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Build Without the Hustle?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
              Join thousands of professionals who trust MINAR for their construction needs.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100" asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
                asChild
              >
                <Link href="/seller/register">Become a Seller</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}