"use client"

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

export default function PricingCard({
  title,
  subtitle,
  price,
  originalPrice,
  savings,
  popular = false,
  buttonText,
  bottleCount,
}: PricingCardProps) {
  // Function to handle checkout
  const handleCheckout = () => {
    window.open("https://www.premierdiscountlink.com/JD2XQCJ/FMRP24H/?source_id=offweb", "_blank")
  }

  // Only apply enhanced effects to the 6-bottle option
  const isEnhanced = bottleCount === 6

  return (
    <div
      className={`bg-white text-black rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        popular ? "ring-4 ring-yellow-500 scale-105 relative z-10" : ""
      }`}
    >
      {popular && (
        <div className="bg-yellow-500 text-green-900 text-center py-3 font-bold text-xl font-heading">MOST POPULAR</div>
      )}
      <div className="p-8 md:p-10 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-green-700 font-heading">{title}</h3>
        <p className="text-center text-black mb-6 text-lg font-body">{subtitle}</p>

        <div className="flex justify-center mb-8">
          {/* Bottle display container */}
          <div className="relative h-56 md:h-64 w-full max-w-[280px] mx-auto">
            {/* Approach 1: Single bottle with quantity indicator */}
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div className="relative" style={{ width: "140px", height: "200px" }}>
                <Image src="/burnjaro-bottle.png" alt="BurnJaro Bottle" fill className="object-contain" />

                {/* Quantity badge */}
                <div className="absolute -right-4 -top-4 bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white">
                  x{bottleCount}
                </div>
              </div>

              {/* Text description of quantity */}
              <p className="mt-4 font-bold text-lg text-green-700 font-heading">
                {bottleCount} {bottleCount === 1 ? "Bottle" : "Bottles"} Package
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          {/* Original price above current price */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl text-gray-500 line-through mb-2">${originalPrice}</span>
            <span className="text-5xl font-bold text-green-700 font-heading">${price}</span>
          </div>
          <p className="text-green-600 font-bold text-2xl mt-3 font-heading">{savings}</p>
          <p className="text-black mt-3 text-lg font-body">Per Bottle</p>
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
          enhanced={isEnhanced}
          className={`w-full ${
            popular ? "bg-yellow-500 hover:bg-yellow-600 text-green-900" : "bg-green-700 hover:bg-green-600 text-white"
          } font-bold py-5 rounded-full text-xl md:text-2xl shadow-lg font-oswald`}
          onClick={handleCheckout}
        >
          {buttonText}
        </ShineButton>
      </div>
    </div>
  )
}
