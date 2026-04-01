"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Heart, 
  Star,
  Zap,
  Shield,
  Truck,
  Eye
} from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  badge?: "New" | "Sale" | "Hot" | "Featured";
  seller?: string;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating = 4.5,
  reviews = 0,
  inStock = true,
  badge,
  seller = "Verified Seller"
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const discount = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const getBadgeStyle = () => {
    switch (badge) {
      case "New":
        return "bg-blue-500";
      case "Sale":
        return "bg-red-500";
      case "Hot":
        return "bg-orange-500";
      case "Featured":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden border border-gray-200 hover:border-[#F5C518] transition-all duration-300 hover:shadow-xl bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {badge && (
          <Badge className="bg-[#1C1F26] text-white border-none shadow-md text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">
            {badge}
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="bg-green-600 text-white border-none shadow-md text-[10px] uppercase font-bold px-2 py-0.5 rounded">
            {discount}% OFF
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition-transform"
        aria-label="Add to wishlist"
      >
        <Heart
          className={`h-4 w-4 ${
            isWishlisted 
              ? "fill-red-500 text-red-500" 
              : "text-gray-500 hover:text-gray-900"
          }`}
        />
      </button>

      {/* Image Container */}
      <Link href={`/products/${id}`} className="block relative aspect-[4/3] overflow-hidden bg-[#F8F9FA]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
        />
        
        {/* Overlay on Hover */}
        <div className={`absolute inset-0 bg-[#1C1F26]/30 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <Button 
            size="sm" 
            className="bg-white text-[#1C1F26] hover:bg-[#F5C518] border-none font-semibold transition-colors"
          >
            <Eye className="mr-2 h-4 w-4" />
            Quick View
          </Button>
        </div>

        {/* Stock Indicator */}
        {!inStock && (
          <div className="absolute inset-0 bg-[#1C1F26]/70 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-white text-[#1C1F26] px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">Out of Stock</span>
          </div>
        )}
      </Link>

      <CardContent className="p-5">
        {/* Category */}
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5">
          <span className="w-4 h-px bg-[#F5C518]"></span>
          {category}
        </p>

        {/* Product Name */}
        <Link href={`/products/${id}`}>
          <h3 
            className="font-bold text-lg mb-2 line-clamp-2 text-[#1C1F26] group-hover:text-[#F5C518] transition-colors leading-tight min-h-[2.8rem]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.3rem" }}
          >
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(rating)
                    ? "fill-[#F5C518] text-[#F5C518]"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-gray-500">
            {rating} {reviews > 0 && `(${reviews})`}
          </span>
        </div>

        {/* Price & Features Row */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#1C1F26]">
                ₹{price.toLocaleString("en-IN")}
              </span>
              {originalPrice && (
                <span className="text-sm font-medium text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider">Incl. GST</p>
          </div>
        </div>

        {/* Features minimal */}
        <div className="flex items-center gap-x-4 gap-y-2 mb-4 text-[11px] font-medium text-gray-600 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Shield className="h-3 w-3 text-green-600" />
            Verified
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="h-3 w-3 text-blue-600" />
            Fast Ship
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full bg-[#1C1F26] hover:bg-[#F5C518] text-white hover:text-[#1C1F26] transition-colors font-semibold"
          disabled={!inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  );
}