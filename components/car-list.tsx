import { getCars } from "@/lib/data"
import type { CarFilters } from "@/lib/types"
import CarCard from "./car-card"
import Pagination from "./pagination"
import SortSelector from "./sort-selector"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default async function CarList({ filters }: { filters: CarFilters }) {
  const { cars, totalCars, totalPages, error } = await getCars(filters)

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-2">No cars found</h2>
        <p className="text-muted-foreground">Try adjusting your filters to find more cars</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Showing <span className="font-medium">{cars.length}</span> of <span className="font-medium">{totalCars}</span>{" "}
          cars
        </p>
        <SortSelector currentSort={filters.sortBy} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <Pagination currentPage={filters.page || 1} totalPages={totalPages} />
    </div>
  )
}
