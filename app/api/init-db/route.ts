import { type NextRequest, NextResponse } from "next/server"
import { initDatabase } from "@/models/database"
import { initImageDirectories } from "@/lib/image-processor"

export async function POST(request: NextRequest) {
  try {
    // Initialize database
    await initDatabase()

    // Initialize image directories
    initImageDirectories()

    return NextResponse.json({ message: "Database and directories initialized successfully" })
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json({ message: "Failed to initialize database", error }, { status: 500 })
  }
}
