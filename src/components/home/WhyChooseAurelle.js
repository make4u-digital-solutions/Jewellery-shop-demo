import { Sparkles, Shield, Gift, Headphones } from "lucide-react";

export default function WhyChooseAurelle() {
  const features = [
    {
      icon: Sparkles,
      title: "Thoughtful Craftsmanship",
      description:
        "Every piece is individually handcrafted in solid precious metals with meticulous micro-pavé setting and microscopic bench inspection.",
    },
    {
      icon: Shield,
      title: "Secure Checkout",
      description:
        "Protected demo transactions with transparent pricing, full order tracking, and clear receipts for complete peace of mind.",
    },
    {
      icon: Gift,
      title: "Careful Packaging",
      description:
        "Presented in signature hand-stitched leatherette keepsake boxes accompanied by protective travel pouches and care cloths.",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description:
        "Our dedicated salon concierge is available for private styling consultations, custom sizing guidance, and order support.",
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-[#F7F3ED] border-b border-[#E6DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C6A66B] font-medium block mb-1.5 sm:mb-2">
            The Maison Promise
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#27231F] font-normal tracking-tight">
            Why Choose AURELLE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] p-5 sm:p-8 border border-[#E6DED3] flex flex-col items-center text-center group hover:border-[#C6A66B]/60 transition-all duration-300 hover:shadow-md"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F7F3ED] border border-[#E6DED3] flex items-center justify-center mb-4 sm:mb-5 text-[#C6A66B] group-hover:bg-[#211E1A] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="font-serif-luxury text-base sm:text-lg text-[#27231F] font-medium mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs text-[#81786F] font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
