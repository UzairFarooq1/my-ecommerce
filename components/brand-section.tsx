import Image from "next/image"

const brands = [
  {
    id: 1,
    name: "Nike",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2570&auto=format&fit=crop",
    logoAlt: "Nike logo",
  },
  {
    id: 2,
    name: "Adidas",
    logo: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=2631&auto=format&fit=crop",
    logoAlt: "Adidas logo",
  },
  {
    id: 3,
    name: "Puma",
    logo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=2574&auto=format&fit=crop",
    logoAlt: "Puma logo",
  },
  {
    id: 4,
    name: "Levi's",
    logo: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=2670&auto=format&fit=crop",
    logoAlt: "Levi's logo",
  },
  {
    id: 5,
    name: "Zara",
    logo: "https://images.unsplash.com/photo-1589363460779-cd717d2ed8fa?q=80&w=2670&auto=format&fit=crop",
    logoAlt: "Zara logo",
  },
  {
    id: 6,
    name: "H&M",
    logo: "https://images.unsplash.com/photo-1589363381701-9362c368532a?q=80&w=2670&auto=format&fit=crop",
    logoAlt: "H&M logo",
  },
]

export function BrandSection() {
  return (
    <section className="container px-4 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Brands We Partner With</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
        {brands.map((brand) => (
          <div key={brand.id} className="flex flex-col items-center">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 bg-muted">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.logoAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
              />
            </div>
            <span className="font-medium text-center">{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

