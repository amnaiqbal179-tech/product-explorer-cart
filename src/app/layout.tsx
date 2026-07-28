import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Explorer & Shopping Cart",
  description: "Next.js App Router state management assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-black dark:bg-zinc-950 dark:text-white min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}