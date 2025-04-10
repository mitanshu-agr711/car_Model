"use client"
import { useState } from "react"
import type { CarFilters } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import FilterSidebar from "./filter-sidebar"

export default function SearchFilters({ filters }: { filters: CarFilters }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full flex items-center gap-2">
          <SlidersHorizontal size={16} />
          <span>Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="mb-6">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Narrow down your car search with filters</SheetDescription>
        </SheetHeader>
        <FilterSidebar filters={filters} />
      </SheetContent>
    </Sheet>
  )
}
