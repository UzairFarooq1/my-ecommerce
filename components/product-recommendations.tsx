import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getRelatedProducts } from "@/lib/products"

export async function ProductRecommendations({ currentProductId }: { currentProductId: string }) {
  const products = await getRelatedProducts(currentProductId)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <div className="relative aspect-[3/4]">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium line-clamp-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{product.category}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <p className="font-semibold">${product.price.toFixed(2)}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

