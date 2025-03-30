"use server"

import { createServerSupabaseClient } from "./supabase/server"
import { getSession } from "./auth"
import type { CartItem } from "./types"

export async function createOrder(
  items: CartItem[],
  shippingDetails: {
    address: string
    city: string
    postalCode: string
    country: string
  },
) {
  const supabase = createServerSupabaseClient()
  const session = await getSession()

  if (!items.length) {
    return { error: "Cart is empty" }
  }

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  try {
    // Start a transaction
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: session?.user.id || null,
        total,
        shipping_address: shippingDetails.address,
        shipping_city: shippingDetails.city,
        shipping_postal_code: shippingDetails.postalCode,
        shipping_country: shippingDetails.country,
        status: "pending",
      })
      .select()
      .single()

    if (orderError || !order) {
      console.error("Error creating order:", orderError)
      return { error: "Failed to create order" }
    }

    // Insert order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      console.error("Error creating order items:", itemsError)
      return { error: "Failed to create order items" }
    }

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("Error in createOrder:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function getUserOrders() {
  const supabase = createServerSupabaseClient()
  const session = await getSession()

  if (!session?.user.id) {
    return []
  }

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user orders:", error)
    return []
  }

  return data
}

