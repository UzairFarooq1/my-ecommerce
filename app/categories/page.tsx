import Link from "next/link";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Breadcrumb } from "@/components/breadcrumb";

// Update the getCategories function with more debugging and error handling

async function getCategories() {
  const supabase = createServerSupabaseClient();

  console.log("Fetching categories from Supabase in categories/page.tsx...");

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      console.error("Error details:", error.message, error.details, error.hint);
      return [];
    }

    console.log("Categories fetched successfully:", data);

    // If no categories are found, let's create some default ones
    if (!data || data.length === 0) {
      console.log("No categories found, returning default categories...");

      // Return default categories
      return [
        {
          id: "1",
          name: "Men",
          description: "Men's clothing and accessories",
          image_url:
            "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2670&auto=format&fit=crop",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Women",
          description: "Women's clothing and accessories",
          image_url:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670&auto=format&fit=crop",
          created_at: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Accessories",
          description: "Fashion accessories for all",
          image_url:
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2670&auto=format&fit=crop",
          created_at: new Date().toISOString(),
        },
      ];
    }

    return data;
  } catch (error) {
    console.error("Exception in getCategories:", error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  console.log("Categories in page component:", categories.length);

  return (
    <div className="container py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories", active: true },
        ]}
      />

      <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>

      {categories.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <h3 className="text-lg font-medium mb-2">No categories found</h3>
          <p className="text-muted-foreground mb-6">
            We are currently updating our category listings. Please check back
            soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-[4/3]">
                  {category.image_url ? (
                    <Image
                      src={category.image_url || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  ) : (
                    <PlaceholderImage className="w-full h-full" />
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold text-center">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-muted-foreground text-center mt-2">
                      {category.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
