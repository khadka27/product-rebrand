"use client"

import { useState, useEffect } from "react"
import { ShoppingCart } from "lucide-react"
import ShineButton from "@/components/shine-button"

export default function StickyOrderButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      const scrollY = window.scrollY
      setIsVisible(scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigateToOrderPage = () => {
    window.open("https://www.premierdiscountlink.com/JD2XQCJ/FMRP24H/?source_id=offweb", "_blank")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-3 sm:bottom-4 left-0 right-0 z-50 flex justify-center md:hidden">
      <ShineButton
        className="w-[80%] bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold text-sm sm:text-lg py-3 sm:py-4 rounded-full shadow-lg flex items-center justify-center gap-1 sm:gap-2 font-oswald"
        onClick={navigateToOrderPage}
      >
        <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
        ORDER NOW
      </ShineButton>
      <div className="h-1 sm:h-2 md:h-0"></div>
    </div>
  )
}
