import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Privacy Policy | AURELLE Haute Joaillerie",
  description: "Privacy policy and client data protection practices of AURELLE.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#F7F3ED] min-h-screen pb-24">
      <div className="border-b border-[#E6DED3] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C6A66B] font-medium block mt-2 mb-2">
            Client Confidentiality
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#27231F] font-normal tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#81786F] mt-2">Effective Date: January 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white border border-[#E6DED3] p-8 sm:p-12 space-y-8 text-xs text-[#81786F] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-[#27231F] font-medium">
              1. Our Commitment to Client Confidentiality
            </h2>
            <p className="font-light">
              At AURELLE, client trust and privacy are paramount. We collect personal information solely to fulfill orders, facilitate salon appointments, and tailor bespoke client experiences.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-[#27231F] font-medium">
              2. Information Collected
            </h2>
            <p className="font-light">
              We may collect your contact details (name, email address, shipping destination, phone number) when you place orders or schedule appointments. On this demonstration storefront, no sensitive payment credentials are stored on external servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-[#27231F] font-medium">
              3. Protection & Retention
            </h2>
            <p className="font-light">
              All communications are encrypted using modern Transport Layer Security (TLS/SSL). We never trade, sell, or rent client records to third-party marketing entities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-[#27231F] font-medium">
              4. Contacting the Privacy Officer
            </h2>
            <p className="font-light">
              Should you have questions regarding our data practices, please reach our Data Concierge at concierge@aurelle-haute.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
