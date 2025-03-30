import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function ensureUserExists(
  userId: string,
  userData: {
    email: string
    first_name?: string
    last_name?: string
  },
) {
  const supabase = createClientComponentClient()

  // Check if user exists in the users table
  const { error } = await supabase.from("users").select("id").eq("id", userId).single()

  if (error) {
    console.log("User not found, creating new user record")

    // User doesn't exist, create one
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: userId,
        email: userData.email,
        first_name: userData.first_name || null,
        last_name: userData.last_name || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

    if (insertError) {
      console.error("Error creating user record:", insertError)
      throw new Error(`Failed to create user record: ${insertError.message}`)
    }

    return true // User was created
  }

  return false // User already existed
}

