import { type NextRequest, NextResponse } from "next/server"
import { ProductRepository, IngredientRepository, WhyChooseRepository } from "@/models/database"

export async function GET(request: NextRequest, { params }: { params: { slug: string; productId: string } }) {
  try {
    const { slug, productId } = params

    // Find product by slug and product ID
    const product = await ProductRepository.findBySlugAndProductId(slug, productId)

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    // Get ingredients and why choose items
    const ingredients = await IngredientRepository.findByProductId(product.id as string)
    const whyChooseItems = await WhyChooseRepository.findByProductId(product.id as string)

    // Return complete product data
    return NextResponse.json({
      product,
      ingredients,
      whyChooseItems,
    })
  } catch (error) {
    console.error("Error getting product by slug and ID:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
