import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createServerSupabaseClient();

  // Parse filter parameters
  const minPrice = Number(searchParams.minPrice || 0);
  const maxPrice = Number(searchParams.maxPrice || 1000);
  const categories =
    typeof searchParams.categories === "string"
      ? searchParams.categories.split(",").filter(Boolean)
      : [];

  // Build query
  let query = supabase
    .from("products")
    .select("*")
    .gte("price", minPrice)
    .lte("price", maxPrice);

  // Add category filter if selected
  if (categories.length > 0) {
    query = query.in(
      "category",
      categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1))
    );
  }

  // Execute query
  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Error loading products</div>;
  }

  // Transform data
  const products = data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description || "",
    price: product.price,
    originalPrice: product.original_price,
    image: product.image_url || "/placeholder.svg",
    category: product.category,
    isNew: product.is_new,
    discount: product.discount,
    quantity: 1,
  }));

  return (
    <div className="container py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products", active: true },
        ]}
      />

      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilters />
        </div>
        <div className="w-full md:w-3/4">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
