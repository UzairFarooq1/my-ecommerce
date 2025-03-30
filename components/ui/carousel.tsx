"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  children: React.ReactNode[]
  className?: string
  autoplay?: boolean
  interval?: number
}

export function Carousel({ children, className, autoplay = true, interval = 5000 }: CarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const itemsCount = React.Children.count(children)

  const nextSlide = React.useCallback(() => {
    setActiveIndex((current) => (current + 1) % itemsCount)
  }, [itemsCount])

  const prevSlide = React.useCallback(() => {
    setActiveIndex((current) => (current - 1 + itemsCount) % itemsCount)
  }, [itemsCount])

  React.useEffect(() => {
    if (!autoplay || isPaused) return

    const intervalId = setInterval(() => {
      nextSlide()
    }, interval)

    return () => clearInterval(intervalId)
  }, [autoplay, interval, isPaused, nextSlide])

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 text-foreground"
          onClick={prevSlide}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 text-foreground"
          onClick={nextSlide}
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {Array.from({ length: itemsCount }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              index === activeIndex ? "bg-primary" : "bg-primary/20",
            )}
            onClick={() => setActiveIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

