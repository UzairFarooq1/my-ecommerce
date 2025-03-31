import { createServerSupabaseClient } from "./supabase/server"

// Define proper types
type Product = {
  id: string | number
  name: string
  price: number
  // Add other product fields as needed
}

type GetProductsResult = {
  data: Product[]
  error: Error | null
}

type GetProductResult = {
  data: Product | null
  error: Error | null
}

export async function getProducts(): Promise<GetProductsResult> {
  try {
    const supabase = await createServerSupabaseClient()

    // If supabase client couldn't be created
    if (!supabase) {
      console.error("Failed to create Supabase client")
      return { data: [], error: new Error("Failed to create Supabase client") }
    }

    const { data, error } = await supabase.from("products").select("*")

    if (error) {
      console.error("Error fetching products:", error)
      return { data: [], error: new Error(error.message) }
    }

    // Ensure data is an array and has the right type
    return {
      data: Array.isArray(data) ? data : [],
      error: null,
    }
  } catch (error) {
    console.error("Exception fetching products:", error)
    return {
      data: [],
      error: error instanceof Error ? error : new Error("Unknown error"),
    }
  }
}

// Add the missing getProduct function
export async function getProduct(id: string): Promise<GetProductResult> {
  try {
    const supabase = await createServerSupabaseClient()

    if (!supabase) {
      console.error("Failed to create Supabase client")
      return { data: null, error: new Error("Failed to create Supabase client") }
    }

    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching product ${id}:`, error)
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    console.error(`Exception fetching product ${id}:`, error)
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown error"),
    }
  }
}

// Add the missing getRelatedProducts function
export async function getRelatedProducts(productId: string, categoryId?: string): Promise<GetProductsResult> {
  try {
    const supabase = await createServerSupabaseClient()

    if (!supabase) {
      console.error("Failed to create Supabase client")
      return { data: [], error: new Error("Failed to create Supabase client") }
    }

    let query = supabase.from("products").select("*").neq("id", productId).limit(4)

    if (categoryId) {
      query = query.eq("category_id", categoryId)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching related products:", error)
      return { data: [], error: new Error(error.message) }
    }

    return {
      data: Array.isArray(data) ? data : [],
      error: null,
    }
  } catch (error) {
    console.error("Exception fetching related products:", error)
    return {
      data: [],
      error: error instanceof Error ? error : new Error("Unknown error"),
    }
  }
}

