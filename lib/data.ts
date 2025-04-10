import type { Car, CarFilters } from "./types"

// Mock car data
const carsData: Car[] = [
  {
    id: "1",
    brand: "Toyota",
    model: "Camry",
    year: 2023,
    price: 28500,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: 12000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["Bluetooth", "Backup Camera", "Lane Assist", "Cruise Control"],
    description:
      "The Toyota Camry is a reliable and fuel-efficient sedan with modern features and comfortable seating for five passengers.",
  },
  {
    id: "2",
    brand: "Honda",
    model: "Civic",
    year: 2022,
    price: 24000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: 15000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["Apple CarPlay", "Android Auto", "Heated Seats", "Sunroof"],
    description:
      "The Honda Civic offers excellent fuel economy, a spacious interior, and a smooth ride, making it perfect for daily commuting.",
  },
  {
    id: "3",
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 45000,
    fuelType: "Electric",
    seatingCapacity: 5,
    mileage: 8000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["Autopilot", "Glass Roof", "Premium Sound", "Supercharging"],
    description:
      "The Tesla Model 3 is an all-electric sedan with impressive range, cutting-edge technology, and exceptional performance.",
  },
  {
    id: "4",
    brand: "Ford",
    model: "Explorer",
    year: 2022,
    price: 38000,
    fuelType: "Gasoline",
    seatingCapacity: 7,
    mileage: 18000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["Third Row Seating", "4WD", "Towing Package", "Navigation"],
    description:
      "The Ford Explorer is a versatile SUV with plenty of cargo space, powerful engine options, and advanced safety features.",
  },
  {
    id: "5",
    brand: "BMW",
    model: "3 Series",
    year: 2023,
    price: 45000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: 10000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["Leather Seats", "Premium Audio", "Sport Package", "Parking Assist"],
    description: "The BMW 3 Series combines luxury, performance, and technology in a sleek and sophisticated sedan.",
  },
  {
    id: "6",
    brand: "Hyundai",
    model: "Tucson",
    year: 2022,
    price: 29000,
    fuelType: "Hybrid",
    seatingCapacity: 5,
    mileage: 14000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["Panoramic Sunroof", "Wireless Charging", "Smart Cruise Control", "Remote Start"],
    description:
      "The Hyundai Tucson Hybrid offers excellent fuel efficiency, a comfortable ride, and a generous warranty package.",
  },
  {
    id: "7",
    brand: "Audi",
    model: "Q5",
    year: 2023,
    price: 52000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: 9000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["Virtual Cockpit", "Quattro AWD", "Bang & Olufsen Sound", "Ambient Lighting"],
    description:
      "The Audi Q5 is a luxury compact SUV with refined handling, premium materials, and sophisticated technology.",
  },
  {
    id: "8",
    brand: "Nissan",
    model: "Rogue",
    year: 2022,
    price: 31000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: 16000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["ProPilot Assist", "Divide-N-Hide Cargo", "Motion Activated Liftgate", "Bose Audio"],
    description:
      "The Nissan Rogue offers a comfortable interior, good fuel economy, and versatile cargo space for everyday adventures.",
  },
  {
    id: "9",
    brand: "Mercedes",
    model: "E-Class",
    year: 2023,
    price: 62000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: 7000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["MBUX Infotainment", "Burmester Sound", "Air Suspension", "Driver Assistance Package"],
    description:
      "The Mercedes-Benz E-Class is a luxury sedan with exceptional comfort, cutting-edge technology, and elegant design.",
  },
  {
    id: "10",
    brand: "Kia",
    model: "Telluride",
    year: 2022,
    price: 42000,
    fuelType: "Gasoline",
    seatingCapacity: 8,
    mileage: 19000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["Captain's Chairs", "Harman Kardon Audio", "Highway Driving Assist", "Dual Sunroof"],
    description:
      "The Kia Telluride is a spacious three-row SUV with premium features, powerful performance, and bold styling.",
  },
  {
    id: "11",
    brand: "Toyota",
    model: "RAV4",
    year: 2023,
    price: 32000,
    fuelType: "Hybrid",
    seatingCapacity: 5,
    mileage: 11000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["All-Wheel Drive", "Toyota Safety Sense", "JBL Audio", "Power Liftgate"],
    description:
      "The Toyota RAV4 Hybrid combines efficiency and versatility in a compact SUV package with Toyota's renowned reliability.",
  },
  {
    id: "12",
    brand: "Ford",
    model: "Mustang",
    year: 2022,
    price: 38000,
    fuelType: "Gasoline",
    seatingCapacity: 4,
    mileage: 14000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["Performance Package", "Digital Instrument Cluster", "Track Apps", "Active Exhaust"],
    description:
      "The Ford Mustang delivers thrilling performance, iconic styling, and modern technology in America's classic sports car.",
  },
  {
    id: "13",
    brand: "Honda",
    model: "CR-V",
    year: 2023,
    price: 33000,
    fuelType: "Hybrid",
    seatingCapacity: 5,
    mileage: 9000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["Honda Sensing", "Hands-Free Access Power Tailgate", "Wireless Charging", "Heated Steering Wheel"],
    description:
      "The Honda CR-V Hybrid offers excellent fuel economy, a spacious interior, and versatile cargo space in a reliable package.",
  },
  {
    id: "14",
    brand: "BMW",
    model: "X5",
    year: 2022,
    price: 65000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: 16000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["xDrive AWD", "Panoramic Roof", "Gesture Control", "Heated/Cooled Cupholders"],
    description:
      "The BMW X5 is a luxury midsize SUV with powerful engine options, premium interior, and advanced technology features.",
  },
  {
    id: "15",
    brand: "Tesla",
    model: "Model Y",
    year: 2023,
    price: 55000,
    fuelType: "Electric",
    seatingCapacity: 5,
    mileage: 7000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["Autopilot", "All-Wheel Drive", "Minimalist Interior", "Over-the-Air Updates"],
    description:
      "The Tesla Model Y is an all-electric crossover SUV with impressive range, quick acceleration, and cutting-edge technology.",
  },
  {
    id: "16",
    brand: "Audi",
    model: "A4",
    year: 2022,
    price: 42000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: 13000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["Virtual Cockpit", "MMI Touch", "Pre Sense Safety", "Sport Package"],
    description:
      "The Audi A4 is a luxury compact sedan with refined handling, premium interior, and sophisticated technology features.",
  },
  {
    id: "17",
    brand: "Hyundai",
    model: "Santa Fe",
    year: 2023,
    price: 36000,
    fuelType: "Hybrid",
    seatingCapacity: 5,
    mileage: 8000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["HTRAC AWD", "Blind View Monitor", "Surround View Monitor", "Ventilated Seats"],
    description:
      "The Hyundai Santa Fe Hybrid offers excellent fuel efficiency, a spacious interior, and advanced safety features.",
  },
  {
    id: "18",
    brand: "Mercedes",
    model: "GLC",
    year: 2022,
    price: 48000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: 15000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["4MATIC AWD", "MBUX Infotainment", "64-Color Ambient Lighting", "Burmester Sound"],
    description:
      "The Mercedes-Benz GLC is a luxury compact SUV with elegant styling, premium materials, and advanced technology.",
  },
  {
    id: "19",
    brand: "Nissan",
    model: "Leaf",
    year: 2023,
    price: 32000,
    fuelType: "Electric",
    seatingCapacity: 5,
    mileage: 6000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["ProPILOT Assist", "e-Pedal", "Bose Premium Audio", "Around View Monitor"],
    description:
      "The Nissan Leaf is an all-electric hatchback with zero emissions, instant torque, and user-friendly technology.",
  },
  {
    id: "20",
    brand: "Kia",
    model: "Sorento",
    year: 2022,
    price: 38000,
    fuelType: "Hybrid",
    seatingCapacity: 6,
    mileage: 12000,
    imageUrl: "/place.jpg?height=400&width=600",
    features: ["Captain's Chairs", "Bose Sound System", "Panoramic Sunroof", "Smart Power Liftgate"],
    description:
      "The Kia Sorento Hybrid is a midsize SUV with three-row seating, excellent fuel economy, and premium features.",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get filtered cars
export async function getCars(filters: CarFilters) {
  try {
    // Simulate API delay
    await delay(800)

    // Randomly simulate an error (1 in 20 chance)
    if (Math.random() < 0.05) {
      return {
        cars: [],
        totalCars: 0,
        totalPages: 0,
        error: "Failed to fetch cars",
      }
    }

    // Apply filters
    let filteredCars = [...carsData]

    if (filters.brand) {
      filteredCars = filteredCars.filter((car) => car.brand === filters.brand)
    }

    if (filters.minPrice !== undefined) {
      filteredCars = filteredCars.filter((car) => car.price >= filters.minPrice!)
    }

    if (filters.maxPrice !== undefined) {
      filteredCars = filteredCars.filter((car) => car.price <= filters.maxPrice!)
    }

    if (filters.fuelType) {
      filteredCars = filteredCars.filter((car) => car.fuelType === filters.fuelType)
    }

    if (filters.seatingCapacity) {
      filteredCars = filteredCars.filter((car) => car.seatingCapacity === filters.seatingCapacity)
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "priceLow":
          filteredCars.sort((a, b) => a.price - b.price)
          break
        case "priceHigh":
          filteredCars.sort((a, b) => b.price - a.price)
          break
        case "newest":
          filteredCars.sort((a, b) => b.year - a.year)
          break
        default:
          // Default sorting (featured)
          break
      }
    }

    // Calculate pagination
    const page = filters.page || 1
    const pageSize = 10
    const totalCars = filteredCars.length
    const totalPages = Math.ceil(totalCars / pageSize)

    // Get cars for current page
    const startIndex = (page - 1) * pageSize
    const paginatedCars = filteredCars.slice(startIndex, startIndex + pageSize)

    return {
      cars: paginatedCars,
      totalCars,
      totalPages,
      error: null,
    }
  } catch (error) {
    return {
      cars: [],
      totalCars: 0,
      totalPages: 0,
      error: "An unexpected error occurred",
    }
  }
}

// Get a single car by ID
export async function getCar(id: string) {
  try {
    // Simulate API delay
    await delay(500)

    const car = carsData.find((car) => car.id === id)
    return car || null
  } catch (error) {
    return null
  }
}
