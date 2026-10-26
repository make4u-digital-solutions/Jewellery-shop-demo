import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#81786F]">
        <li>
          <Link href="/" className="hover:text-[#27231F] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label || index} className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-[#C6A66B]" />
              {isLast || !item.href ? (
                <span className="text-[#27231F] font-medium truncate max-w-[200px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-[#27231F] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
