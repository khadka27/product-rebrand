"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import Image from "next/image"
import type { Product, Ingredient, WhyChoose } from "@/models/database"

interface ProductData {
  product: Product
  ingredients: Ingredient[]
  whyChooseItems: WhyChoose[]
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { slug, productId } = params

  const [productData, setProductData] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load product data when slug and productId are available
  useEffect(() => {
    if (slug && productId) {
      fetchProductData()
    }
  }, [slug, productId])

  // Fetch product data from API
  const fetchProductData = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`/api/products/slug/${slug}/${productId}`)
      setProductData(res.data)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching product data:", err)
      setError("Failed to load product data")
      setLoading(false)
    }
  }

  // Handle redirect button click
  const handleRedirect = () => {
    if (productData?.product.redirect_link) {
      window.location.href = productData.product.redirect_link
    }
  }

  // If loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Product...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    )
  }

  // If error
  if (error || !productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-red-50 rounded-lg">
          <h1 className="text-2xl font-bold text-red-700 mb-4">Product Not Found</h1>
          <p className="text-gray-700 mb-6">The product you are looking for does not exist or has been removed.</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  // Destructure product data
  const { product, ingredients, whyChooseItems } = productData

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">{product.name}</h1>
          <button onClick={handleRedirect} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Buy Now
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Product Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex justify-center items-center">
              {product.image_path ? (
                <div className="relative h-80 w-80">
                  <Image
                    src={product.image_path || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="h-80 w-80 bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>

              {/* Badge */}
              {product.badge_path && (
                <div className="mb-4">
                  <div className="relative h-16 w-16">
                    <Image
                      src={product.badge_path || "/placeholder.svg"}
                      alt="Product Badge"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Money Back Guarantee */}
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  {product.money_back_days}-Day Money Back Guarantee
                </h3>
                <p className="text-gray-700">
                  Try {product.name} risk-free for {product.money_back_days} days. If you're not completely satisfied,
                  we'll refund your purchase.
                </p>
              </div>

              <button
                onClick={handleRedirect}
                className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 text-lg font-bold"
              >
                Get {product.name} Now
              </button>
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        {ingredients.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Key Ingredients</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="border rounded-md p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    {ingredient.image_path && (
                      <div className="relative h-12 w-12 mr-3">
                        <Image
                          src={ingredient.image_path || "/placeholder.svg"}
                          alt={ingredient.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold">{ingredient.title}</h3>
                  </div>
                  <p className="text-gray-700">{ingredient.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Why Choose Section */}
        {whyChooseItems.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Why Choose {product.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyChooseItems.map((item) => (
                <div key={item.id} className="bg-blue-50 rounded-md p-4">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleRedirect}
                className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 text-lg font-bold"
              >
                Get {product.name} Now
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">
            © {new Date().getFullYear()} {product.name}. All Rights Reserved.
          </p>
          <p className="text-sm text-gray-400">
            *These statements have not been evaluated by the Food and Drug Administration. This product is not intended
            to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </footer>
    </div>
  )
}
