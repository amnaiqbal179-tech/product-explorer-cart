import { getProducts } from "@/services/products";
import ProductCard from "@/components/product-card";
import ProductFilters from "@/components/product-filters";

interface PageProps {
  searchParams: Promise<{ search?: string; category?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  
  let products = [];
  let errorMessage = "";

  try {
    products = await getProducts();
  } catch (error) {
    errorMessage = "Failed to load products. Please try again later.";
  }

  // Filter products based on URL search query
  const filteredProducts = products.filter((product) => {
    const matchesSearch = resolvedParams.search
      ? product.title.toLowerCase().includes(resolvedParams.search.toLowerCase())
      : true;
    const matchesCategory = resolvedParams.category
      ? product.category === resolvedParams.category
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Catalogue</h1>
      
      <ProductFilters />

      {errorMessage ? (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6 dark:bg-red-950 dark:text-red-300">
          {errorMessage}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}