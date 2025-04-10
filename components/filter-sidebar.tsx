"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState, useTransition } from "react"
import type { CarFilters } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { createQueryString } from "@/lib/utils"

const brands = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Tesla", "Nissan", "Hyundai", "Kia"]
const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid"]
const seatingCapacities = [2, 4, 5, 6, 7, 8]

export default function FilterSidebar({ filters }: { filters: CarFilters }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const [priceRange, setPriceRange] = useState<[number, number]>([filters.minPrice || 0, filters.maxPrice || 100000])

  const applyFilters = (newFilters: Partial<CarFilters>) => {
    startTransition(() => {
      const queryString = createQueryString({
        ...filters,
        ...newFilters,
        page: 1, // Reset to first page when filters change
      })
      router.push(`${pathname}?${queryString}`)
    })
  }

  const resetFilters = () => {
    startTransition(() => {
      router.push(pathname)
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Brand</h3>
        <RadioGroup value={filters.brand || ""} onValueChange={(value) => applyFilters({ brand: value || undefined })}>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="brand-all" />
              <Label htmlFor="brand-all">All Brands</Label>
            </div>

            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <RadioGroupItem value={brand} id={`brand-${brand.toLowerCase()}`} />
                <Label htmlFor={`brand-${brand.toLowerCase()}`}>{brand}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={priceRange}
            min={0}
            max={100000}
            step={1000}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            onValueCommit={(value) => {
              applyFilters({
                minPrice: value[0],
                maxPrice: value[1],
              })
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-muted-foreground">${priceRange[0].toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-4">Fuel Type</h3>
        <RadioGroup
          value={filters.fuelType || ""}
          onValueChange={(value) => applyFilters({ fuelType: value || undefined })}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="fuel-all" />
              <Label htmlFor="fuel-all">All Types</Label>
            </div>

            {fuelTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={`fuel-${type.toLowerCase()}`} />
                <Label htmlFor={`fuel-${type.toLowerCase()}`}>{type}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-4">Seating Capacity</h3>
        <RadioGroup
          value={filters.seatingCapacity?.toString() || ""}
          onValueChange={(value) =>
            applyFilters({
              seatingCapacity: value ? Number.parseInt(value) : undefined,
            })
          }
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="seats-all" />
              <Label htmlFor="seats-all">Any Capacity</Label>
            </div>

            {seatingCapacities.map((seats) => (
              <div key={seats} className="flex items-center space-x-2">
                <RadioGroupItem value={seats.toString()} id={`seats-${seats}`} />
                <Label htmlFor={`seats-${seats}`}>{seats} seats</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <Button variant="outline" className="w-full" onClick={resetFilters} disabled={isPending}>
        Reset Filters
      </Button>
    </div>
  )
}
