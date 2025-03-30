import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { createServerSupabaseClient } from "@/lib/supabase/server"

async function getCategories() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true }).limit(3)

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data
}

export async function FeaturedCategories() {
  const categories = await getCategories()

  return (
    <section className="container px-4 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.name.toLowerCase()}`}>
            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative aspect-[4/3]">
                {category.image_url ? (
                  <Image
                    src={category.image_url || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <PlaceholderImage className="w-full h-full" />
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold text-center">{category.name}</h3>
                {category.description && (
                  <p className="text-muted-foreground text-center mt-2">{category.description}</p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

