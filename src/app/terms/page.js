import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Terms of Service | AURELLE Haute Joaillerie",
  description: "Terms and conditions governing acquisitions and services at AURELLE.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#F7F3ED] min-h-screen pb-24">
      <div className="border-b border-[#E6DED3] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <Breadcrumbs items={[{ label: "Terms of Service" }]} />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C6A66B] font-medium block mt-2 mb-2">
            Maison Terms & Conditions
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#27231F] font-normal tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-[#81786F] mt-2">Effective Date: January 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white border border-[#E6DED3] p-8 sm:p-12 space-y-8 text-xs text-[#81786F] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-[#27231F] font-medium">
              1. Overview & Demonstration Notice
            </h2>
            <p className="font-light">
              This digital platform operates as an interactive concept showcase for AURELLE Haute Joaillerie. All products, prices, and checkout actions are for demonstrative purposes and do not constitute a legally binding commercial contract.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-[#27231F] font-medium">
              2. Intellectual Property
            </h2>
            <p className="font-light">
              All jewellery designs, visual layouts, editorial copy, and typography treatments displayed on this website are the intellectual property of AURELLE. Any reproduction without explicit prior written authorization is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-[#27231F] font-medium">
              3. Pricing & Specifications
            </h2>
            <p className="font-light">
              Prices are denominated in Indian Rupees (INR) and are subject to adjustment based on precious metal market movements. Carat weights and gemstone measurements represent nominal values typical of artisanal bench setting.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-[#27231F] font-medium">
              4. Governing Law
            </h2>
            <p className="font-light">
              These terms shall be governed by and construed in accordance with the laws of India, under the jurisdiction of the courts of Mumbai.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
