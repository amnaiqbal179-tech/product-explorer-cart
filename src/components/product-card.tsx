import Image from "next/image"; // Agar use nahi ho raha toh hata dein
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
      <div className="relative h-48 w-full mb-4 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        {/* Standard img tag use karne se external images kabhi block nahi hongi */}
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-full w-full p-2"
        />
      </div>

      <div>
        <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
          {product.category}
        </span>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1 mt-1">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-amber-500 font-medium">
            ★ {product.rating.rate} ({product.rating.count})
          </span>
        </div>
      </div>

      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 w-full bg-black text-white dark:bg-white dark:text-black py-2 rounded-lg font-medium hover:opacity-90 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}