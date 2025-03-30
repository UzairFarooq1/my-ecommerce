"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";

export function CartItems() {
  const { items, updateItemQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground mb-6">
          Looks like you have not added anything to your cart yet.
        </p>
        <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-4 py-4 border-b">
          <div className="relative aspect-square h-24 w-24 min-w-[6rem] overflow-hidden rounded-md">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <div className="flex justify-between">
              <Link
                href={`/products/${item.id}`}
                className="font-medium hover:underline"
              >
                {item.name}
              </Link>
              <p className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <p className="text-sm text-muted-foreground">{item.category}</p>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() =>
                    updateItemQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                >
                  -
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItemQuantity(
                      item.id,
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                  className="h-8 w-12 rounded-none border-x-0 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
