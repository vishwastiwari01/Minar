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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black">All Products</h1>
            <p className="mt-2 text-gray-600">
              Browse our complete catalog of construction and hardware supplies
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden md:block w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Filters</h3>
                </div>

                {/* Category Filter */}
                <div>
                  <h4 className="mb-3 font-medium">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label
                          htmlFor={category}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Filter */}
                <div>
                  <h4 className="mb-3 font-medium">Price Range</h4>
                  <div className="space-y-4">
                    <Slider
                      min={0}
                      max={10000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Location Filter */}
                <div>
                  <h4 className="mb-3 font-medium">Location</h4>
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={location}
                          checked={selectedLocations.includes(location)}
                          onCheckedChange={() => toggleLocation(location)}
                        />
                        <Label
                          htmlFor={location}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {location}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
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
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mb-4"></div>
                  <p className="text-gray-600">Loading products...</p>
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