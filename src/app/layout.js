import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastProvider from "@/components/ui/ToastProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "AURELLE | Fine Luxury Jewellery — Made to Be Kept",
  description:
    "Discover thoughtfully designed fine jewellery handcrafted with timeless elegance. Explore rings, necklaces, earrings, bracelets, and bridal collections by AURELLE.",
  keywords: "luxury jewellery, fine jewellery, gold rings, diamond necklaces, bridal jewellery, AURELLE",
  openGraph: {
    title: "AURELLE | Fine Luxury Jewellery",
    description: "Jewellery That Becomes Part of Your Story.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F3ED] text-[#27231F] selection:bg-[#C6A66B] selection:text-white">
        <ToastProvider />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
