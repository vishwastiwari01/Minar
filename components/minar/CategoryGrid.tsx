"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Hammer, 
  Wrench, 
  PaintBucket, 
  Ruler, 
  Zap, 
  Layers 
} from "lucide-react";

const categories = [
  {
    id: "tools",
    name: "Power Tools",
    icon: Hammer,
    count: 120,
    color: "text-blue-600",
  },
  {
    id: "hardware",
    name: "Hardware & Fittings",
    icon: Wrench,
    count: 200,
    color: "text-gray-600",
  },
  {
    id: "paint",
    name: "Paint & Supplies",
    icon: PaintBucket,
    count: 80,
    color: "text-red-600",
  },
  {
    id: "measurement",
    name: "Measurement Tools",
    icon: Ruler,
    count: 45,
    color: "text-yellow-600",
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: Zap,
    count: 150,
    color: "text-orange-600",
  },
  {
    id: "materials",
    name: "Building Materials",
    icon: Layers,
    count: 90,
    color: "text-green-600",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="container-minar">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-minar-black sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need for construction and renovation
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.id} href={`/products?category=${category.id}`}>
                <Card className="group cursor-pointer transition-all hover:shadow-lg hover:border-minar-gold">
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="mb-4 rounded-full bg-minar-gray-50 p-4 transition-colors group-hover:bg-minar-gold/10">
                      <Icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <h3 className="font-semibold text-minar-black">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {category.count} products
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}