import { Star } from "lucide-react"

interface RatingDisplayProps {
  rating: number
  maxRating?: number
  reviewCount?: number
  showCount?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function RatingDisplay({
  rating,
  maxRating = 5,
  reviewCount,
  showCount = true,
  size = "md",
  className = "",
}: RatingDisplayProps) {
  // Determine star size based on the size prop
  const starSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }[size]

  // Determine text size based on the size prop
  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }[size]

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, index) => {
          // Calculate fill percentage for partial stars
          const fillPercentage = Math.max(0, Math.min(1, rating - index))

          return (
            <Star
              key={index}
              className={`${starSize} ${
                fillPercentage >= 0.8
                  ? "fill-yellow-500 text-yellow-500" // Full star
                  : fillPercentage >= 0.3
                    ? "fill-yellow-500/70 text-yellow-500" // Partial star
                    : "fill-yellow-500/20 text-yellow-500/50" // Empty star
              }`}
            />
          )
        })}
      </div>

      {showCount && (
        <span className={`${textSize} font-medium ml-1`}>
          {rating.toFixed(1)}/{maxRating}
          {reviewCount ? ` (${reviewCount.toLocaleString()} reviews)` : ""}
        </span>
      )}
    </div>
  )
}
