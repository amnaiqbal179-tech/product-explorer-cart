"use client";

import Link from "next/link";
import { useTheme } from "@/providers/theme-provider";
import CartDrawer from "@/components/cart-drawer";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/products" className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
            ProductStore
          </Link>
          <Link href="/products" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
            Catalogue
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-xl text-sm font-medium bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
}