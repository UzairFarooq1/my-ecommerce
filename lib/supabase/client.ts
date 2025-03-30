"use client"

import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null

export function createClientSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables")
  }

  if (!supabaseClient) {
    supabaseClient = createClient<Database>(supabaseUrl, supabaseKey)
  }

  return supabaseClient
}

