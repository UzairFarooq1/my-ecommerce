import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { CartSummary } from "@/components/cart-summary";
import { CheckoutForm } from "@/components/checkout-form";

export default async function CheckoutPage() {
  const session = await getSession();

  // If the user is not logged in, redirect them to the sign-in page
  if (!session) {
    redirect("/auth/sign-in?redirect=/checkout");
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground">
          Complete your order by providing your shipping details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <CheckoutForm />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <CartSummary />
          <div className="text-sm text-muted-foreground">
            <p>
              By completing your purchase, you agree to our{" "}
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
