import Link from "next/link"
import Image from "next/image"
import { ShieldCheck } from "lucide-react"
import SiteHeader from "@/components/site-header"

export default function RefundPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="w-full bg-gradient-to-b from-green-600 to-green-700 text-white pt-20 md:pt-32 pb-6 md:pb-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center font-heading">
            Refund Policy
          </h1>
        </div>
      </section>

      <section className="w-full bg-white py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl overflow-hidden">
          <div className="flex justify-center mb-6 sm:mb-10">
            <div className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]">
              <Image
                src="/100-money-back-guarantee.png"
                alt="100% Money Back Guarantee"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="prose prose-lg max-w-none overflow-hidden">
            <p className="text-base sm:text-lg font-body">
              Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              OUR COMMITMENT TO YOU
            </h2>
            <p className="font-body text-base sm:text-lg">
              At BurnJaro, we stand behind the quality of our products and want you to be completely satisfied with your
              purchase. We understand that trying a new weight loss supplement is a personal decision, and we want to
              make it as risk-free as possible for you.
            </p>

            <div className="flex items-start sm:items-center gap-2 sm:gap-3 my-6 sm:my-8 bg-green-50 p-4 sm:p-6 rounded-lg border border-green-100">
              <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 text-green-700 flex-shrink-0 mt-1 sm:mt-0" />
              <p className="text-lg sm:text-xl font-bold text-green-700 font-body">
                We offer a 60-day, 100% money-back guarantee on all BurnJaro purchases.
              </p>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              60-DAY MONEY BACK GUARANTEE
            </h2>
            <p className="font-body text-base sm:text-lg">
              If you are not completely satisfied with your BurnJaro purchase for any reason, simply contact our
              customer service team within 60 days of your original purchase, and we will issue a full refund of your
              purchase price, even if you've used the entire bottle.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              HOW TO REQUEST A REFUND
            </h2>
            <p className="font-body text-base sm:text-lg">To initiate a refund, please follow these simple steps:</p>
            <ol className="list-decimal pl-4 sm:pl-6 space-y-1 sm:space-y-2 font-body text-base sm:text-lg">
              <li>Contact our customer service team at support@burnjaro.com or call (800) 555-1234.</li>
              <li>Provide your order number and the date of purchase.</li>
              <li>
                Briefly explain the reason for your return (this helps us improve our products, but is not required for
                a refund).
              </li>
              <li>
                Our team will provide you with a Return Merchandise Authorization (RMA) number and return instructions.
              </li>
              <li>Return the product (even if empty) to the address provided.</li>
              <li>Once we receive your return, we will process your refund within 5-7 business days.</li>
            </ol>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              REFUND DETAILS
            </h2>
            <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 font-body text-base sm:text-lg">
              <li>Refunds will be issued to the original payment method used for the purchase.</li>
              <li>The refund includes the purchase price of the product(s).</li>
              <li>Shipping and handling fees are non-refundable.</li>
              <li>Customers are responsible for return shipping costs.</li>
              <li>
                Please allow 5-7 business days for the refund to appear on your account statement after processing.
              </li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              EXCEPTIONS
            </h2>
            <p className="font-body text-base sm:text-lg">
              While we strive to make our refund policy as customer-friendly as possible, there are a few exceptions:
            </p>
            <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 font-body text-base sm:text-lg">
              <li>Refund requests made after the 60-day period will not be honored.</li>
              <li>
                Products not purchased directly from our official website or authorized retailers are not eligible for
                our refund policy.
              </li>
              <li>Bulk orders (more than 3 bottles) may be subject to partial refunds at our discretion.</li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              CONTACT US
            </h2>
            <p className="font-body text-base sm:text-lg">
              If you have any questions about our refund policy, please contact our customer service team:
            </p>
            <p className="font-body font-bold text-base sm:text-lg">
              BurnJaro Customer Service
              <br />
              Email: support@burnjaro.com
              <br />
              Phone: (800) 555-1234
              <br />
              Hours: Monday-Friday, 9am-5pm EST
            </p>
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <Link
              href="/"
              className="inline-block bg-green-700 hover:bg-green-600 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-colors font-heading text-sm sm:text-base"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </section>

      <footer className="w-full bg-green-800 text-white py-6 sm:py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image src="/burnjaro-bottle.png" alt="BurnJaro Logo" width={40} height={40} className="object-contain" />
              <span className="font-bold text-xl sm:text-2xl font-heading">BurnJaro</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 font-body text-sm sm:text-base md:text-lg">
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
              <Link href="/refund-policy" className="hover:underline">
                Refund Policy
              </Link>
            </div>
          </div>
          <div className="mt-4 sm:mt-8 text-center text-xs sm:text-sm text-gray-300 font-body">
            <p>© {new Date().getFullYear()} BurnJaro. All Rights Reserved.</p>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base max-w-4xl mx-auto">
              *These statements have not been evaluated by the Food and Drug Administration. This product is not
              intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
