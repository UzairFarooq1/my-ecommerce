import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  Shield,
  Truck,
  CreditCard,
  Users,
  Leaf,
  Award,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about", active: true },
        ]}
      />

      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold">About StyleShop</h1>
        <p className="text-muted-foreground max-w-3xl">
          Learn more about our story, mission, and the team behind StyleShop
        </p>
      </div>

      <Tabs defaultValue="story" className="mb-16">
        <TabsList className="mb-8 w-full flex justify-center">
          <TabsTrigger
            value="story"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Our Story
          </TabsTrigger>
          <TabsTrigger
            value="values"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Our Values
          </TabsTrigger>
          <TabsTrigger
            value="team"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Our Team
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="story">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  StyleShop was founded in 2023 with a simple mission: to
                  provide high-quality, stylish clothing at affordable prices.
                  What started as a small online boutique has grown into a
                  comprehensive e-commerce platform offering a wide range of
                  products for everyone.
                </p>
                <p>
                  Our team is passionate about fashion and committed to
                  delivering an exceptional shopping experience. We carefully
                  curate our collections to ensure that we offer the latest
                  trends while maintaining our commitment to quality and
                  sustainability.
                </p>
                <p>
                  Today, StyleShop serves customers worldwide, offering a
                  diverse range of clothing, accessories, and home goods. We
                  continue to grow and evolve, always staying true to our core
                  values and commitment to customer satisfaction.
                </p>
              </div>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/products">Shop Our Collection</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop"
                alt="StyleShop store"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="mt-16 pt-16 border-t">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Why Choose StyleShop?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">
                    Quality Guarantee
                  </h3>
                  <p className="text-muted-foreground text-center">
                    We stand behind every product we sell with a 100%
                    satisfaction guarantee.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">
                    Fast Shipping
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Enjoy free shipping on orders over $50 and quick delivery to
                    your doorstep.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">
                    Secure Payments
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Shop with confidence using our secure payment processing
                    system.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="values">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">
              At StyleShop, our values guide everything we do. From product
              selection to customer service, these principles are at the heart
              of our business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  Quality
                </h3>
                <p className="text-muted-foreground text-center">
                  We never compromise on quality. Each product is carefully
                  selected and tested to ensure it meets our high standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  Sustainability
                </h3>
                <p className="text-muted-foreground text-center">
                  We are committed to reducing our environmental impact through
                  sustainable sourcing and eco-friendly packaging.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  Community
                </h3>
                <p className="text-muted-foreground text-center">
                  We believe in building a community of fashion enthusiasts who
                  share our passion for style and self-expression.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <Image
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2670&auto=format&fit=crop"
              alt="Sustainable fashion"
              width={1200}
              height={400}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center p-6">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Our Commitment to Sustainability
                </h3>
                <p className="text-white/90 mb-6">
                  We are working towards a more sustainable future by partnering
                  with eco-conscious brands, reducing waste in our operations,
                  and supporting ethical manufacturing practices.
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/20"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground">
              Our diverse team of fashion experts, tech enthusiasts, and
              customer service professionals work together to bring you the best
              shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
              },
              {
                name: "Michael Chen",
                role: "Creative Director",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
              },
              {
                name: "Olivia Rodriguez",
                role: "Head of Operations",
                image:
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
              },
              {
                name: "David Kim",
                role: "Customer Experience Manager",
                image:
                  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative aspect-square rounded-full overflow-hidden mb-4 mx-auto w-40 h-40">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>

          <div className="bg-muted rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Join Our Team</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              We are always looking for passionate individuals to join our
              growing team. Check out our current openings and become part of
              our journey.
            </p>
            <Button>View Career Opportunities</Button>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have questions about our products, services, or company? We
                would love to hear from you. Our team is ready to assist you
                with any inquiries.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Our Location</h3>
                    <p className="text-muted-foreground">
                      123 Fashion Street
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                      +1 (555) 123-4567
                      <br />
                      Mon-Fri, 9am-6pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      info@styleshop.com
                      <br />
                      support@styleshop.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden h-[300px]">
                <Image
                  src="https://images.unsplash.com/photo-1577086664693-894d8405334a?q=80&w=2574&auto=format&fit=crop"
                  alt="Our store location"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                  <p className="text-muted-foreground mb-6">
                    Stay connected with us on social media for the latest
                    updates, style inspiration, and exclusive offers.
                  </p>
                  <div className="flex space-x-4 mb-8">
                    <Link
                      href="#"
                      className="rounded-full bg-muted p-2 hover:bg-muted/80"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-muted p-2 hover:bg-muted/80"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-muted p-2 hover:bg-muted/80"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-muted p-2 hover:bg-muted/80"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </Link>
                  </div>

                  <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
                  <p className="text-muted-foreground mb-4">
                    Subscribe to our newsletter for exclusive offers and
                    updates.
                  </p>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-3 py-2 border border-input rounded-md"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Subscribe
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
