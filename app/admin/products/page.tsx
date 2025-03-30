import Link from "next/link"
import { getProducts } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { AdminProductList } from "@/components/admin-product-list"

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">Add New Product</Link>
        </Button>
      </div>

      <AdminProductList products={products} />
    </div>
  )
}

