import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function FeaturedCollection() {
  return (
    <section className="container px-4 mx-auto">
      <div className="relative overflow-hidden rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-muted p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">Summer Essentials</h2>
              <p className="text-muted-foreground mb-6">
                Our summer collection features lightweight fabrics, vibrant colors, and versatile pieces perfect for
                warm weather. From breathable linen shirts to flowing summer dresses, discover everything you need for
                the season.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/categories/summer">Explore Collection</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2662&auto=format&fit=crop"
              alt="Summer Collection"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

