import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#211E1A] text-[#F7F3ED] border-t border-[#C6A66B]/20 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3A352F]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif-luxury text-3xl tracking-[0.25em] font-light text-[#F7F3ED] uppercase">
                AURELLE
              </span>
              <span className="block text-[9px] tracking-[0.4em] uppercase text-[#C6A66B] font-light mt-0.5">
                Haute Joaillerie Atelier
              </span>
            </Link>
            <p className="text-sm text-[#A59C90] font-light leading-relaxed max-w-sm">
              Conceived for those who seek the sublime. Every AURELLE creation is an intimate dialogue between time-honored artisanal goldsmithing and modern quiet luxury.
            </p>
            <div className="pt-2 text-xs text-[#81786F]">
              <p>Private Salon: Colaba Causeway, Mumbai 400005 (Demo Atelier)</p>
              <p className="mt-1">Inquiries: concierge@aurelle-haute.com</p>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#C6A66B]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#D1C8BC]">
              <li>
                <Link href="/shop?category=rings" className="hover:text-[#C6A66B] transition-colors">
                  Solitaire Rings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=necklaces" className="hover:text-[#C6A66B] transition-colors">
                  High Jewellery Collars
                </Link>
              </li>
              <li>
                <Link href="/shop?category=earrings" className="hover:text-[#C6A66B] transition-colors">
                  Lustrous Earrings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bracelets" className="hover:text-[#C6A66B] transition-colors">
                  Tennis Bracelets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bridal" className="hover:text-[#C6A66B] transition-colors">
                  The Bridal Suite
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#C6A66B]">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#D1C8BC]">
              <li>
                <Link href="/faq" className="hover:text-[#C6A66B] transition-colors">
                  Client Assistance & FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-[#C6A66B] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C6A66B] transition-colors">
                  Book Salon Appointment
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#C6A66B] transition-colors">
                  Demo Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Maison & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#C6A66B]">
              Maison
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#D1C8BC]">
              <li>
                <Link href="/about" className="hover:text-[#C6A66B] transition-colors">
                  Our Story & Craft
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#C6A66B] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C6A66B] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
            <div className="pt-2">
              <span className="text-[11px] text-[#81786F] block mb-1">Follow Maison:</span>
              <div className="flex space-x-3 text-xs text-[#D1C8BC]">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#C6A66B] flex items-center gap-0.5">
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-[#C6A66B] flex items-center gap-0.5">
                  <span>Pinterest</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#81786F] gap-4 font-light text-center sm:text-left">
          <p>© {new Date().getFullYear()} AURELLE Haute Joaillerie. All rights reserved. Demo Storefront.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 sm:gap-x-4 gap-y-1 text-[11px]">
            <span>Quiet Luxury Atelier</span>
            <span>•</span>
            <span>18K Hallmarked Gold Demo</span>
            <span>•</span>
            <span>Insured White Glove Courier</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
