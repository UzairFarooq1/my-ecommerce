export default async function CheckoutPage() {
  try {
    // Import at the top level to avoid dynamic imports
    const { createServerSupabaseClient } = await import(
      "@/lib/supabase/server"
    );
    const supabase = await createServerSupabaseClient();

    // Handle the case where supabase client is null
    if (!supabase) {
      return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <p className="text-red-500">
            Unable to connect to the database. Please try again later.
          </p>
        </div>
      );
    }

    // Get the user session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If no session, redirect to login or show message
    if (!session) {
      return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <p>Please log in to continue with checkout.</p>
          {/* Add login button or redirect logic here */}
        </div>
      );
    }

    // Rest of your checkout page code...
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        {/* Your checkout form and logic */}
      </div>
    );
  } catch (error) {
    console.error("Error in checkout page:", error);
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-red-500">
          An error occurred. Please try again later.
        </p>
      </div>
    );
  }
}
