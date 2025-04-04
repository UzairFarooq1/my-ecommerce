import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

// This is the new function with the new name
export async function createClient() {
  try {
    // During static generation, cookies() might throw an error
    // We need to handle this case
    let cookieStore
    try {
      cookieStore = await cookies()
    } catch (error) {
      console.error("Error accessing cookies:", error)
      // Return null during static generation
      return null
    }

    return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({
              name,
              value,
              ...options,
            })
          } catch (error) {
            console.error("Cookie set error:", error)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({
              name,
              value: "",
              ...options,
              maxAge: 0,
            })
          } catch (error) {
            console.error("Cookie remove error:", error)
          }
        },
      },
    })
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    return null
  }
}

// This maintains backward compatibility with your existing code
export const createServerSupabaseClient = createClient

