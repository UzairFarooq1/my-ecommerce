import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export interface UserProfile {
  id: string
  email?: string
  first_name?: string
  last_name?: string
  phone?: string
  address?: string
  city?: string
  postal_code?: string
  country?: string
}

export async function updateUserProfile(profile: UserProfile): Promise<{ success: boolean; error?: unknown }> {
  try {
    const supabase = createClientComponentClient()

    // Update the user record in the users table
    const { error } = await supabase
      .from("users")
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        postal_code: profile.postal_code,
        country: profile.country,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id)

    if (error) {
      console.error("Error updating user profile:", error)
      return { success: false, error }
    }

    // Also update the user metadata in auth.users
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        postal_code: profile.postal_code,
        country: profile.country,
      },
    })

    if (authError) {
      console.error("Error updating user metadata:", authError)
      return { success: false, error: authError }
    }

    return { success: true }
  } catch (error) {
    console.error("Unexpected error updating user profile:", error)
    return { success: false, error }
  }
}

