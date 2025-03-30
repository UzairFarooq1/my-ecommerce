import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { createServerSupabaseClient } from "@/lib/supabase/server"

async function getNewArrivals() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_new", true)
    .order("created_at", { ascending: false })
    .limit(4)

  if (error) {
    console.error("Error fetching new arrivals:", error)
    return []
  }

  return data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description || "",
    price: product.price,
    originalPrice: product.original_price,
    image: product.image_url || "/placeholder.svg?height=400&width=300",
    category: product.category,
    isNew: product.is_new,
    discount: product.discount,
    quantity: 1,
  }))
}

export async function NewArrivals() {
  const newArrivals = await getNewArrivals()

  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">New Arrivals</h2>
        <Link href="/products" className="text-sm font-medium underline underline-offset-4">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {newArrivals.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
              <div className="relative aspect-[3/4]">
                {product.image ? (
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
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
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
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
    </section>
  )
}

