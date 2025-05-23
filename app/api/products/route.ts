import { type NextRequest, NextResponse } from "next/server"
import { initDatabase, ProductRepository } from "@/models/database"
import { initImageDirectories } from "@/lib/image-processor"
import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

// Initialize database and image directories
initDatabase().catch(console.error)
initImageDirectories()

export async function GET(request: NextRequest) {
  try {
    // Get search params
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search") || ""
    const sort = searchParams.get("sort") || "newest"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Get products with search and pagination
    const { products, total } = await ProductRepository.findAll({
      search,
      sort,
      page,
      limit,
    })

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error getting products:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Validate required fields
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const redirect_link = formData.get("redirect_link") as string
    const money_back_days = Number.parseInt(formData.get("money_back_days") as string) || 60

    if (!name || !description || !redirect_link) {
      return NextResponse.json(
        {
          message: "Missing required fields: name, description, and redirect_link are required",
        },
        { status: 400 },
      )
    }

    // Create product object
    const product = {
      name,
      description,
      redirect_link,
      money_back_days,
      image_path: "",
      badge_path: "",
    }

    // Process product image if provided
    const image = formData.get("image") as File
    if (image) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${uuidv4()}-${image.name}`
      const imagePath = join(process.cwd(), "public", "images", "products", filename)

      await writeFile(imagePath, buffer)
      product.image_path = `/images/products/${filename}`
    }

    // Process badge image if provided
    const badge = formData.get("badge") as File
    if (badge) {
      const bytes = await badge.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${uuidv4()}-${badge.name}`
      const badgePath = join(process.cwd(), "public", "images", "badges", filename)

      await writeFile(badgePath, buffer)
      product.badge_path = `/images/badges/${filename}`
    }

    // Save product to database
    const createdProduct = await ProductRepository.create(product)

    return NextResponse.json(createdProduct, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
