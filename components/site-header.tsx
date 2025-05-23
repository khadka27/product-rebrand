"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ShoppingCart, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import ShineButton from "@/components/shine-button"

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section with offset for header height
  const scrollToSection = useCallback((sectionId: string) => {
    setIsSheetOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [])

  // Function to navigate to order page
  const navigateToOrderPage = () => {
    window.open("https://www.premierdiscountlink.com/JD2XQCJ/FMRP24H/?source_id=offweb", "_blank")
  }

  const navLinks = [
    { name: "Home", href: "home" },
    { name: "Benefits", href: "benefits" },
    { name: "Ingredients", href: "ingredients" },
    { name: "How It Works", href: "how-it-works" },
    { name: "Reviews", href: "testimonials" }, // Changed from "Testimonials" to "Reviews" for shorter text
    { name: "Pricing", href: "pricing" },
    { name: "FAQ", href: "faq" },
  ]

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-green-700 shadow-md py-1 sm:py-2" : "bg-transparent py-2 sm:py-3 md:py-5"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 z-20">
            <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
              <Image src="/burnjaro-bottle.png" alt="BurnJaro Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-base sm:text-xl md:text-2xl text-white font-heading">BurnJaro</span>
          </Link>

          {/* Desktop Navigation - only show on large screens */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-white hover:text-yellow-300 transition-colors text-base xl:text-lg font-heading cursor-pointer relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* CTA Button (Desktop) - only show on large screens */}
          <div className="hidden lg:block">
            <ShineButton
              className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold text-lg px-6 py-3 rounded-md whitespace-nowrap font-oswald"
              onClick={navigateToOrderPage}
            >
              Order Now
            </ShineButton>
          </div>

          {/* Mobile Navigation - show on medium and small screens */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
            <button
              onClick={navigateToOrderPage}
              aria-label="Order Now"
              className="bg-yellow-500 hover:bg-yellow-600 text-green-900 p-1.5 sm:p-2 rounded-full flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white p-1 sm:p-2" aria-label="Open Menu">
                  <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-green-700 text-white border-green-700/50 p-0 w-[90vw] sm:w-[85vw] max-w-[350px]"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-green-700/30">
                    <Link href="/" className="flex items-center gap-3" onClick={() => setIsSheetOpen(false)}>
                      <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                        <Image src="/burnjaro-bottle.png" alt="BurnJaro Logo" fill className="object-contain" />
                      </div>
                      <span className="font-bold text-xl font-heading">BurnJaro</span>
                    </Link>
                    <SheetClose className="rounded-full bg-green-700/50 hover:bg-green-700/70 p-1.5 sm:p-2 transition-colors">
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="sr-only">Close</span>
                    </SheetClose>
                  </div>

                  <nav className="flex flex-col p-6">
                    {navLinks.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => scrollToSection(link.href)}
                        className="text-lg sm:text-xl font-medium hover:text-yellow-300 transition-colors font-heading py-3 sm:py-4 border-b border-green-700/30 text-left flex items-center justify-between px-2"
                      >
                        {link.name}
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-50" />
                      </button>
                    ))}
                  </nav>

                  <div className="mt-auto p-4 border-t border-green-700/30">
                    <ShineButton
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold text-base sm:text-xl py-3 sm:py-4 font-oswald"
                      onClick={() => {
                        setIsSheetOpen(false)
                        navigateToOrderPage()
                      }}
                    >
                      Order Now
                    </ShineButton>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
