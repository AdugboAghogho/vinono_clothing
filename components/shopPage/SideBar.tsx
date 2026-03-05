"use client";

import Image from "next/image";
import {
  Home,
  ShoppingBag,
  Heart,
  Filter,
  User,
  ShoppingCart,
} from "lucide-react";
import image from "@/public/img/3d (3).jpg";

// import Loader from "../../components/ui/Loader";
// import { useUser } from "@clerk/nextjs";

const SideBar = () => {
  // const { user, isLoaded, isSignedIn } = useUser();
  // if (!isLoaded)
  //   return (
  //     <div className="p-8 text-gray-400">
  //       <Loader />
  //     </div>
  //   );
  // if (!isSignedIn) return null;

  return (
    <div className="flex max-w-400 mx-auto">
      <aside className="hidden md:flex flex-col w-70 h-screen sticky top-0 p-8 border-r border-orange-100 shadow-xl bg-white/50 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-full bg-orange-100 overflow-hidden relative">
            <Image
              src={image}
              // src={user.imageUrl}
              alt="User"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xs text-gray-400">Welcome</p>
            <p className="font-bold text-sm">
              {"Valued Customer"}
              {/* {user.fullName || "Valued Customer"} */}
            </p>
          </div>
        </div>

        {/* Navigation Link                                                                                                                                                                  */}
        <nav className="space-y-2 flex-1">
          <SidebarLink
            icon={ShoppingBag}
            label="Shop"
            active
            className="shadow-xl"
          />
          <SidebarLink
            href="/cart"
            icon={ShoppingCart}
            label="Cart"
            className="shadow-xl"
          />
          <SidebarLink icon={Filter} label="Categories" className="shadow-xl" />

          <SidebarLink
            href="/profile"
            icon={User}
            label="Profile"
            className="shadow-xl"
          />
        </nav>

        {/* Logout / Bottom */}
        <div className="mt-auto">
          <div className="bg-orange-500 text-white p-4 rounded-2xl shadow-lg shadow-orange-200">
            <p className="text-xs font-medium opacity-80 mb-1">
              New Collection
            </p>
            <p className="font-bold text-lg mb-2">Summer Sale</p>
            <button className="bg-white text-orange-600 text-xs font-bold px-4 py-2 rounded-full">
              View Now
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

// --- Helper Components ---

function SidebarLink({ icon: Icon, label, active }: any) {
  return (
    <button
      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
        active
          ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
          : "text-gray-500 hover:bg-orange-50 hover:text-orange-500"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );
}
export default SideBar;
