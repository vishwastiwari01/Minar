"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/minar/Navbar";
import { Footer } from "@/components/minar/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Minus, 
  Plus, 
  MapPin,
  Store,
  Shield,
  Truck,
  CheckCircle2
} from "lucide-react";

// Mock product data - Replace with actual API call
const mockProductData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Bosch Professional Angle Grinder GWS 800",
    price: 3499,
    image: "/placeholder-product.jpg",
    category: "Power Tools",
    brand: "Bosch",
    stock: 15,
    location: "Bangalore",
    description: "Professional grade angle grinder with 800W motor. Ideal for cutting and grinding metal, tiles, and concrete. Features soft-grip handle for comfortable operation and spindle lock for easy accessory changes.",
    specifications: {
      "Power": "800W",
      "Disc Size": "4 inch (100mm)",
      "No Load Speed": "11,000 RPM",
      "Weight": "1.7 kg",
      "Cable Length": "2.5 meters",
      "Warranty": "1 year",
    },
    seller: {
      name: "Premium Tools Bangalore",
      rating: 4.5,
      verified: true,
    }
  },
  "2": {
    id: "2",
    name: "Stanley 100pc Socket Set",
    price: 2899,
    image: "/placeholder-product.jpg",
    category: "Hand Tools",
    brand: "Stanley",
    stock: 8,
    location: "Hyderabad",
    description: "Comprehensive 100-piece socket set for professional mechanics and DIY enthusiasts. Includes standard and deep sockets, ratchets, extensions, and adapters in a durable carry case.",
    specifications: {
      "Pieces": "100",
      "Drive Sizes": "1/4\", 3/8\", 1/2\"",
      "Material": "Chrome Vanadium Steel",
      "Case Type": "Blow Mold Case",
      "Warranty": "Lifetime",
    },
    seller: {
      name: "Hardware Hub Hyderabad",
      rating: 4.8,
      verified: true,
    }
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const [quantity, setQuantity] = useState(1);
  const product = mockProductData[productId];

  // If product not found, show error
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => router.push("/products")}>
              Back to Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  const totalPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price * quantity);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container-minar py-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.push("/products")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image */}
            <div>
              <div className="relative aspect-square overflow-hidden rounded-lg border bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Brand */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  {product.seller.verified && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      <Shield className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-black mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600">Brand: {product.brand}</p>
              </div>

              {/* Price */}
              <div>
                <div className="text-4xl font-bold font-mono text-black">
                  {formattedPrice}
                </div>
                <p className="text-sm text-gray-600 mt-1">inc. GST</p>
              </div>

              <Separator />

              {/* Stock & Location */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  {product.stock > 0 ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-red-600" />
                  )}
                  <span className="font-medium">
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{product.location}</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block mb-2 font-medium">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-gray-600">
                    Total: <span className="font-bold text-black">{totalPrice}</span>
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                size="lg"
                className="w-full"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              {/* Trust Signals */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Fast Delivery</p>
                      <p className="text-xs text-gray-600">2-3 business days</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Authentic Product</p>
                      <p className="text-xs text-gray-600">Brand warranty</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* Seller Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Store className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">Sold by</span>
                </div>
                <p className="font-semibold text-lg">{product.seller.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  ⭐ {product.seller.rating} rating • Verified Seller
                </p>
              </div>
            </div>
          </div>

          {/* Product Description & Specs */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Product Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="font-medium text-gray-700">{key}</span>
                    <span className="text-gray-600">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}