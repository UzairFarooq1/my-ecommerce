import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function PromoSection() {
  return (
    <section className="container px-4 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative overflow-hidden rounded-lg h-[400px] group">
          <Image
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2670&auto=format&fit=crop"
            alt="Men's Collection"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Men&apos;s Collection</h3>
            <p className="mb-4 max-w-md">
              Discover our latest men&apos;s fashion with premium quality
              materials.
            </p>
            <Button
              asChild
              className="w-fit bg-white text-black hover:bg-white/90"
            >
              <Link href="/categories/men">Shop Men</Link>
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg h-[400px] group">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670&auto=format&fit=crop"
            alt="Women's Collection"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Women&apos;s Collection</h3>
            <p className="mb-4 max-w-md">
              Explore our stylish women&apos;s fashion for every occasion.
            </p>
            <Button
              asChild
              className="w-fit bg-white text-black hover:bg-white/90"
            >
              <Link href="/categories/women">Shop Women</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
