"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/use-cart-store";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div>
        <div className="h-52 w-full bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 flex items-center justify-center mb-4 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1">
          <span className="uppercase tracking-wider font-medium">{product.category}</span>
          <span className="flex items-center gap-1 font-semibold text-amber-500">
            ★ {product.rating.rate} ({product.rating.count})
          </span>
        </div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base line-clamp-1">
          {product.title}
        </h3>
      </div>
      
      <div className="mt-5 flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <div>
          <span className="text-xs text-zinc-400 block">Price</span>
          <span className="font-bold text-lg text-zinc-900 dark:text-white">${product.price.toFixed(2)}</span>
        </div>
        <button
          onClick={() => addItem(product)}
          className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-white transition-colors shadow-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}