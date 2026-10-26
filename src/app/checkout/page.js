"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { formatPrice } from "@/lib/currency";
import { generateOrderNumber } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import {
  CreditCard,
  QrCode,
  Building2,
  ShieldAlert,
  Lock,
  ArrowRight,
  Truck,
  CheckCircle2,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    getSubtotal,
    getDiscountAmount,
    coupon,
    clearCart,
  } = useCartStore();
  const addToast = useToastStore((state) => state.addToast);

  // Form states
  const [formData, setFormData] = useState({
    firstName: "Priya",
    lastName: "Kapoor",
    email: "priya.kapoor@example.com",
    phone: "9820012345",
    address: "B-402, Sea Green Mansions, Worli Sea Face",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400018",
    country: "India",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("complimentary"); // 'complimentary' | 'express'
  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' | 'upi' | 'netbanking' | 'cod'
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shippingFee = deliveryMethod === "express" ? 750 : subtotal >= 5000 ? 0 : 350;
  const orderTotal = Math.max(0, subtotal - discount + shippingFee);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim() || !formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = "Valid 10-digit phone number is required";
    if (!formData.address.trim()) newErrors.address = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim() || formData.pincode.length < 6)
      newErrors.pincode = "Valid 6-digit PIN code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      addToast("Your shopping bag is empty.", "error");
      router.push("/shop");
      return;
    }

    if (!validateForm()) {
      addToast("Please complete the required shipping details.", "error");
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury order creation
    setTimeout(() => {
      const orderId = generateOrderNumber();

      // Store demo order info in session/localStorage for confirmation page
      const orderData = {
        orderId,
        date: new Date().toLocaleDateString("en-IN", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        customer: formData,
        items: [...items],
        subtotal,
        discount,
        couponCode: coupon?.code || null,
        shippingFee,
        deliveryMethod:
          deliveryMethod === "express"
            ? "Express Armoured Courier"
            : "White-Glove Insured Delivery",
        paymentMethod:
          paymentMethod === "card"
            ? "Credit / Debit Card (Demo)"
            : paymentMethod === "upi"
            ? "Instant UPI (Demo)"
            : paymentMethod === "netbanking"
            ? "Net Banking (Demo)"
            : "Cash on Salon Collection (Demo)",
        total: orderTotal,
      };

      if (typeof window !== "undefined") {
        sessionStorage.setItem("lastAurelleOrder", JSON.stringify(orderData));
      }

      clearCart();
      setIsSubmitting(false);
      addToast(`Order ${orderId} created successfully!`);
      router.push(`/order-confirmation?orderId=${orderId}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#F7F3ED] min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="bg-white border border-[#E6DED3] p-10 max-w-md text-center">
          <h2 className="font-serif-luxury text-2xl text-[#27231F] mb-3">
            No Items in Shopping Bag
          </h2>
          <p className="text-sm text-[#81786F] mb-6 font-light">
            Please add your desired fine jewellery pieces before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="py-3 px-6 bg-[#211E1A] hover:bg-[#C6A66B] text-white text-xs uppercase tracking-widest font-medium transition-colors"
          >
            Explore Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F3ED] min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-[#E6DED3] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "Shopping Bag", href: "/cart" },
              { label: "Secure Demo Checkout" },
            ]}
          />
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#27231F] font-normal tracking-tight mt-1">
            Secure Demo Checkout
          </h1>
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="bg-[#211E1A] text-[#F7F3ED] py-2.5 px-4 text-xs text-center border-b border-[#C6A66B]/30 flex items-center justify-center gap-2">
        <ShieldAlert className="w-4 h-4 text-[#C6A66B]" />
        <span>
          <strong>Demo Showcase:</strong> No real payments or financial charges will occur. Do not enter real credit card credentials.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Client Details, Address, Delivery, Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-white border border-[#E6DED3] p-6 sm:p-8">
              <h2 className="font-serif-luxury text-xl text-[#27231F] font-medium pb-3 border-b border-[#E6DED3] mb-6 flex items-center justify-between">
                <span>1. Contact Details</span>
                <span className="text-xs uppercase tracking-widest text-[#81786F] font-sans">
                  Private & Confidential
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#81786F] block mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-[#E6DED3] px-3 py-2.5 focus:outline-hidden focus:border-[#C6A66B]"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#81786F] block mb-1.5 font-medium">
                    Phone Number (for Courier SMS) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-[#E6DED3] px-3 py-2.5 focus:outline-hidden focus:border-[#C6A66B]"
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white border border-[#E6DED3] p-6 sm:p-8">
              <h2 className="font-serif-luxury text-xl text-[#27231F] font-medium pb-3 border-b border-[#E6DED3] mb-6">
                2. Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#81786F] block mb-1.5 font-medium">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-[#E6DED3] px-3 py-2.5 focus:outline-hidden focus:border-[#C6A66B]"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-rose-500 mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#81786F] block mb-1.5 font-medium">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-[#E6DED3] px-3 py-2.5 focus:outline-hidden focus:border-[#C6A66B]"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-rose-500 mt-1">{errors.lastName}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-[#81786F] block mb-1.5 font-medium">
                    Street Address & Apartment / Landmark *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-[#E6DED3] px-3 py-2.5 focus:outline-hidden focus:border-[#C6A66B]"
                  />
                  {errors.address && (
                    <p className="text-xs text-rose-500 mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#81786F] block mb-1.5 font-medium">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-[#E6DED3] px-3 py-2.5 focus:outline-hidden focus:border-[#C6A66B]"
                  />
                  {errors.city && (
                    <p className="text-xs text-rose-500 mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#81786F] block mb-1.5 font-medium">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-[#E6DED3] px-3 py-2.5 focus:outline-hidden focus:border-[#C6A66B]"
                  />
                  {errors.state && (
                    <p className="text-xs text-rose-500 mt-1">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#81786F] block mb-1.5 font-medium">
                    Postal PIN Code *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-[#E6DED3] px-3 py-2.5 focus:outline-hidden focus:border-[#C6A66B]"
                  />
                  {errors.pincode && (
                    <p className="text-xs text-rose-500 mt-1">{errors.pincode}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#81786F] block mb-1.5 font-medium">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    disabled
                    value={formData.country}
                    className="w-full text-xs bg-[#F7F3ED] border border-[#E6DED3] px-3 py-2.5 text-[#81786F]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="bg-white border border-[#E6DED3] p-6 sm:p-8">
              <h2 className="font-serif-luxury text-xl text-[#27231F] font-medium pb-3 border-b border-[#E6DED3] mb-4">
                3. Delivery Method
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod("complimentary")}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                    deliveryMethod === "complimentary"
                      ? "border-[#211E1A] bg-[#F7F3ED]/40 ring-1 ring-[#211E1A]"
                      : "border-[#E6DED3] hover:border-[#81786F]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === "complimentary"}
                      onChange={() => setDeliveryMethod("complimentary")}
                      className="accent-[#211E1A]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#27231F]">
                        White-Glove Insured Delivery
                      </p>
                      <p className="text-xs text-[#81786F] font-light">
                        Discreet packaging, adult signature required (3-5 business days)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#C6A66B]">
                    {subtotal >= 5000 ? "Complimentary" : "₹350"}
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod("express")}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                    deliveryMethod === "express"
                      ? "border-[#211E1A] bg-[#F7F3ED]/40 ring-1 ring-[#211E1A]"
                      : "border-[#E6DED3] hover:border-[#81786F]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === "express"}
                      onChange={() => setDeliveryMethod("express")}
                      className="accent-[#211E1A]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#27231F]">
                        Express Armoured Courier Dispatch
                      </p>
                      <p className="text-xs text-[#81786F] font-light">
                        Priority courier dispatch with real-time GPS tracking (1-2 business days)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#27231F]">₹750</span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method Selection UI */}
            <div className="bg-white border border-[#E6DED3] p-6 sm:p-8">
              <h2 className="font-serif-luxury text-xl text-[#27231F] font-medium pb-3 border-b border-[#E6DED3] mb-4">
                4. Payment Method (Demo Simulator)
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { id: "card", label: "Credit Card", icon: CreditCard },
                  { id: "upi", label: "UPI / QR", icon: QrCode },
                  { id: "netbanking", label: "Net Banking", icon: Building2 },
                  { id: "cod", label: "Salon Pay", icon: Lock },
                ].map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`p-3.5 border flex flex-col items-center justify-center gap-2 transition-all ${
                        paymentMethod === pm.id
                          ? "border-[#211E1A] bg-[#F7F3ED] text-[#27231F] font-semibold"
                          : "border-[#E6DED3] text-[#81786F] hover:border-[#81786F]"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#C6A66B]" />
                      <span className="text-[11px] uppercase tracking-wider">{pm.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Payment preview description */}
              <div className="p-4 bg-[#F7F3ED] border border-[#E6DED3] text-xs text-[#81786F]">
                {paymentMethod === "card" && (
                  <p>
                    💳 <strong>Demo Card Processing:</strong> Encrypted simulated luxury checkout. No real card charge will be made.
                  </p>
                )}
                {paymentMethod === "upi" && (
                  <p>
                    📲 <strong>Demo UPI Integration:</strong> Seamlessly simulates Instant UPI settlement via Google Pay, PhonePe, or BHIM.
                  </p>
                )}
                {paymentMethod === "netbanking" && (
                  <p>
                    🏛️ <strong>Demo Net Banking:</strong> Simulates luxury banking wire transfer via HDFC, ICICI, Axis, or SBI.
                  </p>
                )}
                {paymentMethod === "cod" && (
                  <p>
                    💎 <strong>Salon Concierge Collection:</strong> Reserve for inspection and payment at our Colaba private salon.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E6DED3] p-6 sm:p-8 space-y-6 sticky top-28">
              <h2 className="font-serif-luxury text-2xl text-[#27231F] font-medium pb-4 border-b border-[#E6DED3]">
                Order Summary ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>

              {/* Item Previews */}
              <div className="divide-y divide-[#E6DED3] max-h-72 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.itemId} className="py-3 flex gap-3 items-center">
                    <div className="relative w-14 h-16 bg-[#F2EDE4] overflow-hidden border border-[#E6DED3] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif-luxury text-sm text-[#27231F] line-clamp-1 font-medium">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#81786F]">
                        Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                      </p>
                      <p className="text-xs font-semibold text-[#27231F] mt-0.5">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2.5 text-xs text-[#81786F] pt-4 border-t border-[#E6DED3]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#27231F] font-medium text-sm">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {coupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Privilege Courtesy ({coupon.code})</span>
                    <span className="font-medium">- {formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-[#C6A66B] font-medium">Complimentary</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="pt-4 border-t border-[#E6DED3] flex justify-between items-baseline">
                <div>
                  <span className="font-serif-luxury text-xl text-[#27231F] font-semibold block">
                    Total Amount
                  </span>
                  <span className="text-[10px] text-[#81786F]">All taxes included</span>
                </div>
                <span className="font-serif-luxury text-3xl font-bold text-[#27231F]">
                  {formatPrice(orderTotal)}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#211E1A] hover:bg-[#C6A66B] disabled:opacity-50 text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Place Demo Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-[#81786F] flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#C6A66B]" />
                  <span>256-bit SSL Encrypted Demo Transmission</span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
