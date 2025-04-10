"use client"

import Image from "next/image"
import Link from "next/link"
import type { Car } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Fuel, Users } from "lucide-react"
import AddToWishlistButton from "./add-to-wishlist-button"
import { motion } from "framer-motion"

export default function CarCard({ car }: { car: Car }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative h-48">
          <Image
            src={car.imageUrl || "/placeholder.svg"}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <AddToWishlistButton car={car} />
          </div>
        </div>

        <CardContent className="pt-6 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">
                {car.brand} {car.model}
              </h3>
              <p className="text-muted-foreground text-sm">{car.year}</p>
            </div>
            <Badge variant="outline">${car.price.toLocaleString()}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Fuel size={16} />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users size={16} />
              <span>{car.seatingCapacity} seats</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Link href={`/cars/${car.id}`} className="w-full">
            <div className="w-full text-center py-2 border rounded-md hover:bg-muted transition-colors">
              View Details
            </div>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
