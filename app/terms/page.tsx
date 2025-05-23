import Link from "next/link"
import Image from "next/image"
import SiteHeader from "@/components/site-header"

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="w-full bg-gradient-to-b from-green-600 to-green-700 text-white pt-20 md:pt-32 pb-6 md:pb-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center font-heading">
            Terms of Service
          </h1>
        </div>
      </section>

      <section className="w-full bg-white py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl overflow-hidden">
          <div className="prose prose-lg max-w-none overflow-hidden">
            <p className="text-base sm:text-lg font-body">
              Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              1. AGREEMENT TO TERMS
            </h2>
            <p className="font-body text-base sm:text-lg">
              These Terms of Service constitute a legally binding agreement made between you and BurnJaro, concerning
              your access to and use of our website and products. You agree that by accessing the Site, you have read,
              understood, and agree to be bound by all of these Terms of Service.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              2. INTELLECTUAL PROPERTY RIGHTS
            </h2>
            <p className="font-body text-base sm:text-lg">
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases,
              functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and
              the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to
              us, and are protected by copyright and trademark laws.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              3. USER REPRESENTATIONS
            </h2>
            <p className="font-body text-base sm:text-lg">
              By using the Site, you represent and warrant that: (1) you have the legal capacity to agree to these Terms
              of Service; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the
              Site through automated or non-human means; (4) you will not use the Site for any illegal or unauthorized
              purpose; and (5) your use of the Site will not violate any applicable law or regulation.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              4. PRODUCTS
            </h2>
            <p className="font-body text-base sm:text-lg">
              We make every effort to display as accurately as possible the colors, features, specifications, and
              details of the products available on the Site. However, we do not guarantee that the colors, features,
              specifications, and details of the products will be accurate, complete, reliable, current, or free of
              other errors, and your electronic display may not accurately reflect the actual colors and details of the
              products.
            </p>
            <p className="font-body text-base sm:text-lg">
              All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve
              the right to discontinue any products at any time for any reason. Prices for all products are subject to
              change.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              5. PURCHASES AND PAYMENT
            </h2>
            <p className="font-body text-base sm:text-lg">
              We accept the following forms of payment: Visa, Mastercard, American Express, Discover, and PayPal. You
              agree to provide current, complete, and accurate purchase and account information for all purchases made
              via the Site. You further agree to promptly update account and payment information, including email
              address, payment method, and payment card expiration date, so that we can complete your transactions and
              contact you as needed.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              6. REFUNDS POLICY
            </h2>
            <p className="font-body text-base sm:text-lg">
              Please review our Refund Policy posted on the Site prior to making any purchases.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              7. PROHIBITED ACTIVITIES
            </h2>
            <p className="font-body text-base sm:text-lg">
              You may not access or use the Site for any purpose other than that for which we make the Site available.
              The Site may not be used in connection with any commercial endeavors except those that are specifically
              endorsed or approved by us.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              8. TERM AND TERMINATION
            </h2>
            <p className="font-body text-base sm:text-lg">
              These Terms of Service shall remain in full force and effect while you use the Site. We may terminate your
              access to the Site, without cause or notice, which may result in the forfeiture and destruction of all
              information associated with you. All provisions of these Terms of Service which by their nature should
              survive termination shall survive termination, including, without limitation, ownership provisions,
              warranty disclaimers, indemnity, and limitations of liability.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              9. GOVERNING LAW
            </h2>
            <p className="font-body text-base sm:text-lg">
              These Terms of Service and your use of the Site are governed by and construed in accordance with the laws
              of the United States applicable to agreements made and to be entirely performed within the United States,
              without regard to its conflict of law principles.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              10. CONTACT US
            </h2>
            <p className="font-body text-base sm:text-lg">
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the
              Site, please contact us at:
            </p>
            <p className="font-body font-bold text-base sm:text-lg">
              BurnJaro
              <br />
              Email: support@burnjaro.com
              <br />
              Phone: (800) 555-1234
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
