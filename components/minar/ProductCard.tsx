"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand?: string;
  stock: number;
  location?: string;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
  brand,
  stock,
  location,
}: ProductCardProps) {
  const isInStock = stock > 0;
  
  // Format price in Indian currency
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      {/* Make image clickable */}
      <Link href={`/products/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={image || `https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop`}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!isInStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="secondary" className="text-sm">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        {/* Make product name clickable */}
        <Link href={`/products/${id}`}>
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-yellow-600 transition-colors">
                {name}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>{category}</span>
              {brand && (
                <>
                  <span>•</span>
                  <span>{brand}</span>
                </>
              )}
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-black">
                {formattedPrice}
              </span>
              <span className="text-xs text-gray-600">inc. GST</span>
            </div>

            {location && (
              <p className="text-xs text-gray-600">
                📍 {location}
              </p>
            )}
          </div>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          disabled={!isInStock}
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            // Add to cart logic will go here
            console.log(`Adding product ${id} to cart`);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isInStock ? "Add to Cart" : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
}