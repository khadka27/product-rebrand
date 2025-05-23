import { type NextRequest, NextResponse } from "next/server"
import { ProductRepository, IngredientRepository, WhyChooseRepository } from "@/models/database"

export async function GET(request: NextRequest) {
  try {
    // Get total counts
    const totalProducts = await ProductRepository.count()
    const totalIngredients = await IngredientRepository.count()
    const totalWhyChoose = await WhyChooseRepository.count()

    // Get recent products
    const recentProducts = await ProductRepository.findAll({
      limit: 5,
      sort: "newest",
    })

    // Get product stats by month (last 6 months)
    const productsByMonth = await ProductRepository.getStatsByMonth(6)

    return NextResponse.json({
      counts: {
        products: totalProducts,
        ingredients: totalIngredients,
        whyChoose: totalWhyChoose,
      },
      recentProducts: recentProducts.products,
      productsByMonth,
    })
  } catch (error) {
    console.error("Error getting dashboard stats:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
