import { Suspense } from "react";
import ConfirmationContent from "./ConfirmationContent";

export const metadata = {
  title: "Order Confirmed | AURELLE Haute Joaillerie",
  description: "Thank you for acquiring with AURELLE. Your demo order details and confirmation reference.",
};

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F7F3ED]">
          <div className="font-serif-luxury text-xl text-[#81786F] animate-pulse">
            Retrieving Order Details...
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
