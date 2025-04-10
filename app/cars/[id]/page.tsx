import { notFound } from "next/navigation"
import Image from "next/image"
import { getCar } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Fuel, Users, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"
import AddToWishlistButton from "@/components/add-to-wishlist-button"

export default async function CarDetailsPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id)

  if (!car) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to search</span>
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src={car.imageUrl || "/placeholder.svg"}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <AddToWishlistButton car={car} />
            </div>
            <p className="text-2xl font-semibold mt-2">${car.price.toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-muted-foreground" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel size={20} className="text-muted-foreground" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} className="text-muted-foreground" />
              <span>{car.seatingCapacity} seats</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={20} className="text-muted-foreground" />
              <span>{car.mileage.toLocaleString()} miles</span>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature) => (
                <Badge key={feature} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{car.description}</p>
          </div>

          <Button size="lg" className="w-full">
            Contact Seller
          </Button>
        </div>
      </div>
    </main>
  )
}
