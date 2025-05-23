import { type NextRequest, NextResponse } from "next/server"
import { IngredientRepository } from "@/models/database"
import { deleteImage } from "@/lib/image-processor"
import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const ingredient = await IngredientRepository.findById(id)

    if (!ingredient) {
      return NextResponse.json({ message: "Ingredient not found" }, { status: 404 })
    }

    return NextResponse.json(ingredient)
  } catch (error) {
    console.error("Error getting ingredient:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Check if ingredient exists
    const existingIngredient = await IngredientRepository.findById(id)

    if (!existingIngredient) {
      return NextResponse.json({ message: "Ingredient not found" }, { status: 404 })
    }

    const formData = await request.formData()

    // Create update object
    const updateData: any = {}

    // Update text fields if provided
    if (formData.has("title")) updateData.title = formData.get("title")
    if (formData.has("description")) updateData.description = formData.get("description")

    // Process ingredient image if provided
    const image = formData.get("image") as File
    if (image && image.size > 0) {
      // Delete old image if exists
      if (existingIngredient.image_path) {
        deleteImage(existingIngredient.image_path)
      }

      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${uuidv4()}-${image.name}`
      const imagePath = join(process.cwd(), "public", "images", "ingredients", filename)

      await writeFile(imagePath, buffer)
      updateData.image_path = `/images/ingredients/${filename}`
    }

    // Update ingredient in database
    const updatedIngredient = await IngredientRepository.update(id, updateData)

    return NextResponse.json(updatedIngredient)
  } catch (error) {
    console.error("Error updating ingredient:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Get ingredient to delete its image
    const ingredient = await IngredientRepository.findById(id)

    if (!ingredient) {
      return NextResponse.json({ message: "Ingredient not found" }, { status: 404 })
    }

    // Delete ingredient image
    if (ingredient.image_path) {
      deleteImage(ingredient.image_path)
    }

    // Delete ingredient from database
    const deleted = await IngredientRepository.delete(id)

    if (!deleted) {
      return NextResponse.json({ message: "Failed to delete ingredient" }, { status: 500 })
    }

    return NextResponse.json({ message: "Ingredient deleted successfully" })
  } catch (error) {
    console.error("Error deleting ingredient:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
