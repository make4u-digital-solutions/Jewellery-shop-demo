import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Truck, ShieldCheck, RotateCcw, PackageCheck } from "lucide-react";

export const metadata = {
  title: "Shipping & Returns Policy | AURELLE Haute Joaillerie",
  description: "Information on our insured white-glove courier shipping and 15-day return policy.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="bg-[#F7F3ED] min-h-screen pb-24">
      <div className="border-b border-[#E6DED3] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <Breadcrumbs items={[{ label: "Shipping & Returns" }]} />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C6A66B] font-medium block mt-2 mb-2">
            Client Logistics & Privileges
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#27231F] font-normal tracking-tight">
            White-Glove Shipping & Returns
          </h1>
          <p className="text-sm sm:text-base text-[#81786F] font-light max-w-xl mx-auto mt-4 leading-relaxed">
            Every AURELLE creation travels in secure armoured transit and arrives discreetly packaged with salon presentation boxes and certificates.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        {/* Four Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E6DED3] p-6 space-y-3">
            <Truck className="w-6 h-6 text-[#C6A66B]" />
            <h3 className="font-serif-luxury text-xl text-[#27231F] font-medium">
              Complimentary Insured Delivery
            </h3>
            <p className="text-xs text-[#81786F] font-light leading-relaxed">
              We offer complimentary insured courier dispatch across India on all acquisitions over ₹5,000. Orders below ₹5,000 carry a nominal ₹350 logistics fee.
            </p>
          </div>

          <div className="bg-white border border-[#E6DED3] p-6 space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#C6A66B]" />
            <h3 className="font-serif-luxury text-xl text-[#27231F] font-medium">
              100% Insured Transit
            </h3>
            <p className="text-xs text-[#81786F] font-light leading-relaxed">
              From our bench to your hands, shipments are fully insured against loss or damage. For safety, deliveries require an adult signature and OTP verification.
            </p>
          </div>

          <div className="bg-white border border-[#E6DED3] p-6 space-y-3">
            <RotateCcw className="w-6 h-6 text-[#C6A66B]" />
            <h3 className="font-serif-luxury text-xl text-[#27231F] font-medium">
              15-Day Return Window
            </h3>
            <p className="text-xs text-[#81786F] font-light leading-relaxed">
              Unworn creations in their original condition with security seal attached may be returned or exchanged within 15 days of confirmed delivery.
            </p>
          </div>

          <div className="bg-white border border-[#E6DED3] p-6 space-y-3">
            <PackageCheck className="w-6 h-6 text-[#C6A66B]" />
            <h3 className="font-serif-luxury text-xl text-[#27231F] font-medium">
              Discreet Kept Packaging
            </h3>
            <p className="text-xs text-[#81786F] font-light leading-relaxed">
              Exterior mailing cartons bear no luxury branding to prevent theft. Inside, you will find our signature suede box, polishing cloth, and demo certificate.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white border border-[#E6DED3] p-8 space-y-6 text-xs text-[#81786F] leading-relaxed">
          <h2 className="font-serif-luxury text-2xl text-[#27231F] font-medium border-b border-[#E6DED3] pb-3">
            Return Instructions & Conditions
          </h2>
          <p>
            To initiate a return or resizing request, please connect with our Client Concierge at <strong>concierge@aurelle-haute.com</strong> citing your Order Reference number.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 font-light">
            <li>Pieces must be completely free of wear, scratches, perfumes, and alterations.</li>
            <li>Security hangtags must remain untampered and fastened to the jewellery.</li>
            <li>All original packaging, warranty certificates, and complimentary gifts must be included.</li>
            <li>Custom engraved, modified, or specially commissioned high-jewellery suites are non-refundable.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
