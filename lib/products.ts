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

// Add similar error handling to other functions that fetch from Supabase

