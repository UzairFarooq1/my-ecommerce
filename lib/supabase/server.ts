import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

// This is the new function with the new name
export async function createClient() {
  const cookieStore = await cookies()

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
          // This can be ignored if you have middleware refreshing
          // user sessions
          console.error("Cookie set error (can be ignored in middleware):", error)
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({
            name,
            value: "",
            ...options,
            // Make sure the cookie expires
            maxAge: 0,
          })
        } catch (error) {
          // This can be ignored if you have middleware refreshing
          // user sessions
          console.error("Cookie remove error (can be ignored in middleware):", error)
        }
      },
    },
  })
}

// This maintains backward compatibility with your existing code
// It just calls the new function with the new name
export const createServerSupabaseClient = createClient

