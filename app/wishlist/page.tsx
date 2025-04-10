"use client"

import { useEffect, useState } from "react"
import type { Car } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Heart, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const storedWishlist = localStorage.getItem("carWishlist")
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist))
    }
    setIsLoading(false)
  }, [])

  const removeFromWishlist = (carId: string) => {
    const updatedWishlist = wishlist.filter((car) => car.id !== carId)
    setWishlist(updatedWishlist)
    localStorage.setItem("carWishlist", JSON.stringify(updatedWishlist))

    toast({
      title: "Removed from wishlist",
      description: "The car has been removed from your wishlist",
    })
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 text-center">Loading wishlist...</div>
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <Heart className="text-primary" />
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
          <Link href="/">
            <Button>Browse Cars</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {wishlist.map((car) => (
            <div key={car.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
              <div className="relative w-full md:w-48 h-32">
                <Image
                  src={car.imageUrl || "/placeholder.svg"}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {car.brand} {car.model}
                    </h2>
                    <p className="text-lg font-medium">${car.price.toLocaleString()}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromWishlist(car.id)}>
                    <Trash2 className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>

                <div className="mt-2 text-sm text-muted-foreground">
                  {car.year} • {car.fuelType} • {car.seatingCapacity} seats
                </div>

                <div className="mt-4">
                  <Link href={`/cars/${car.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
