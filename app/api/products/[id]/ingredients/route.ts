import { type NextRequest, NextResponse } from "next/server"
import { ProductRepository, IngredientRepository } from "@/models/database"
import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id

    // Check if product exists
    const product = await ProductRepository.findById(productId)

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    const ingredients = await IngredientRepository.findByProductId(productId)
    return NextResponse.json(ingredients)
  } catch (error) {
    console.error("Error getting ingredients:", error)
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

    const formData = await request.formData()

    // Validate required fields
    const title = formData.get("title") as string
    const description = formData.get("description") as string

    if (!title || !description) {
      return NextResponse.json(
        {
          message: "Missing required fields: title and description are required",
        },
        { status: 400 },
      )
    }

    // Create ingredient object
    const ingredient = {
      product_id: productId,
      title,
      description,
      image_path: "",
    }

    // Process ingredient image if provided
    const image = formData.get("image") as File
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${uuidv4()}-${image.name}`
      const imagePath = join(process.cwd(), "public", "images", "ingredients", filename)

      await writeFile(imagePath, buffer)
      ingredient.image_path = `/images/ingredients/${filename}`
    }

    // Save ingredient to database
    const createdIngredient = await IngredientRepository.create(ingredient)

    return NextResponse.json(createdIngredient, { status: 201 })
  } catch (error) {
    console.error("Error creating ingredient:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
