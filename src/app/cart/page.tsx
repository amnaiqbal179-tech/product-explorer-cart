"use client";

import { useCartStore } from "@/store/use-cart-store";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, increaseQuantity, decreaseQuantity, clearCart } = useCartStore();

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-block bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded font-medium"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 dark:border-zinc-800"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-contain bg-white p-1 rounded" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">${item.price} each</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="border px-3 py-1 rounded dark:border-zinc-700"
                    >
                      -
                    </button>
                    <span className="font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="border px-3 py-1 rounded dark:border-zinc-700"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold w-20 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-lg flex justify-between items-center">
            <button
              onClick={clearCart}
              className="text-red-500 text-sm hover:underline"
            >
              Clear Cart
            </button>
            <div className="flex items-center gap-6">
              <span className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</span>
              <button
                onClick={() => alert("Checkout successful!")}
                className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded font-medium"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}