import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  location: string
  rating: number
  testimonial: string
  imageSrc: string
}

export default function TestimonialCard({ name, location, rating, testimonial, imageSrc }: TestimonialCardProps) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md border border-green-700/10">
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
          <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-bold font-heading text-base sm:text-lg md:text-xl text-green-700">{name}</h3>
          <p className="text-xs sm:text-sm md:text-base text-black font-body">{location}</p>
          <div className="flex mt-1">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
        </div>
      </div>
      <p className="italic font-body text-base sm:text-lg md:text-xl leading-relaxed text-black">"{testimonial}"</p>
    </div>
  )
}
