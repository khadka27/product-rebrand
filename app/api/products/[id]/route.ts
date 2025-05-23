import { type NextRequest, NextResponse } from "next/server"
import { ProductRepository } from "@/models/database"
import { deleteImage } from "@/lib/image-processor"
import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const product = await ProductRepository.findById(id)

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error getting product:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Check if product exists
    const existingProduct = await ProductRepository.findById(id)

    if (!existingProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    const formData = await request.formData()

    // Create update object
    const updateData: any = {}

    // Update text fields if provided
    if (formData.has("name")) updateData.name = formData.get("name")
    if (formData.has("description")) updateData.description = formData.get("description")
    if (formData.has("redirect_link")) updateData.redirect_link = formData.get("redirect_link")
    if (formData.has("money_back_days"))
      updateData.money_back_days = Number.parseInt(formData.get("money_back_days") as string)

    // Process product image if provided
    const image = formData.get("image") as File
    if (image && image.size > 0) {
      // Delete old image if exists
      if (existingProduct.image_path) {
        deleteImage(existingProduct.image_path)
      }

      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${uuidv4()}-${image.name}`
      const imagePath = join(process.cwd(), "public", "images", "products", filename)

      await writeFile(imagePath, buffer)
      updateData.image_path = `/images/products/${filename}`
    }

    // Process badge image if provided
    const badge = formData.get("badge") as File
    if (badge && badge.size > 0) {
      // Delete old badge if exists
      if (existingProduct.badge_path) {
        deleteImage(existingProduct.badge_path)
      }

      const bytes = await badge.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${uuidv4()}-${badge.name}`
      const badgePath = join(process.cwd(), "public", "images", "badges", filename)

      await writeFile(badgePath, buffer)
      updateData.badge_path = `/images/badges/${filename}`
    }

    // Update product in database
    const updatedProduct = await ProductRepository.update(id, updateData)

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Get product to delete its images
    const product = await ProductRepository.findById(id)

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    // Delete product images
    if (product.image_path) {
      deleteImage(product.image_path)
    }

    if (product.badge_path) {
      deleteImage(product.badge_path)
    }

    // Delete product from database
    const deleted = await ProductRepository.delete(id)

    if (!deleted) {
      return NextResponse.json({ message: "Failed to delete product" }, { status: 500 })
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
