import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

async function getCategoryProducts(category: string) {
  const supabase = createServerSupabaseClient();

  // Convert URL format (lowercase-with-dashes) to database format (Title Case)
  const formattedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  console.log("Searching for category:", formattedCategory);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("category", formattedCategory)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching category products:", error);
    return [];
  }

  console.log(
    `Found ${data.length} products for category ${formattedCategory}`
  );

  return data.map((product) => ({
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
}

async function getCategoryInfo(category: string) {
  const supabase = createServerSupabaseClient();

  // Convert URL format to database format
  const formattedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .ilike("name", formattedCategory)
    .single();

  if (error) {
    console.error("Error fetching category info:", error);
    return null;
  }

  return data;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category.toLowerCase();
  const categoryInfo = await getCategoryInfo(categorySlug);
  const products = await getCategoryProducts(categorySlug);

  if (!products.length && !categoryInfo) {
    notFound();
  }

  const categoryName =
    categoryInfo?.name ||
    categorySlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="container py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          {
            label: categoryName,
            href: `/categories/${categorySlug}`,
            active: true,
          },
        ]}
      />

      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold capitalize">{categoryName}</h1>
        {categoryInfo?.description && (
          <p className="text-muted-foreground max-w-3xl">
            {categoryInfo.description}
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilters />
        </div>
        <div className="w-full md:w-3/4">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                We could not find any products in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
