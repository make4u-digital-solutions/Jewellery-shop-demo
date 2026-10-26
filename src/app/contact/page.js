"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useToastStore } from "@/store/toastStore";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  Calendar,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const addToast = useToastStore((state) => state.addToast);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Bespoke Jewellery Inquiry",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim() || !formData.email.includes("@"))
      newErrors.email = "Please enter a valid email address";
    if (!formData.message.trim() || formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitted(true);
    addToast("Your inquiry has been received (Demo). A concierge will respond shortly.");
  };

  return (
    <div className="bg-[#F7F3ED] min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-[#E6DED3] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <Breadcrumbs items={[{ label: "Client Concierge" }]} />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C6A66B] font-medium block mt-2 mb-2">
            Private Consultation & Client Care
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#27231F] font-normal tracking-tight">
            Connect with the Atelier
          </h1>
          <p className="text-sm sm:text-base text-[#81786F] font-light max-w-xl mx-auto mt-4 leading-relaxed">
            Whether inquiring about a bespoke commission, scheduling a private viewing at our Colaba salon, or requesting sizing guidance, our salon concierge is at your service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#E6DED3] p-8 sm:p-12 shadow-sm">
            <h2 className="font-serif-luxury text-2xl text-[#27231F] font-medium pb-4 border-b border-[#E6DED3] mb-6">
              Send an Inquiry
            </h2>

            {isSubmitted ? (
              <div className="p-8 bg-[#F7F3ED] border border-[#C6A66B]/50 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C6A66B] mx-auto" />
                <h3 className="font-serif-luxury text-2xl text-[#27231F]">
                  Inquiry Received (Demo)
                </h3>
                <p className="text-sm text-[#81786F] font-light max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. In a live environment, our senior jewellery advisor would review your notes and respond within one business day.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      subject: "Bespoke Jewellery Inquiry",
                      message: "",
                    });
                  }}
                  className="py-2.5 px-6 border border-[#27231F] text-xs uppercase tracking-widest font-medium text-[#27231F] hover:bg-[#27231F] hover:text-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#81786F] block mb-1.5 font-medium">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full text-xs border border-[#E6DED3] px-3.5 py-3 focus:outline-hidden focus:border-[#C6A66B] bg-transparent"
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#81786F] block mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="radhika.sharma@example.com"
                    className="w-full text-xs border border-[#E6DED3] px-3.5 py-3 focus:outline-hidden focus:border-[#C6A66B] bg-transparent"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#81786F] block mb-1.5 font-medium">
                    Nature of Inquiry
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-[#E6DED3] px-3.5 py-3 focus:outline-hidden focus:border-[#C6A66B] bg-white cursor-pointer"
                  >
                    <option value="Bespoke Jewellery Inquiry">Bespoke Jewellery Inquiry</option>
                    <option value="Private Salon Viewing">Private Salon Viewing Appointment</option>
                    <option value="Bridal Suite Consultation">Bridal Suite Consultation</option>
                    <option value="Order Tracking & Delivery">Order Status & Delivery Inquiries</option>
                    <option value="Jewellery Care & Sizing">Jewellery Care & Sizing Guidance</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#81786F] block mb-1.5 font-medium">
                    Message Details *
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please specify any particular gemstones, metal purities, or collection pieces you would like to discuss..."
                    className="w-full text-xs border border-[#E6DED3] px-3.5 py-3 focus:outline-hidden focus:border-[#C6A66B] bg-transparent resize-y"
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-500 mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#211E1A] hover:bg-[#C6A66B] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>

                <p className="text-[11px] text-[#81786F] text-center font-light">
                  Demo note: Messages submitted on this storefront demonstration are processed locally.
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Atelier Coordinates & Salon Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-[#E6DED3] p-8 space-y-6">
              <h3 className="font-serif-luxury text-2xl text-[#27231F] font-medium pb-4 border-b border-[#E6DED3]">
                Salon Coordinates
              </h3>

              <div className="space-y-5 text-xs text-[#81786F]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#27231F] block uppercase tracking-wider mb-0.5">
                      Flagship Atelier Salon (Demo)
                    </span>
                    <p className="font-light leading-relaxed">
                      AURELLE Haute Joaillerie
                      <br />
                      Sea Lounge Pavilion, Colaba Causeway
                      <br />
                      Mumbai, Maharashtra 400005, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#27231F] block uppercase tracking-wider mb-0.5">
                      Client Concierge Line
                    </span>
                    <p className="font-light">+91 (0) 22 8900 4400 (Toll Free Demo)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#27231F] block uppercase tracking-wider mb-0.5">
                      Written Correspondence
                    </span>
                    <p className="font-light">concierge@aurelle-haute.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#27231F] block uppercase tracking-wider mb-0.5">
                      Private Salon Hours
                    </span>
                    <p className="font-light">
                      Tuesday – Sunday: 11:00 AM – 7:30 PM
                      <br />
                      Mondays: Closed for bench restoration
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ Link Box */}
            <div className="bg-[#211E1A] text-[#F7F3ED] p-8 border border-[#C6A66B]/30 space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#C6A66B] font-medium block">
                Immediate Assistance
              </span>
              <h4 className="font-serif-luxury text-xl font-normal">
                Frequently Addressed Inquiries
              </h4>
              <p className="text-xs text-[#A59C90] font-light leading-relaxed">
                Looking for ring sizing advice, hallmark purity explanations, or white-glove transit details?
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C6A66B] hover:text-white transition-colors pt-2"
              >
                <span>Read Client FAQ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
