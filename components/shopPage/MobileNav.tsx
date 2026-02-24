"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, ShoppingBag, Search, User, Home } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const MobileNav = () => {
  const pathname = usePathname();
  const { items } = useCartStore();

  return (
    <div className="md:hidden fixed bottom-2 w-[90%] left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/90 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-2xl flex items-center justify-between border border-white/10">
        <NavIcon href="/" icon={Home} isActive={pathname === "/"} />

        <NavIcon
          href="/shop"
          icon={ShoppingBag}
          isActive={pathname === "/shop"}
        />

        {/* Cart Icon with Badge */}
        <Link href="/cart" className="relative group">
          <div
            className={`p-2 rounded-full transition-all duration-300 ${pathname === "/cart" ? "text-orange-500" : "text-gray-400 group-hover:text-white"}`}
          >
            <ShoppingCart
              className={`w-6 h-6 ${pathname === "/cart" ? "fill-current" : ""}`}
            />

            {/* Badge Logic */}
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-white text-[15px] flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </div>
        </Link>

        <NavIcon
          href="/search"
          icon={Search}
          isActive={pathname === "/search"}
        />

        <NavIcon
          href="/profile"
          icon={User}
          isActive={pathname === "/profile"}
        />
      </div>
    </div>
  );
};

function NavIcon({
  href,
  icon: Icon,
  isActive,
}: {
  href: string;
  icon: any;
  isActive: boolean;
}) {
  return (
    <Link href={href}>
      <div
        className={`p-2 rounded-full transition-all duration-300 ${
          isActive
            ? "text-orange-500 scale-110"
            : "text-gray-400 hover:text-white"
        }`}
      >
        <Icon className={`w-6 h-6 ${isActive ? "fill" : ""}`} />
      </div>
    </Link>
  );
}

export default MobileNav;
