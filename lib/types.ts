export interface Car {
  id: string
  brand: string
  model: string
  year: number
  price: number
  fuelType: string
  seatingCapacity: number
  mileage: number
  imageUrl: string
  features: string[]
  description: string
}

export interface CarFilters {
  brand?: string
  minPrice?: number
  maxPrice?: number
  fuelType?: string
  seatingCapacity?: number
  sortBy?: string
  page?: number
}
