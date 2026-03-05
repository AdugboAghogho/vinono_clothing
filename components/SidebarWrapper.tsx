"use client";

import { usePathname } from "next/navigation";
// import SideBar from " @components/shopPage/SideBar";
import SideBar from "./shopPage/SideBar";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 1. Define the paths where the Sidebar should NOT appear
  const hideSidebar =
    pathname === "/" || // Landing Page
    pathname?.startsWith("/signin") || // Sign In page
    pathname?.startsWith("/checkout") || // Checkout page
    pathname?.startsWith("/blog"); // Blog pages

  // 2. If it's a page in the "hide" list, return the page normally (full width)
  if (hideSidebar) {
    return <>{children}</>;
  }

  // 3. Otherwise (Shop, Cart, Profile, etc.), wrap it with the Sidebar layout
  return (
    <div className="flex min-h-screen bg-[#FDFBF7]">
      <SideBar />
      <main className="flex-1 overflow-x-hidden w-full">{children}</main>
    </div>
  );
}
