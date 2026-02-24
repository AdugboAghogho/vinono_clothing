import { currentUser } from "@clerk/nextjs/server"; // Server-side user fetching
import Image from "next/image";
import { Package, Settings, LogOut, ChevronRight, User } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs"; // Pre-built logout logic
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  // 1. Get the current user from Clerk
  const user = await currentUser();

  // 2. If for some reason they aren't logged in, kick them out
  if (!user) return redirect("/sign-in");

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 md:p-8 pb-24">
      <h1 className="font-bold text-3xl mb-8">My Profile</h1>

      {/* --- REAL USER CARD --- */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-orange-100 overflow-hidden relative border-2 border-orange-100">
          {/* Show user's actual profile pic, or a default icon if missing */}
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt="User"
              fill
              className="object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
        <div>
          {/* Show Real Name and Email */}
          <h2 className="font-bold text-xl">
            {user.fullName || "Valued Customer"}
          </h2>
          <p className="text-gray-500 text-sm">
            {user.emailAddresses[0]?.emailAddress}
          </p>
        </div>
      </div>

      {/* --- MENU OPTIONS --- */}
      <div className="space-y-4 max-w-2xl">
        <h3 className="font-bold text-gray-900 ml-2">History</h3>
        <div className="bg-white rounded-[2rem] p-2 shadow-sm">
          {/* We will connect this to Sanity Orders later */}
          <div className="p-8 text-center text-gray-400 text-sm">
            No orders yet. Time to go shopping!
          </div>
        </div>

        <h3 className="font-bold text-gray-900 ml-2 mt-6">Settings</h3>
        <div className="bg-white rounded-[2rem] p-2 shadow-sm">
          <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">Account Settings</p>
            </div>
          </div>

          {/* REAL LOGOUT BUTTON */}
          <SignOutButton>
            <button className="w-full flex items-center gap-4 p-4 hover:bg-red-50 rounded-2xl cursor-pointer text-left transition-colors">
              <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-red-500">Log Out</p>
              </div>
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
