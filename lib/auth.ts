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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Sign in error:", error)
      return { error: error.message }
    }

    return { success: true }
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

    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    const supabase = createServerSupabaseClient()

    const { error } = await supabase.auth.signUp({
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

    return { success: true }
  } catch (error) {
    console.error("Unexpected error during sign up:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function signOut() {
  const supabase = createServerSupabaseClient()
  await supabase.auth.signOut()
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

    const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

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

