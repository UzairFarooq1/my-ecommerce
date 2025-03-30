import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
    quote:
      "StyleShop has completely transformed my wardrobe. The quality of their clothes is exceptional, and their customer service is top-notch.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
    quote:
      "I've been shopping at StyleShop for over a year now, and I'm consistently impressed by their attention to detail and commitment to quality.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Stylist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
    quote:
      "As a professional stylist, I recommend StyleShop to all my clients. Their collections are always on-trend and versatile for any occasion.",
  },
]

export function Testimonials() {
  return (
    <section className="container px-4 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="relative">
                <Quote className="h-6 w-6 text-muted-foreground/30 absolute -left-1 -top-1" />
                <p className="text-muted-foreground pl-5">{testimonial.quote}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

