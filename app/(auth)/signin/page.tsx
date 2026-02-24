import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs for style */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

      <div className="z-10">
        <SignIn
          forceRedirectUrl="/shop"
          appearance={{
            elements: {
              card: "rounded-[2rem] shadow-xl shadow-orange-50 border-none",
              formButtonPrimary:
                "bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm",
              footerActionLink: "text-orange-500 hover:text-orange-600",
            },
          }}
        />
      </div>
    </div>
  );
}
