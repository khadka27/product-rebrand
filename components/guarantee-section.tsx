"use client"

import { Clock, RotateCcw } from "lucide-react"
import Image from "next/image"
import ShineButton from "@/components/shine-button"

export default function GuaranteeSection() {
  // Function to navigate to order page
  const navigateToOrderPage = () => {
    window.open("https://www.premierdiscountlink.com/JD2XQCJ/FMRP24H/?source_id=offweb", "_blank")
  }

  return (
    <section className="w-full bg-green-50 py-6 md:py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Left side - Guarantee Badge/Image */}
          <div className="md:w-2/5 flex justify-center">
            <div className="flex justify-center items-center">
              <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px]">
                <Image
                  src="/100-money-back-guarantee.png"
                  alt="100% Money Back Guarantee"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right side - Guarantee Text */}
          <div className="md:w-3/5 space-y-4 md:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 font-heading text-center md:text-left">
              Our Iron-Clad 60-Day Money-Back Guarantee
            </h2>

            <p className="text-base sm:text-lg md:text-xl font-body text-center md:text-left text-black">
              We're so confident that BurnJaro will deliver the results you're looking for that we're backing it with
              our no-questions-asked 60-day money-back guarantee.
            </p>

            <div className="space-y-4 mt-4 md:mt-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="mt-1 flex-shrink-0">
                  <Clock className="h-6 w-6 md:h-8 md:w-8 text-green-700" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-green-700 font-heading">Try BurnJaro For 60 Days</h3>
                  <p className="text-sm sm:text-base md:text-lg font-body text-black">
                    Take your time to experience the benefits. We recommend at least 30 days for optimal results.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="mt-1 flex-shrink-0">
                  <RotateCcw className="h-6 w-6 md:h-8 md:w-8 text-green-700" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-green-700 font-heading">
                    Not Satisfied? Get A Full Refund
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg font-body text-black">
                    If you're not completely satisfied with your results, simply contact our customer service team and
                    return the product (even empty bottles) for a full refund.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 md:pt-6 text-center md:text-left">
              <ShineButton
                className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 lg:py-6 rounded-full w-full sm:w-auto"
                onClick={navigateToOrderPage}
              >
                CLAIM YOUR RISK-FREE BOTTLES NOW
              </ShineButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
