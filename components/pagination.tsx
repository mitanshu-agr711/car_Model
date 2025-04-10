"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    return `${pathname}?${params.toString()}`
  }

  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-1 mt-8">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        onClick={() => router.push(createPageUrl(currentPage - 1))}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1 mx-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            // Show first page, last page, current page, and pages around current page
            return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
          })
          .map((page, index, array) => {
            // Add ellipsis between non-consecutive pages
            const showEllipsis = index > 0 && page - array[index - 1] > 1

            return (
              <div key={page} className="flex items-center">
                {showEllipsis && <span className="mx-1 text-muted-foreground">...</span>}
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => router.push(createPageUrl(page))}
                >
                  {page}
                </Button>
              </div>
            )
          })}
      </div>

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPages}
        onClick={() => router.push(createPageUrl(currentPage + 1))}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
