"use server"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function signIn(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Sign in error:", error)
      return { error: error.message }
    }

    if (!data.session) {
      console.error("No session created")
      return { error: "Failed to create session. Please try again." }
    }

    return { success: true, redirectTo: "/account" }
  } catch (error) {
    console.error("Unexpected error during sign in:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function signUp(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const phone = (formData.get("phone") as string) || null
    const address = (formData.get("address") as string) || null
    const city = (formData.get("city") as string) || null
    const postalCode = (formData.get("postalCode") as string) || null
    const country = (formData.get("country") as string) || null

    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    const supabase = createServerSupabaseClient()

    // Sign up the user with Supabase Auth
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (error) {
      console.error("Sign up error:", error)
      return { error: error.message }
    }

    // Create a user record in the custom users table if sign-up was successful
    if (data?.user) {
      try {
        // First, check if a user record already exists
        const { data: existingUser, error: fetchError } = await supabase
          .from("users")
          .select("id")
          .eq("id", data.user.id)
          .single()

        if (fetchError && fetchError.code !== "PGRST116") {
          // PGRST116 is "row not found" error
          console.error("Error checking for existing user:", fetchError)
        }

        // If user doesn't exist, create a new record
        if (!existingUser) {
          const { error: insertError } = await supabase.from("users").insert({
            id: data.user.id,
            email: email,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            address: address,
            city: city,
            postal_code: postalCode,
            country: country,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          if (insertError) {
            console.error("Error creating user record:", insertError)
            return { error: "Account created but failed to set up user profile. Please contact support." }
          }
        }
      } catch (userErr) {
        console.error("Error creating user record:", userErr)
        return { error: "Account created but failed to set up user profile. Please contact support." }
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Unexpected error during sign up:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function signOut() {
  try {
    const supabase = createServerSupabaseClient()
    await supabase.auth.signOut()
  } catch (error) {
    console.error("Error during sign out:", error)
  }

  // Use redirect after the try/catch to ensure it always happens
  redirect("/")
}

export async function getSession() {
  const supabase = createServerSupabaseClient()

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient()

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return null
    }

    // Get user details from the custom users table
    const { data, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

    if (error) {
      console.error("Error fetching user profile:", error)
      return session.user
    }

    return {
      ...session.user,
      ...data,
    }
  } catch (error) {
    console.error("Error getting user details:", error)
    return null
  }
}

