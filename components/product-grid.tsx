import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import type { Product } from "@/lib/types"

export function ProductGrid({ products }: { products?: Product[] }) {
  // If products are passed as a prop, use them
  // Otherwise, use the original implementation (which might fetch products internally)
  const displayProducts = products || []

  if (displayProducts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayProducts.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
            <div className="relative aspect-[3/4]">
              {product.image ? (
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              ) : (
                <PlaceholderImage className="w-full h-full" />
              )}
              {product.isNew && <Badge className="absolute top-2 right-2">New</Badge>}
              {product.discount > 0 && (
                <Badge variant="destructive" className="absolute top-2 left-2">
                  {product.discount}% OFF
                </Badge>
              )}
            </div>
            <CardContent className="p-4 flex-grow">
              <h3 className="font-medium line-clamp-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{product.category}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="font-semibold">${product.price.toFixed(2)}</p>
                {product.originalPrice > product.price && (
                  <p className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
                )}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

