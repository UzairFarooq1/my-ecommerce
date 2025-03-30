"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";

export function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", { ...product, quantity });
    addItem({ ...product, quantity });

    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
          className="w-16 text-center mx-2"
        />
        <Button variant="outline" size="icon" onClick={increaseQuantity}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      <Button
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
}
