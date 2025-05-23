"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, ShieldCheck, ArrowRight, Star } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import PricingCard from "@/components/pricing-card"
import FAQAccordion from "@/components/faq-accordion"
import SiteHeader from "@/components/site-header"
import ShineButton from "@/components/shine-button"
import StickyOrderButton from "@/components/sticky-order-button"
import CountdownTimer from "@/components/countdown-timer"
import GuaranteeSection from "@/components/guarantee-section"
import CreativeCountdown from "@/components/creative-countdown"
import { JsonLd } from "@/components/json-ld"
import axios from "axios"
import type { Product } from "@/models/database"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalProducts, setTotalProducts] = useState(0)

  // Product schema data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "BurnJaro",
    image: "/burnjaro-bottle.png",
    description:
      "BurnJaro is a revolutionary weight loss supplement designed to boost metabolism, reduce appetite, and increase fat burning.",
    brand: {
      "@type": "Brand",
      name: "BurnJaro",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: 49,
      highPrice: 79,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "BurnJaro",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      reviewCount: 1247,
      bestRating: 5,
      worstRating: 1,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        "@type": "Person",
        name: "Jennifer L.",
      },
      datePublished: "2023-11-15",
      reviewBody:
        "After struggling with my weight for years, BurnJaro has been a game-changer. I've lost 28 pounds in just 2 months!",
    },
  }

  // FAQ schema data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How Does BurnJaro Work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BurnJaro works through a unique triple-action formula that boosts metabolism, reduces appetite, and increases fat burning. Our proprietary blend of natural ingredients targets stubborn fat while providing energy and supporting overall wellness.",
        },
      },
      {
        "@type": "Question",
        name: "How Long Does It Take to See Results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many customers report feeling increased energy and reduced appetite within the first week. For weight loss results, most users begin to see noticeable changes within 2-4 weeks of consistent use, with optimal results typically seen after 2-3 months.",
        },
      },
      {
        "@type": "Question",
        name: "Is BurnJaro Safe to Use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BurnJaro is made with 100% natural ingredients in an FDA-approved, GMP-certified facility. It contains no artificial additives, stimulants, or harmful chemicals. However, as with any supplement, we recommend consulting with your healthcare provider before starting, especially if you have any medical conditions or are taking medications.",
        },
      },
      {
        "@type": "Question",
        name: "What If BurnJaro Doesn't Work for Me?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We stand behind our product with a 60-day, 100% money-back guarantee. If you're not completely satisfied with your results, simply contact our customer service team within 60 days of purchase for a full refund, no questions asked.",
        },
      },
    ],
  }

  // Organization schema data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BurnJaro",
    url: "/",
    logo: "/logo.png",
    sameAs: ["https://facebook.com/burnjaro", "https://twitter.com/burnjaro", "https://instagram.com/burnjaro"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-555-1234",
      contactType: "customer service",
      availableLanguage: "English",
    },
  }

  // Scientific research data
  const researchStudies = [
    {
      title: "Effects of green tea and its epigallocatechin (EGCG) content on body weight and fat mass in humans",
      authors: "Hursel, R., Viechtbauer, W., Westerterp-Plantenga, M.S.",
      journal: "Physiology & Behavior, 100(1), 42-46 (2010)",
      url: "https://pubmed.ncbi.nlm.nih.gov/20156466/",
      key_finding: "Green tea extract rich in EGCG can increase fat oxidation and energy expenditure.",
    },
    {
      title: "The effects of green tea catechins on body composition and energy expenditure",
      authors: "Westerterp-Plantenga, M.S., Lejeune, M.P., Kovacs, E.M.",
      journal: "Journal of Nutritional Biochemistry, 17(11), 717-726 (2006)",
      url: "https://pubmed.ncbi.nlm.nih.gov/16876495/",
      key_finding:
        "Green tea catechins combined with caffeine can improve weight maintenance through thermogenesis and fat oxidation.",
    },
    {
      title: "Garcinia cambogia (hydroxycitric acid) as a potential antiobesity agent",
      authors: "Heymsfield, S.B., Allison, D.B., Vasselli, J.R., et al.",
      journal: "JAMA, 280(18), 1596-1600 (1998)",
      url: "https://jamanetwork.com/journals/jama/fullarticle/188147",
      key_finding: "Garcinia cambogia extract can help reduce appetite and inhibit fat production in the body.",
    },
    {
      title: "Effects of forskolin on adenylate cyclase, cAMP generation, and lipolysis in rat adipocytes",
      authors: "Allen, D.O., Ahmed, B., Naseer, K.",
      journal: "Journal of Pharmacology and Experimental Therapeutics, 238(2), 659-664 (1986)",
      url: "https://pubmed.ncbi.nlm.nih.gov/3018216/",
      key_finding: "Forskolin can activate enzymes that break down fat cells and potentially increase metabolic rate.",
    },
  ]

  // Function to navigate to external link
  const navigateToOrderPage = () => {
    window.open("https://www.premierdiscountlink.com/JD2XQCJ/FMRP24H/?source_id=offweb", "_blank")
  }

  // Initialize database on page load
  useEffect(() => {
    initDatabase()
    fetchProducts()
  }, [])

  // Initialize database
  const initDatabase = async () => {
    try {
      await axios.post("/api/init-db")
    } catch (err) {
      console.error("Error initializing database:", err)
    }
  }

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/products")
      setProducts(res.data.products)
      setTotalProducts(res.data.pagination.total)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching products:", err)
      setError("Failed to load products")
      setLoading(false)
    }
  }

  return (
    <>
      {/* Structured Data / Schema Markup */}
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={organizationSchema} />

      <main className="flex min-h-screen flex-col items-center">
        <SiteHeader />
        {/* Hero Section */}
        <section className="w-full bg-green-700 text-white pt-20 md:pt-32" id="home">
          <div className="container mx-auto px-4 py-6 md:py-12 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">
              {/* Left side content */}
              <div className="md:col-span-7 space-y-4 md:space-y-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-heading">
                  Accelerate Your Weight Loss with BurnJaro
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-body">
                  The revolutionary triple-action formula that boosts metabolism, reduces appetite, and burns fat faster
                  than ever before
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="bg-white text-green-700 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border border-white shadow-sm">
                    100% Natural
                  </span>
                  <span className="bg-white text-green-700 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border border-white shadow-sm">
                    Made in USA
                  </span>
                  <span className="bg-white text-green-700 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border border-white shadow-sm">
                    GMP Certified
                  </span>
                </div>

                <div className="pt-2">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${star <= 4 ? "fill-yellow-500 text-yellow-500" : "fill-yellow-500/50 text-yellow-500/50"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium ml-1">4.8/5 (1,247 reviews)</span>
                  </div>

                  <p className="text-sm sm:text-base flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    60-Day Money Back Guarantee
                  </p>
                  <CreativeCountdown minutes={10} seconds={0} className="w-full max-w-md" />
                </div>
              </div>

              {/* Right side with bottle and button */}
              <div className="md:col-span-5 flex flex-col items-center mt-4 md:mt-0">
                <div className="relative w-48 h-60 sm:w-60 sm:h-72 md:w-72 md:h-96 lg:w-80 lg:h-[420px]">
                  <Image
                    src="/burnjaro-bottle.png"
                    alt="BurnJaro Weight Loss Supplement Bottle - Natural Fat Burner Formula"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <ShineButton
                  enhanced={true}
                  className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 py-2 sm:py-3 rounded-full mt-4 sm:mt-6 w-full sm:w-auto font-oswald"
                  onClick={navigateToOrderPage}
                >
                  ORDER NOW
                </ShineButton>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="w-full bg-white py-6 md:py-10" aria-labelledby="trust-badges-title">
          <div className="container mx-auto px-2 sm:px-3 max-w-7xl">
            <h2
              id="trust-badges-title"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-green-700 mb-4 md:mb-8 font-heading"
            >
              The Gold Standard in Weight Loss
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
              {[
                {
                  image: "/fda-approved.png",
                  title: "FDA Approved Facility",
                  description: "Made in a facility following strict FDA guidelines for safety and quality.",
                },
                {
                  image: "/all-natural.png",
                  title: "100% Natural Formula",
                  description: "Premium natural ingredients for maximum effectiveness and results.",
                },
                {
                  image: "/made-in-usa.png",
                  title: "Made in USA",
                  description: "Proudly manufactured in the United States under strict quality standards.",
                },
                {
                  image: "/gmp-certified.png",
                  title: "GMP Certified",
                  description: "Follows Good Manufacturing Practices for consistent quality in every bottle.",
                },
              ].map((badge, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 relative mb-2">
                    <Image src={badge.image || "/placeholder.svg"} alt={badge.title} fill className="object-contain" />
                  </div>
                  <div className="text-center w-full px-1">
                    <h3 className="text-sm sm:text-base font-bold text-green-700 mb-1 font-heading">{badge.title}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-black font-body">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Information */}
        <section className="w-full bg-green-50 py-6 md:py-12" id="how-it-works" aria-labelledby="how-it-works-title">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="relative w-48 h-64 sm:w-64 sm:h-80 md:w-80 md:h-[420px] mx-auto">
                  <Image
                    src="/burnjaro-bottle.png"
                    alt="BurnJaro Weight Loss Supplement Bottle"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-4 md:space-y-6">
                <h2
                  id="how-it-works-title"
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 font-heading"
                >
                  What is BurnJaro?
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-body">
                  BurnJaro is a revolutionary weight loss supplement designed with a triple-action formula that boosts
                  metabolism, reduces appetite, and accelerates fat burning. Our proprietary blend of natural
                  ingredients works synergistically to help you achieve your weight loss goals faster and more
                  effectively.
                </p>
                <ul className="space-y-2 md:space-y-3 font-body">
                  {[
                    "100% Natural Ingredients",
                    "Non-GMO",
                    "Made in an FDA-Approved Facility",
                    "GMP Certified",
                    "No Artificial Additives",
                    "60-Day Money Back Guarantee",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-base sm:text-lg md:text-xl">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <ShineButton
                    enhanced={false}
                    className="bg-green-700 hover:bg-green-600 text-white font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-1.5 sm:py-2 rounded-full w-full sm:w-auto font-oswald"
                    onClick={navigateToOrderPage}
                  >
                    LEARN MORE
                  </ShineButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Showcase Section */}
        <section className="w-full bg-white py-6 md:py-12 text-green-700" aria-labelledby="benefits-showcase-title">
          <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
            <h2
              id="benefits-showcase-title"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-10 font-heading text-green-700"
            >
              The BurnJaro Advantage
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {[
                {
                  title: "Boosts Metabolism",
                  description:
                    "Activates your body's natural fat-burning mechanisms for more efficient calorie burning throughout the day.",
                },
                {
                  title: "Reduces Appetite",
                  description:
                    "Helps control cravings and reduces hunger, making it easier to maintain a healthy caloric deficit.",
                },
                {
                  title: "Burns Stubborn Fat",
                  description:
                    "Targets stubborn fat deposits, especially around the abdomen, thighs, and arms for visible results.",
                },
                {
                  title: "Increases Energy",
                  description:
                    "Provides natural, sustained energy throughout the day without the crash associated with stimulants.",
                },
                {
                  title: "All-Natural Formula",
                  description:
                    "Made with 100% natural ingredients with no artificial additives, fillers, or harmful chemicals.",
                },
                {
                  title: "Rapid Results",
                  description:
                    "Delivers noticeable improvements within weeks, with optimal results seen after consistent use.",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-green-50 p-4 sm:p-6 md:p-8 rounded-xl border border-green-700/10 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 font-heading text-green-700">{benefit.title}</h3>
                      <p className="text-black text-base sm:text-lg md:text-xl font-body">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          className="w-full bg-green-50 text-green-700 py-6 md:py-12"
          id="benefits"
          aria-labelledby="benefits-title"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <h2
              id="benefits-title"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-10 font-heading"
            >
              How BurnJaro Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              <div className="bg-green-700/10 p-4 sm:p-5 md:p-6 rounded-lg text-center hover:bg-green-700/20 transition-colors">
                <div className="flex justify-center mb-3 md:mb-4">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-yellow-500" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3 font-heading">
                  Boosts Metabolism
                </h3>
                <p className="font-body text-base sm:text-lg md:text-xl text-black">
                  Increases your metabolic rate to burn more calories throughout the day
                </p>
              </div>

              <div className="bg-green-700/10 p-4 sm:p-5 md:p-6 rounded-lg text-center hover:bg-green-700/20 transition-colors">
                <div className="flex justify-center mb-3 md:mb-4">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-yellow-500" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3 font-heading">
                  Suppresses Appetite
                </h3>
                <p className="font-body text-base sm:text-lg md:text-xl text-black">
                  Reduces hunger and cravings to help you consume fewer calories
                </p>
              </div>

              <div className="bg-green-700/10 p-4 sm:p-5 md:p-6 rounded-lg text-center hover:bg-green-700/20 transition-colors">
                <div className="flex justify-center mb-3 md:mb-4">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-yellow-500" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3 font-heading">
                  Targets Fat Cells
                </h3>
                <p className="font-body text-base sm:text-lg md:text-xl text-black">
                  Helps break down stored fat and prevents new fat accumulation
                </p>
              </div>

              <div className="bg-green-700/10 p-4 sm:p-5 md:p-6 rounded-lg text-center hover:bg-green-700/20 transition-colors">
                <div className="flex justify-center mb-3 md:mb-4">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-yellow-500" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3 font-heading">Boosts Energy</h3>
                <p className="font-body text-base sm:text-lg md:text-xl text-black">
                  Provides natural, sustained energy to keep you active and motivated
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        <section className="w-full bg-white py-6 md:py-12" id="ingredients" aria-labelledby="ingredients-title">
          <div className="container mx-auto px-4 max-w-[1400px]">
            <h2
              id="ingredients-title"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-10 font-heading text-green-700"
            >
              Key Ingredients
            </h2>

            <div className="space-y-4 md:space-y-6">
              {[
                {
                  name: "Green Tea Extract",
                  description:
                    "Rich in catechins and EGCG that boost metabolism and increase fat oxidation. Helps burn calories and provides antioxidant benefits.",
                  imageSrc: "/green-tea-extract.png",
                },
                {
                  name: "Garcinia Cambogia",
                  description:
                    "Contains hydroxycitric acid (HCA) that helps block fat production and suppresses appetite. Supports weight management and reduces cravings.",
                  imageSrc: "/garcinia-cambogia.png",
                },
                {
                  name: "Forskolin Extract",
                  description:
                    "Activates enzymes that release fatty acids from adipose tissue, allowing them to be burned for energy. Helps preserve lean muscle mass during weight loss.",
                  imageSrc: "/forskolin-extract.png",
                },
                {
                  name: "Raspberry Ketones",
                  description:
                    "Natural compounds that increase the breakdown of fat and increase levels of adiponectin, a hormone that regulates metabolism. Helps the body burn fat more efficiently.",
                  imageSrc: "/raspberry-ketones.png",
                },
                {
                  name: "Apple Cider Vinegar Powder",
                  description:
                    "Supports healthy blood sugar levels and helps reduce appetite. Contains acetic acid that can boost metabolism and reduce fat storage.",
                  imageSrc: "/apple-cider-vinegar.png",
                },
              ].map((ingredient, index) => (
                <div key={index} className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-green-700/10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-green-700/20 shadow-md bg-white flex items-center justify-center">
                        <Image
                          src={ingredient.imageSrc || "/placeholder.svg"}
                          alt={ingredient.name}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-1 sm:mb-2 font-heading text-center sm:text-left">
                        {ingredient.name}
                      </h3>
                      <p className="text-black font-body text-base sm:text-lg md:text-xl text-center sm:text-left">
                        {ingredient.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-12 text-center">
              <ShineButton
                enhanced={false}
                className="bg-green-700 hover:bg-green-600 text-white font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-1.5 sm:py-2 rounded-full w-full sm:w-auto font-oswald"
                onClick={navigateToOrderPage}
              >
                DISCOVER THE SCIENCE
              </ShineButton>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          className="w-full bg-green-50 text-green-700 py-6 md:py-12"
          id="testimonials"
          aria-labelledby="testimonials-title"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <h2
              id="testimonials-title"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-10 font-heading"
            >
              Real People, Real Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              <TestimonialCard
                name="Jennifer L."
                location="Dallas, TX"
                rating={5}
                testimonial="After struggling with my weight for years, BurnJaro has been a game-changer. I've lost 28 pounds in just 2 months and feel amazing!"
                imageSrc="/woman-portrait.png"
              />
              <TestimonialCard
                name="Michael R."
                location="Chicago, IL"
                rating={5}
                testimonial="I was skeptical at first, but the results speak for themselves. My energy levels are through the roof and I've dropped 2 pant sizes in 6 weeks."
                imageSrc="/thoughtful-man-portrait.png"
              />
              <TestimonialCard
                name="Sarah K."
                location="Portland, OR"
                rating={5}
                testimonial="BurnJaro helped me break through my weight loss plateau. The appetite control is incredible, and I'm finally seeing definition in my abs!"
                imageSrc="/woman-portrait.png"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full bg-white py-6 md:py-16" id="pricing" aria-labelledby="pricing-title">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-6 md:mb-10">
              <h2
                id="pricing-title"
                className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-3 md:mb-4 font-heading text-green-700"
              >
                Special Limited-Time Offer
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3 font-body text-black">
                Choose Your Package & Save Today!
              </p>
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-1 bg-yellow-500 mx-auto"></div>
            </div>

            {/* Countdown Timer */}
            <div className="mb-6 md:mb-10">
              <CountdownTimer className="text-center" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-6xl mx-auto">
              <PricingCard
                title="2 BOTTLES"
                subtitle="60 Day Supply"
                price={79}
                originalPrice={158}
                savings="SAVE $79!"
                popular={false}
                buttonText="BUY NOW!"
                bottleCount={2}
              />
              <PricingCard
                title="6 BOTTLES"
                subtitle="180 Day Supply"
                price={49}
                originalPrice={474}
                savings="SAVE $180!"
                popular={true}
                buttonText="BUY NOW!"
                bottleCount={6}
              />
              <PricingCard
                title="3 BOTTLES"
                subtitle="90 Day Supply"
                price={69}
                originalPrice={237}
                savings="SAVE $90!"
                popular={false}
                buttonText="BUY NOW!"
                bottleCount={3}
              />
            </div>

            <div className="mt-8 md:mt-12 text-center">
              <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg bg-green-700/80 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full shadow-lg font-body text-white">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-yellow-500" />
                <span>All Packages Come With Our 60-Day Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </section>

        {/* Money-Back Guarantee Section */}
        <section className="w-full bg-green-50">
          <GuaranteeSection />
        </section>

        {/* FAQ Section */}
        <section className="w-full bg-white py-6 md:py-12" id="faq" aria-labelledby="faq-title">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2
              id="faq-title"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-10 font-heading text-green-700"
            >
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto bg-white rounded-xl p-4 sm:p-6 md:p-8 border border-green-700/10 shadow-sm">
              <FAQAccordion darkMode={false} />
            </div>
          </div>
        </section>

        {/* Science Section */}
        <section className="w-full bg-green-50 text-green-700 py-6 md:py-12" aria-labelledby="science-title">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2
              id="science-title"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-10 font-heading"
            >
              The Science Behind BurnJaro
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <div className="relative w-full h-40 sm:h-48 md:h-64 lg:h-80">
                  <Image
                    src="/burnjaro-bottle.png"
                    alt="BurnJaro Weight Loss Supplement"
                    fill
                    className="object-contain rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-heading text-green-700">
                  Scientifically Formulated for Maximum Results
                </h3>
                <p className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-black">
                  BurnJaro's triple-action formula is based on the latest scientific research in weight management and
                  metabolism. Our unique blend of natural ingredients works synergistically to boost metabolism, reduce
                  appetite, and accelerate fat burning.
                </p>
                <p className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-black">
                  Each ingredient in BurnJaro has been carefully selected based on clinical studies demonstrating its
                  effectiveness in supporting weight loss and overall wellness.
                </p>
                <ul className="space-y-2 md:space-y-3 font-body">
                  {[
                    "Boosts metabolism and increases calorie burning",
                    "Reduces appetite and controls cravings",
                    "Targets stubborn fat deposits",
                    "Provides clean, sustained energy",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 sm:gap-3 text-base sm:text-lg md:text-xl text-black"
                    >
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-700 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Scientific Research */}
        <section className="w-full bg-green-50 py-8 md:py-16" id="research" aria-labelledby="research-title">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-8 md:mb-12">
              <h2
                id="research-title"
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 font-heading text-green-700"
              >
                Backed by Scientific Research
              </h2>
              <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-body text-black">
                BurnJaro's approach is supported by numerous peer-reviewed scientific studies demonstrating the
                effectiveness of our key ingredients in supporting weight loss and metabolism.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-md">
              <h3 className="text-xl md:text-2xl font-bold text-green-700 mb-4 sm:mb-6 font-heading text-center">
                Scientific References:
              </h3>

              <ol className="list-decimal pl-4 sm:pl-6 space-y-3 sm:space-y-4 md:space-y-5 font-body text-black text-sm sm:text-base">
                {researchStudies.map((study, index) => (
                  <li key={index} className="break-words">
                    <span className="block sm:inline">{study.authors}</span>{" "}
                    <span className="block sm:inline">{study.title}.</span>{" "}
                    <span className="block sm:inline">{study.journal}.</span>{" "}
                    <a
                      href={study.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:underline break-all"
                    >
                      {study.url}
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-xs sm:text-sm text-gray-600 font-body">
                  *These statements have not been evaluated by the Food and Drug Administration. This product is not
                  intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Second CTA */}
        <section className="w-full bg-white py-6 md:py-12" aria-labelledby="cta-title">
          <div className="container mx-auto px-4 text-center max-w-7xl">
            <h2
              id="cta-title"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 font-heading text-green-700"
            >
              Start Your Transformation Today
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8 max-w-4xl mx-auto font-body text-black">
              Join thousands of satisfied customers who have experienced the life-changing benefits of BurnJaro. Don't
              wait - supplies are limited!
            </p>

            {/* Added bottle image */}
            <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
              <div className="relative w-32 h-44 sm:w-40 sm:h-56 md:w-48 md:h-64 lg:w-56 lg:h-72">
                <Image
                  src="/burnjaro-bottle.png"
                  alt="BurnJaro Weight Loss Supplement Bottle"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <ShineButton
              enhanced={true}
              className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 py-1.5 sm:py-2 rounded-full w-full sm:w-auto font-oswald"
              onClick={navigateToOrderPage}
            >
              <span className="flex items-center justify-center gap-2">
                CLAIM YOUR DISCOUNT NOW
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
            </ShineButton>
            <p className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg font-body text-green-700">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:h-6" />
              60-Day Money Back Guarantee
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-green-700 text-white py-6 md:py-8">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                  <Image src="/burnjaro-bottle.png" alt="BurnJaro Logo" fill className="object-contain" />
                </div>
                <span className="font-bold text-lg sm:text-xl font-heading">BurnJaro</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 font-body text-sm sm:text-base">
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
            <div className="mt-4 md:mt-6 text-center text-xs sm:text-sm text-gray-300 font-body">
              <p>© {new Date().getFullYear()} BurnJaro. All Rights Reserved.</p>
              <p className="mt-2 text-xs sm:text-sm md:text-base max-w-4xl mx-auto">
                *These statements have not been evaluated by the Food and Drug Administration. This product is not
                intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </div>
        </footer>

        {/* Sticky Order Button (Mobile Only) */}
        <div className="md:hidden">
          <StickyOrderButton />
        </div>
      </main>
    </>
  )
}
