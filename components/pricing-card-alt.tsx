import Image from "next/image"
import { CheckCircle } from "lucide-react"
import ShineButton from "@/components/shine-button"

interface PricingCardProps {
  title: string
  subtitle: string
  price: number
  originalPrice: number
  savings: string
  popular?: boolean
  buttonText: string
  bottleCount: number
}

export default function PricingCardAlt({
  title,
  subtitle,
  price,
  originalPrice,
  savings,
  popular = false,
  buttonText,
  bottleCount,
}: PricingCardProps) {
  return (
    <div
      className={`bg-white text-black rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        popular ? "ring-4 ring-yellow-500 scale-105 relative z-10" : ""
      }`}
    >
      {popular && (
        <div className="bg-yellow-500 text-black text-center py-3 font-bold text-xl font-heading">MOST POPULAR</div>
      )}
      <div className="p-8 md:p-10 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-red-900 font-heading">{title}</h3>
        <p className="text-center text-gray-700 mb-6 text-lg font-body">{subtitle}</p>

        <div className="flex justify-center mb-8">
          {/* Approach 2: Bottle grid representation */}
          <div className="w-full max-w-[280px] mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {/* Render the appropriate number of bottle icons */}
                {Array.from({ length: bottleCount }).map((_, index) => (
                  <div key={index} className="relative w-16 h-24">
                    <Image
                      src="/hepatoburn-bottle.png"
                      alt={`HepatoBurn Bottle ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-red-900 text-white py-2 px-4 rounded-lg inline-block">
                <span className="font-bold">
                  {bottleCount} Bottle{bottleCount !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          {/* Original price above current price */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl text-gray-500 line-through mb-2">${originalPrice}</span>
            <span className="text-5xl font-bold text-red-900 font-heading">${price}</span>
          </div>
          <p className="text-green-600 font-bold text-2xl mt-3 font-heading">{savings}</p>
          <p className="text-gray-700 mt-3 text-lg font-body">Per Bottle</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left">
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-lg font-body">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Free US Shipping</span>
            </li>
            <li className="flex items-start gap-3 text-lg font-body">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span>60-Day Money Back Guarantee</span>
            </li>
            <li className="flex items-start gap-3 text-lg font-body">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span>One-Time Payment</span>
            </li>
            <li className="flex items-start gap-3 text-lg font-body">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Premium Quality Ingredients</span>
            </li>
          </ul>
        </div>

        <ShineButton
          className={`w-full ${
            popular ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-red-900 hover:bg-red-800 text-white"
          } font-bold py-5 rounded-full text-xl md:text-2xl shadow-lg`}
        >
          {buttonText}
        </ShineButton>
      </div>
    </div>
  )
}
