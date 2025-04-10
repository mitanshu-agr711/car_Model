"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Car } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

export default function AddToWishlistButton({ car }: { car: Car }) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const storedWishlist = localStorage.getItem("carWishlist")
    if (storedWishlist) {
      const wishlist = JSON.parse(storedWishlist)
      setIsInWishlist(wishlist.some((item: Car) => item.id === car.id))
    }
  }, [car.id])

  const toggleWishlist = () => {
    const storedWishlist = localStorage.getItem("carWishlist")
    let wishlist: Car[] = storedWishlist ? JSON.parse(storedWishlist) : []

    if (isInWishlist) {
      // Remove from wishlist
      wishlist = wishlist.filter((item: Car) => item.id !== car.id)
      toast({
        title: "Removed from wishlist",
        description: `${car.brand} ${car.model} has been removed from your wishlist`,
      })
    } else {
      // Add to wishlist
      wishlist.push(car)
      toast({
        title: "Added to wishlist",
        description: `${car.brand} ${car.model} has been added to your wishlist`,
      })
    }

    localStorage.setItem("carWishlist", JSON.stringify(wishlist))
    setIsInWishlist(!isInWishlist)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`rounded-full ${isInWishlist ? "text-primary" : "text-muted-foreground"}`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist()
      }}
    >
      <Heart className={`h-5 w-5 ${isInWishlist ? "fill-primary" : ""}`} />
    </Button>
  )
}
