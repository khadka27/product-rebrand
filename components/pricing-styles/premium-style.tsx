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

export default function PremiumStyle({
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
          {/* Premium Display Style */}
          <div className="w-full max-w-[280px] mx-auto">
            <div className="relative h-64 w-full bg-gradient-to-b from-gray-900 to-red-950 rounded-xl overflow-hidden">
              {/* Spotlight effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)]"></div>

              {/* Pedestal/platform */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent blur-sm"></div>

              {/* Bottle display */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="relative w-32 h-48">
                  <Image
                    src="/hepatoburn-bottle.png"
                    alt="HepatoBurn Bottle"
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </div>

              {/* Premium badge - moved up to replace stars */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-sm font-bold py-1 px-4 rounded-full shadow-lg">
                {bottleCount}-Month Premium Supply
              </div>

              {/* Elegant quantity display */}
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <div className="inline-block bg-black bg-opacity-70 backdrop-blur-sm text-white text-xs font-medium py-1 px-3 rounded-full border border-red-800">
                  {bottleCount} x Premium Bottles
                </div>
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
