import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MINAR — Build with Authority | India's Premier Construction Marketplace",
  description:
    "Fixed prices. Verified sellers. Zero bargaining. Shop cement, steel, electrical supplies, and construction tools at transparent prices. Serving Bangalore & Hyderabad.",
  keywords: [
    "construction materials",
    "hardware supplies",
    "cement",
    "steel",
    "power tools",
    "fixed price marketplace",
    "building materials India",
    "verified sellers",
  ],
  openGraph: {
    title: "MINAR — Build with Authority",
    description: "India's first fixed-price construction marketplace. No bargaining. No hustle.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${barlowCondensed.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}