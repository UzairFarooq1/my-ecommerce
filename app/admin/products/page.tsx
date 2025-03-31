import { getProducts } from "@/lib/products";

// Make the page dynamic to avoid static generation issues
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  try {
    const { data: products, error } = await getProducts();

    if (error) {
      return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          <p className="text-red-500">
            Error loading products:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      );
    }

    // Now actually use the products variable
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Products ({products.length})
        </h1>

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product.id} className="border p-4 rounded-md">
                <h2 className="font-bold">{product.name}</h2>
                <p className="text-gray-600">${product.price}</p>
                {/* Add more product details as needed */}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in AdminProductsPage:", error);
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <p className="text-red-500">
          An unexpected error occurred:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }
}
