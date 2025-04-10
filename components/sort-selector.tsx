"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SortSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Read current sort from search params dynamically
  const currentSort = searchParams.get("sortBy") || ""

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set("sortBy", value)
    } else {
      params.delete("sortBy")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="relevance">Featured</SelectItem>
        <SelectItem value="priceLow">Price: Low to High</SelectItem>
        <SelectItem value="priceHigh">Price: High to Low</SelectItem>
        <SelectItem value="newest">Newest First</SelectItem>
      </SelectContent>
    </Select>
  )
}
