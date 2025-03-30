import { createServerSupabaseClient } from "./supabase/server"
import type { Product } from "./types"

export async function getProducts(): Promise<Product[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
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

export async function getProduct(id: string): Promise<Product | undefined> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching product:", error)
    return undefined
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description || "",
    price: data.price,
    originalPrice: data.original_price,
    image: data.image_url || "/placeholder.svg?height=400&width=300",
    category: data.category,
    isNew: data.is_new,
    discount: data.discount,
    quantity: 1,
  }
}

export async function getRelatedProducts(currentProductId: string): Promise<Product[]> {
  const supabase = createServerSupabaseClient()

  // Get current product to find its category
  const { data: currentProduct, error: currentProductError } = await supabase
    .from("products")
    .select("category")
    .eq("id", currentProductId)
    .single()

  if (currentProductError || !currentProduct) {
    // Fallback to random products if current product not found
    const { data, error } = await supabase.from("products").select("*").limit(4)

    if (error || !data) {
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

  // Find products in the same category, excluding the current product
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", currentProduct.category)
    .neq("id", currentProductId)
    .limit(4)

  if (error || !data || data.length === 0) {
    // Fallback to random products if no related products found
    const { data: randomData, error: randomError } = await supabase
      .from("products")
      .select("*")
      .neq("id", currentProductId)
      .limit(4)

    if (randomError || !randomData) {
      return []
    }

    return randomData.map((product) => ({
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

// Update the getCategories function with more debugging and error handling

export async function getCategories() {
  const supabase = createServerSupabaseClient()

  console.log("Fetching categories from lib/products.ts...")

  try {
    const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true })

    if (error) {
      console.error("Error fetching categories:", error)
      return []
    }

    console.log("Categories fetched successfully:", data)

    if (!data || data.length === 0) {
      console.log("No categories found in database, returning default categories...")

      return [
        {
          id: "1",
          name: "Men",
          description: "Men's clothing and accessories",
          image_url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2670&auto=format&fit=crop",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Women",
          description: "Women's clothing and accessories",
          image_url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670&auto=format&fit=crop",
          created_at: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Accessories",
          description: "Fashion accessories for all",
          image_url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2670&auto=format&fit=crop",
          created_at: new Date().toISOString(),
        },
      ]
    }

    return data
  } catch (error) {
    console.error("Exception in getCategories:", error)
    return []
  }
}

