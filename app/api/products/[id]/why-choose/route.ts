import { type NextRequest, NextResponse } from "next/server"
import { ProductRepository, WhyChooseRepository } from "@/models/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id

    // Check if product exists
    const product = await ProductRepository.findById(productId)

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    const whyChooseItems = await WhyChooseRepository.findByProductId(productId)
    return NextResponse.json(whyChooseItems)
  } catch (error) {
    console.error("Error getting why choose items:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id

    // Check if product exists
    const product = await ProductRepository.findById(productId)

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    const data = await request.json()

    // Validate required fields
    const { title, description } = data

    if (!title || !description) {
      return NextResponse.json(
        {
          message: "Missing required fields: title and description are required",
        },
        { status: 400 },
      )
    }

    // Create why choose object
    const whyChoose = {
      product_id: productId,
      title,
      description,
    }

    // Save why choose item to database
    const createdWhyChoose = await WhyChooseRepository.create(whyChoose)

    return NextResponse.json(createdWhyChoose, { status: 201 })
  } catch (error) {
    console.error("Error creating why choose item:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
