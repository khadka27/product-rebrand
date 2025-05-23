import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import sharp from "sharp"

// Define image directories
const PRODUCT_IMAGE_DIR = path.join(process.cwd(), "public", "images", "products")
const BADGE_IMAGE_DIR = path.join(process.cwd(), "public", "images", "badges")
const INGREDIENT_IMAGE_DIR = path.join(process.cwd(), "public", "images", "ingredients")

// Ensure directories exist
function ensureDirectoryExists(directory: string) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }
}

// Initialize directories
export function initImageDirectories() {
  ensureDirectoryExists(PRODUCT_IMAGE_DIR)
  ensureDirectoryExists(BADGE_IMAGE_DIR)
  ensureDirectoryExists(INGREDIENT_IMAGE_DIR)
}

// Image type enum
export enum ImageType {
  PRODUCT = "product",
  BADGE = "badge",
  INGREDIENT = "ingredient",
}

// Get directory based on image type
function getDirectoryForType(type: ImageType): string {
  switch (type) {
    case ImageType.PRODUCT:
      return PRODUCT_IMAGE_DIR
    case ImageType.BADGE:
      return BADGE_IMAGE_DIR
    case ImageType.INGREDIENT:
      return INGREDIENT_IMAGE_DIR
    default:
      throw new Error(`Invalid image type: ${type}`)
  }
}

// Process and save image
export async function processAndSaveImage(buffer: Buffer, originalFilename: string, type: ImageType): Promise<string> {
  const directory = getDirectoryForType(type)
  ensureDirectoryExists(directory)

  // Generate unique filename
  const extension = path.extname(originalFilename).toLowerCase()
  const filename = `${uuidv4()}${extension}`
  const fullPath = path.join(directory, filename)

  // Resize image to 500x500 while maintaining aspect ratio
  await sharp(buffer)
    .resize({
      width: 500,
      height: 500,
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .toFile(fullPath)

  // Return the relative path for storage in the database
  return `/images/${type}s/${filename}`
}

// Delete image
export function deleteImage(imagePath: string): boolean {
  if (!imagePath) return false

  try {
    const fullPath = path.join(process.cwd(), "public", imagePath)
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath)
      return true
    }
    return false
  } catch (error) {
    console.error("Error deleting image:", error)
    return false
  }
}
