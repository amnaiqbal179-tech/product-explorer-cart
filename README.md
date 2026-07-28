# Product Explorer & Shopping Cart

A modern, high-performance e-commerce web application built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **React Context**. This project is engineered to demonstrate precise architectural separation of state management tiers.

---

## State Management Decisions

| Data / State | State Type | Storage Mechanism | Rationale |
| :--- | :--- | :--- | :--- |
| **Product records** | Server state | Server Component (`app/products/page.tsx`) | Fetched directly on the server to ensure fast initial page loads, optimal SEO, and reduced client-side bundle overhead. |
| **Search and filters** | URL state | `searchParams` via Next.js router | Enables bookmarkable, shareable views and ensures filter states survive page refreshes and browser history navigation. |
| **Shopping Cart** | Global client state | Zustand (`use-cart-store.ts`) | Provides a lightweight, boilerplate-free state store with built-in persistence middleware for cart items and quantities. |
| **Theme (Light/Dark)** | Global client state | React Context (`theme-provider.tsx`) | Isolates theme preferences cleanly without bloating the app or forcing unnecessary client-side conversions. |
| **Cart Drawer visibility** | Local UI state | React `useState` | Encapsulates temporary component-level behavior that does not need to be shared globally. |

---

## Architectural & Design Explanations

### 1. Why Redux Toolkit was not required
Redux Toolkit introduces unnecessary boilerplate and bundle size for a scoped client feature like a shopping cart. **Zustand** provides a minimal, high-performance API with built-in localStorage persistence and seamless React subscription hooks.

### 2. Why product data was not copied into Zustand
Product data is owned by the server and fetched dynamically per request. Duplicating large catalogue arrays into a client store would introduce stale data issues, memory bloat, and synchronization complexities. 

### 3. Where the Theme Provider was mounted
The `ThemeProvider` is mounted inside the root layout (`app/layout.tsx`) wrapping the child components. This establishes a clean global theme boundary while keeping the root layout primarily server-rendered.

### 4. Components containing `'use client'` and why
* **`ProductCard`**: Uses client-side state handling and event listeners (`onClick`) to dispatch items to the Zustand cart store.
* **`ProductFilters`**: Relies on Next.js client router hooks (`useRouter`, `useSearchParams`) to dynamically update URL query parameters.
* **`CartDrawer` & `Navbar`**: Require React hooks (`useState`, `useEffect`) and context consumers to toggle visibility states and handle theme preferences.

---

## Tech Stack
* **Framework:** Next.js App Router (React)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (v4)
* **State Management:** Zustand (Cart), React Context (Theme), URL SearchParams (Filters)
* **Deployment:** Vercel

---

## Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/amnaiqbal179-tech/product-explorer-cart.git
   cd product-explorer-cart