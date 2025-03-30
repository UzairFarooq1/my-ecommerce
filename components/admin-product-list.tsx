"use client"

import Link from "next/link"
import Image from "next/image"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Product } from "@/lib/types"

interface AdminProductListProps {
  products: Product[]
}

export function AdminProductList({ products }: AdminProductListProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    // Simulate API call
    console.log("Deleting product:", id)
  }

  if (!products.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No products found.</p>
        <Button asChild>
          <Link href="/admin/products/new">Add New Product</Link>
        </Button>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="relative h-10 w-10 overflow-hidden rounded-md">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
            <TableCell>
              {product.isNew && <Badge className="bg-green-100 text-green-800 border-green-200">New</Badge>}
              {product.discount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {product.discount}% OFF
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

