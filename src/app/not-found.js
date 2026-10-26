import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F7F3ED] px-4 py-20">
      <div className="max-w-md w-full bg-white border border-[#E6DED3] p-10 sm:p-14 text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#F7F3ED] border border-[#C6A66B] flex items-center justify-center mx-auto mb-6 text-[#C6A66B]">
          <Compass className="w-8 h-8 stroke-[1.5]" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A66B] font-medium block mb-2">
          Page Unlocated • 404
        </span>

        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#27231F] font-normal tracking-tight mb-4">
          The Piece You Seek is Elsewhere
        </h1>

        <p className="text-xs sm:text-sm text-[#81786F] font-light leading-relaxed mb-8">
          The creation or salon suite you are attempting to view may have been archived or moved. Allow us to guide you back to our active collections.
        </p>

        <div className="space-y-3">
          <Link
            href="/shop"
            className="w-full py-3.5 px-6 bg-[#211E1A] hover:bg-[#C6A66B] text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <span>Return to Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="block text-xs uppercase tracking-widest text-[#81786F] hover:text-[#27231F] transition-colors pt-2"
          >
            Maison Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
