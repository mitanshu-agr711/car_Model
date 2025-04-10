import { Suspense } from "react"
import CarList from "@/components/car-list"
import FilterSidebar from "@/components/filter-sidebar"
import SearchFilters from "@/components/search-filters"
import type { CarFilters } from "@/lib/types"

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Home({ searchParams }: HomeProps) {
  // Safely extract and parse filter parameters from URL
  const getString = (key: string) =>
    typeof searchParams[key] === "string" ? (searchParams[key] as string) : undefined

  const getNumber = (key: string) => {
    const value = getString(key)
    const parsed = value ? Number.parseInt(value) : undefined
    return Number.isNaN(parsed) ? undefined : parsed
  }

  const filters: CarFilters = {
    brand: getString("brand"),
    minPrice: getNumber("minPrice"),
    maxPrice: getNumber("maxPrice"),
    fuelType: getString("fuelType"),
    seatingCapacity: getNumber("seatingCapacity"),
    sortBy: getString("sortBy"),
    page: getNumber("page") ?? 1,
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Car</h1>

      <div className="lg:hidden mb-6">
        <SearchFilters filters={filters} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-full lg:w-1/4 xl:w-1/5">
          <FilterSidebar filters={filters} />
        </aside>

        <section className="w-full lg:w-3/4 xl:w-4/5">
          <Suspense fallback={<div className="text-center py-20">Loading cars...</div>}>
            <CarList filters={filters} />
          </Suspense>
        </section>
      </div>
    </main>
  )
}
