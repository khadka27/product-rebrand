import { type NextRequest, NextResponse } from "next/server"
import { WhyChooseRepository } from "@/models/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const whyChooseItem = await WhyChooseRepository.findById(id)

    if (!whyChooseItem) {
      return NextResponse.json({ message: "Why choose item not found" }, { status: 404 })
    }

    return NextResponse.json(whyChooseItem)
  } catch (error) {
    console.error("Error getting why choose item:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Check if why choose item exists
    const existingWhyChooseItem = await WhyChooseRepository.findById(id)

    if (!existingWhyChooseItem) {
      return NextResponse.json({ message: "Why choose item not found" }, { status: 404 })
    }

    const data = await request.json()

    // Create update object
    const updateData: any = {}

    // Update fields if provided
    if (data.title) updateData.title = data.title
    if (data.description) updateData.description = data.description

    // Update why choose item in database
    const updatedWhyChooseItem = await WhyChooseRepository.update(id, updateData)

    return NextResponse.json(updatedWhyChooseItem)
  } catch (error) {
    console.error("Error updating why choose item:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Check if why choose item exists
    const whyChooseItem = await WhyChooseRepository.findById(id)

    if (!whyChooseItem) {
      return NextResponse.json({ message: "Why choose item not found" }, { status: 404 })
    }

    // Delete why choose item from database
    const deleted = await WhyChooseRepository.delete(id)

    if (!deleted) {
      return NextResponse.json({ message: "Failed to delete why choose item" }, { status: 500 })
    }

    return NextResponse.json({ message: "Why choose item deleted successfully" })
  } catch (error) {
    console.error("Error deleting why choose item:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
