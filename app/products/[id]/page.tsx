import { notFound } from "next/navigation"
import Image from "next/image"
import { getProduct } from "@/lib/products"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ProductRecommendations } from "@/components/product-recommendations"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>

          <div className="pt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <ProductRecommendations currentProductId={params.id} />
      </div>
    </div>
  )
}

