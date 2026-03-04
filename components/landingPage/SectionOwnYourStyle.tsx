import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ownyourstyle from "../../public/img/1 (1).jpg";

export function SectionOwnYourStyle() {
  return (
    <section className="container mx-auto pt-1.75 px-4 py-24 ">
      <div className="rounded-[3rem] overflow-hidden shadow-xl shadow-gray-900/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-150 items-center">
          {/* Text Content */}
          <div className="p-8 md:p-20 space-y-8">
            <h2 className="text-5xl text-gray-300 md:text-7xl font-bold tracking-tighter leading-none">
              Own Your <br />
              Style
            </h2>
            <p className="text-lg text-gray-300 max-w-md leading-relaxed">
              Exclusive pieces, crafted for confidence and effortless elegance.
              Don't wait—your perfect look is just a click away.
            </p>
            <Link href="/shop">
              <Button
                size="lg"
                className="rounded-full px-8 h-14 font-bold text-base bg-gray-300 text-black shadow-xl shadow-gray-900/50 hover:bg-gray-800 cursor-pointer "
              >
                Shop Now
              </Button>
            </Link>
          </div>

          {/* Image Content */}
          <div className="relative h-full w-full min-h-125 overflow-hidden">
            <Image
              src={ownyourstyle}
              alt="Model sitting"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
