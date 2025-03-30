import Image from "next/image"

export function BrandSection() {
  return (
    <section className="container px-4 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Brands We Partner With</h2>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {/* Nike */}
        <div className="w-32 h-16 relative bg-[#f5f5f5] dark:bg-[#111111] rounded-md p-2 flex items-center justify-center border border-gray-200 dark:border-gray-800">
          <Image
            src="https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png"
            alt="Nike"
            width={80}
            height={30}
            className="object-contain"
          />
        </div>

        {/* Adidas */}
        <div className="w-32 h-16 relative bg-[#000000] dark:bg-[#ffffff] rounded-md p-2 flex items-center justify-center">
          <Image
            src="https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png"
            alt="Adidas"
            width={80}
            height={30}
            className={`object-contain ${
              // Invert colors in dark mode for black logos
              "dark:invert"
            }`}
          />
        </div>

        {/* Puma */}
        <div className="w-32 h-16 relative bg-[#ffffff] dark:bg-[#111111] rounded-md p-2 flex items-center justify-center">
          <Image
            src="https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png"
            alt="Puma"
            width={80}
            height={30}
            className="object-contain"
          />
        </div>

        {/* Levi's */}
        <div className="w-32 h-16 relative bg-[#ffffff] dark:bg-[#111111] rounded-md p-2 flex items-center justify-center">
          <Image
            src="https://logos-world.net/wp-content/uploads/2020/05/Levis-Logo.png"
            alt="Levi's"
            width={80}
            height={30}
            className="object-contain"
          />
        </div>

        {/* Zara */}
        <div className="w-32 h-16 relative bg-[#ffffff] dark:bg-[#111111] rounded-md p-2 flex items-center justify-center">
          <Image
            src="https://logos-world.net/wp-content/uploads/2020/04/Zara-Logo.png"
            alt="Zara"
            width={80}
            height={30}
            className="object-contain dark:invert"
          />
        </div>

        {/* H&M */}
        <div className="w-32 h-16 relative bg-[#ffffff] dark:bg-[#111111] rounded-md p-2 flex items-center justify-center">
          <Image
            src="https://logos-world.net/wp-content/uploads/2020/04/HM-Logo.png"
            alt="H&M"
            width={80}
            height={30}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}

