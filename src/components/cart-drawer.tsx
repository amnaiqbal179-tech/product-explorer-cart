"use client";

import { useState } from "react";
import { useCartStore } from "@/store/use-cart-store";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="relative bg-gray-100 dark:bg-zinc-800 px-4 py-2 rounded font-medium hover:opacity-80"
      >
        Cart
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 h-full p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-black dark:hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4 dark:border-zinc-800"
                    >
                      <div>
                        <h4 className="font-semibold text-sm line-clamp-1">{item.title}</h4>
                        <p className="text-sm text-gray-500">${item.price} each</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="border px-2 py-0.5 rounded text-sm dark:border-zinc-700"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="border px-2 py-0.5 rounded text-sm dark:border-zinc-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 text-sm hover:underline ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t pt-4 dark:border-zinc-800">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => alert("Proceeding to checkout...")}
                disabled={items.length === 0}
                className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded font-medium hover:opacity-90 disabled:opacity-50"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}