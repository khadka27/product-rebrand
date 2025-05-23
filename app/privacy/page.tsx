import Link from "next/link"
import Image from "next/image"
import SiteHeader from "@/components/site-header"

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="w-full bg-gradient-to-b from-green-600 to-green-700 text-white pt-20 md:pt-32 pb-6 md:pb-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center font-heading">
            Privacy Policy
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
              1. INTRODUCTION
            </h2>
            <p className="font-body text-base sm:text-lg">
              BurnJaro ("we" or "us" or "our") respects the privacy of our users ("user" or "you"). This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit our website and
              purchase our products. Please read this privacy policy carefully. If you do not agree with the terms of
              this privacy policy, please do not access the site.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              2. COLLECTION OF YOUR INFORMATION
            </h2>
            <p className="font-body text-base sm:text-lg">
              We may collect information about you in a variety of ways. The information we may collect on the Site
              includes:
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-green-600 mt-4 sm:mt-6 mb-2 sm:mb-3 font-heading">
              Personal Data
            </h3>
            <p className="font-body text-base sm:text-lg">
              Personally identifiable information, such as your name, shipping address, email address, and telephone
              number, and demographic information, such as your age, gender, hometown, and interests, that you
              voluntarily give to us when you register with the Site or when you choose to participate in various
              activities related to the Site, such as online chat and message boards. You are under no obligation to
              provide us with personal information of any kind, however your refusal to do so may prevent you from using
              certain features of the Site.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-green-600 mt-4 sm:mt-6 mb-2 sm:mb-3 font-heading">
              Derivative Data
            </h3>
            <p className="font-body text-base sm:text-lg">
              Information our servers automatically collect when you access the Site, such as your IP address, your
              browser type, your operating system, your access times, and the pages you have viewed directly before and
              after accessing the Site.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-green-600 mt-4 sm:mt-6 mb-2 sm:mb-3 font-heading">
              Financial Data
            </h3>
            <p className="font-body text-base sm:text-lg">
              Financial information, such as data related to your payment method (e.g. valid credit card number, card
              brand, expiration date) that we may collect when you purchase, order, return, exchange, or request
              information about our services from the Site. We store only very limited, if any, financial information
              that we collect. Otherwise, all financial information is stored by our payment processor and you are
              encouraged to review their privacy policy and contact them directly for responses to your questions.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              3. USE OF YOUR INFORMATION
            </h2>
            <p className="font-body text-base sm:text-lg">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized
              experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 font-body text-base sm:text-lg">
              <li>Create and manage your account.</li>
              <li>Process your orders and manage your transactions.</li>
              <li>Send you a newsletter.</li>
              <li>Email you regarding your order or account.</li>
              <li>Enable user-to-user communications.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
              <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
              <li>Increase the efficiency and operation of the Site.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Notify you of updates to the Site.</li>
              <li>Offer new products, services, and/or recommendations to you.</li>
              <li>Perform other business activities as needed.</li>
              <li>Request feedback and contact you about your use of the Site.</li>
              <li>Resolve disputes and troubleshoot problems.</li>
              <li>Respond to product and customer service requests.</li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              4. DISCLOSURE OF YOUR INFORMATION
            </h2>
            <p className="font-body text-base sm:text-lg">
              We may share information we have collected about you in certain situations. Your information may be
              disclosed as follows:
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-green-600 mt-4 sm:mt-6 mb-2 sm:mb-3 font-heading">
              By Law or to Protect Rights
            </h3>
            <p className="font-body text-base sm:text-lg">
              If we believe the release of information about you is necessary to respond to legal process, to
              investigate or remedy potential violations of our policies, or to protect the rights, property, and safety
              of others, we may share your information as permitted or required by any applicable law, rule, or
              regulation.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-green-600 mt-4 sm:mt-6 mb-2 sm:mb-3 font-heading">
              Third-Party Service Providers
            </h3>
            <p className="font-body text-base sm:text-lg">
              We may share your information with third parties that perform services for us or on our behalf, including
              payment processing, data analysis, email delivery, hosting services, customer service, and marketing
              assistance.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              5. SECURITY OF YOUR INFORMATION
            </h2>
            <p className="font-body text-base sm:text-lg">
              We use administrative, technical, and physical security measures to help protect your personal
              information. While we have taken reasonable steps to secure the personal information you provide to us,
              please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method
              of data transmission can be guaranteed against any interception or other type of misuse.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mt-6 sm:mt-8 mb-3 sm:mb-4 font-heading">
              6. CONTACT US
            </h2>
            <p className="font-body text-base sm:text-lg">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p className="font-body font-bold text-base sm:text-lg">
              BurnJaro
              <br />
              Email: privacy@burnjaro.com
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
