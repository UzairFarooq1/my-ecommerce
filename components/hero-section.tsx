"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PlaceholderImage } from "@/components/ui/placeholder-image"

const heroSlides = [
  {
    title: "Discover Your Style, Elevate Your Wardrobe",
    description:
      "Shop the latest trends in fashion with our curated collection of high-quality clothing and accessories.",
    cta: "Shop Now",
    ctaLink: "/products",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2670&auto=format&fit=crop",
    altText: "Fashion collection showcase",
  },
  {
    title: "Summer Collection 2025",
    description: "Bright colors, light fabrics, and stylish designs for the perfect summer look.",
    cta: "View Collection",
    ctaLink: "/categories/women",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop",
    altText: "Summer collection showcase",
  },
  {
    title: "Exclusive Discounts",
    description: "Up to 50% off on selected items. Limited time offer.",
    cta: "Shop Sale",
    ctaLink: "/products",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2670&auto=format&fit=crop",
    altText: "Sale items showcase",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section className="relative h-[600px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          {slide.image ? (
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.altText}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          ) : (
            <PlaceholderImage className="w-full h-full" />
          )}
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
            <div className="container px-4 mx-auto">
              <div className="max-w-3xl mx-auto space-y-6 text-white">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{slide.title}</h1>
                <p className="text-lg text-white/90">{slide.description}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="bg-white text-black hover:bg-white/90">
                    <Link href={slide.ctaLink}>{slide.cta}</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
                    <Link href="/categories">Browse Categories</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <div className="absolute inset-0 z-30 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-black/20 text-white hover:bg-black/40"
          onClick={() => {
            prevSlide()
            setIsAutoPlaying(false)
            setTimeout(() => setIsAutoPlaying(true), 10000)
          }}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-black/20 text-white hover:bg-black/40"
          onClick={() => {
            nextSlide()
            setIsAutoPlaying(false)
            setTimeout(() => setIsAutoPlaying(true), 10000)
          }}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${index === currentSlide ? "bg-white w-6" : "bg-white/50"}`}
            onClick={() => {
              setCurrentSlide(index)
              setIsAutoPlaying(false)
              setTimeout(() => setIsAutoPlaying(true), 10000)
            }}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

