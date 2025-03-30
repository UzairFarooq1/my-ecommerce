import Image from "next/image"

export function BrandSection() {
  return (
    <section className="container px-4 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Brands We Partner With</h2>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {/* Each logo is in a white/light background container for dark mode visibility */}
        <div className="w-32 h-16 relative bg-white rounded-md p-2 flex items-center justify-center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png"
            alt="Nike"
            width={80}
            height={30}
            className="object-contain"
          />
        </div>
        <div className="w-32 h-16 relative bg-white rounded-md p-2 flex items-center justify-center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png"
            alt="Adidas"
            width={80}
            height={30}
            className="object-contain"
          />
        </div>
        <div className="w-32 h-16 relative bg-white rounded-md p-2 flex items-center justify-center">
          <Image
            src="https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png"
            alt="Puma"
            width={80}
            height={30}
            className="object-contain"
          />
        </div>
        <div className="w-32 h-16 relative bg-white rounded-md p-2 flex items-center justify-center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Levi%27s_logo.svg/2560px-Levi%27s_logo.svg.png"
            alt="Levi's"
            width={80}
            height={30}
            className="object-contain"
          />
        </div>
        <div className="w-32 h-16 relative bg-white rounded-md p-2 flex items-center justify-center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1200px-Zara_Logo.svg.png"
            alt="Zara"
            width={80}
            height={30}
            className="object-contain"
          />
        </div>
        <div className="w-32 h-16 relative bg-white rounded-md p-2 flex items-center justify-center">
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

