"use client";

import { useState, useEffect } from "react";
import { supabase, Product } from "@/lib/supabase";
import { Navbar } from "@/components/minar/Navbar";
import { Footer } from "@/components/minar/Footer";
import { ProductCard } from "@/components/minar/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal } from "lucide-react";

// Mock data as fallback
const mockProducts = [
  {
    id: "1",
    name: "Bosch Professional Angle Grinder GWS 800",
    price: 3499,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
    category: "Power Tools",
    brand: "Bosch",
    stock: 15,
    location: "Bangalore",
  },
  {
    id: "2",
    name: "Stanley 100pc Socket Set",
    price: 2899,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop",
    category: "Hand Tools",
    brand: "Stanley",
    stock: 8,
    location: "Hyderabad",
  },
  {
    id: "3",
    name: "Asian Paints Tractor Emulsion 20L",
    price: 5200,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop",
    category: "Paint & Supplies",
    brand: "Asian Paints",
    stock: 25,
    location: "Bangalore",
  },
  {
    id: "4",
    name: "Makita Cordless Drill Driver 18V",
    price: 8999,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
    category: "Power Tools",
    brand: "Makita",
    stock: 5,
    location: "Bangalore",
  },
  {
    id: "5",
    name: "Fevicol MR 1kg Adhesive",
    price: 180,
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=400&fit=crop",
    category: "Adhesives",
    brand: "Fevicol",
    stock: 50,
    location: "Hyderabad",
  },
  {
    id: "6",
    name: "Cera Sanitaryware Basin",
    price: 4500,
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=400&fit=crop",
    category: "Bathroom Fittings",
    brand: "Cera",
    stock: 12,
    location: "Bangalore",
  },
];

const categories = [
  "Power Tools",
  "Hand Tools",
  "Paint & Supplies",
  "Adhesives",
  "Bathroom Fittings",
  "Electrical",
];

const locations = ["Bangalore", "Hyderabad"];

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<typeof mockProducts>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
          setProducts(mockProducts);
        } else if (data) {
          // Map Supabase data to match our product format
          const mappedProducts = data.map((item: Product) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image_url || `https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop`,
            category: item.category || "Uncategorized",
            brand: item.brand,
            stock: item.stock,
            location: item.location,
          }));
          setProducts(mappedProducts);
        } else {
          setProducts(mockProducts);
        }
      } catch (err) {
        console.error('Error:', err);
        setProducts(mockProducts);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(product.location);
    return matchesCategory && matchesPrice && matchesLocation;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container-minar py-8">
          {/* Header */}
          <div className="mb-10 bg-[#1C1F26] rounded-xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
            <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1541888081635-4221147817eb?q=80&w=1200')] bg-cover bg-center mix-blend-luminosity"></div>
            
            <div className="relative z-20">
              <h1 
                className="text-4xl md:text-5xl font-black uppercase tracking-wide mb-2 text-white"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Our <span className="text-[#F5C518]">Products</span>
              </h1>
              <p className="text-gray-300 max-w-xl text-sm md:text-base">
                Browse our complete catalog of commercial-grade construction and hardware supplies. Fixed prices, GST invoices, verified sellers.
              </p>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden md:block w-64 shrink-0">
              <div className="sticky top-24 bg-[#1C1F26] rounded-xl p-6 shadow-xl border border-gray-800 space-y-8 text-white">
                <div>
                  <h3 
                    className="text-2xl font-black uppercase tracking-wider mb-2" 
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Filters
                  </h3>
                  <div className="w-10 h-1 bg-[#F5C518]"></div>
                </div>

                {/* Category Filter */}
                <div>
                  <h4 className="mb-4 font-bold text-xs uppercase tracking-widest text-gray-400">Category</h4>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-3 group">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                          className="border-gray-500 data-[state=checked]:bg-[#F5C518] data-[state=checked]:border-[#F5C518] data-[state=checked]:text-[#1C1F26]"
                        />
                        <Label
                          htmlFor={category}
                          className="text-sm font-medium text-gray-300 cursor-pointer group-hover:text-white transition-colors"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-800" />

                {/* Price Filter */}
                <div>
                  <h4 className="mb-4 font-bold text-xs uppercase tracking-widest text-gray-400">Price Range</h4>
                  <div className="space-y-5">
                    <Slider
                      min={0}
                      max={10000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm font-bold text-[#F5C518]">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-800" />

                {/* Location Filter */}
                <div>
                  <h4 className="mb-4 font-bold text-xs uppercase tracking-widest text-gray-400">Location</h4>
                  <div className="space-y-3">
                    {locations.map((location) => (
                      <div key={location} className="flex items-center space-x-3 group">
                        <Checkbox
                          id={location}
                          checked={selectedLocations.includes(location)}
                          onCheckedChange={() => toggleLocation(location)}
                          className="border-gray-500 data-[state=checked]:bg-[#F5C518] data-[state=checked]:border-[#F5C518] data-[state=checked]:text-[#1C1F26]"
                        />
                        <Label
                          htmlFor={location}
                          className="text-sm font-medium text-gray-300 cursor-pointer group-hover:text-white transition-colors"
                        >
                          {location}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent border-2 border-gray-700 text-gray-300 hover:bg-[#F5C518] hover:text-[#1C1F26] hover:border-[#F5C518] transition-all font-bold uppercase tracking-widest text-xs py-5"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedLocations([]);
                    setPriceRange([0, 10000]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </aside>

            {/* Mobile Filter Toggle */}
            <div className="md:hidden fixed bottom-4 right-4 z-50">
              <Button
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-full shadow-lg"
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-[#F5C518] mb-6"></div>
                  <p className="font-black text-2xl text-[#1C1F26] uppercase tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Loading Inventory <span className="text-[#F5C518]">...</span>
                  </p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No products found matching your filters.</p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedLocations([]);
                      setPriceRange([0, 10000]);
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}