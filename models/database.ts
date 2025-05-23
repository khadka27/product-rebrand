import mysql from "mysql2/promise"
import { v4 as uuidv4 } from "uuid"

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "product_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Initialize database tables if they don't exist
export async function initDatabase() {
  const connection = await pool.getConnection()

  try {
    // Create products table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        redirect_link VARCHAR(255),
        image_path VARCHAR(255),
        badge_path VARCHAR(255),
        money_back_days INT DEFAULT 60,
        product_id VARCHAR(10) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create ingredients table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS ingredients (
        id VARCHAR(36) PRIMARY KEY,
        product_id VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_path VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `)

    // Create why_choose table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS why_choose (
        id VARCHAR(36) PRIMARY KEY,
        product_id VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `)

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
    throw error
  } finally {
    connection.release()
  }
}

// Generate a random 3-digit product ID
function generateProductId(): string {
  return Math.floor(100 + Math.random() * 900).toString()
}

// Generate a slug from a string
export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

// Product model
export interface Product {
  id?: string
  name: string
  slug?: string
  description: string
  redirect_link: string
  image_path?: string
  badge_path?: string
  money_back_days: number
  product_id?: string
  created_at?: Date
  updated_at?: Date
}

// Ingredient model
export interface Ingredient {
  id?: string
  product_id: string
  title: string
  description: string
  image_path?: string
  created_at?: Date
  updated_at?: Date
}

// Why Choose model
export interface WhyChoose {
  id?: string
  product_id: string
  title: string
  description: string
  created_at?: Date
  updated_at?: Date
}

// Search options interface
interface SearchOptions {
  search?: string
  sort?: string
  page?: number
  limit?: number
}

// Product repository
export const ProductRepository = {
  // Create a new product
  async create(product: Product): Promise<Product> {
    const connection = await pool.getConnection()

    try {
      const id = uuidv4()
      const slug = product.slug || generateSlug(product.name)
      const productId = generateProductId()

      const [result] = await connection.query(
        `INSERT INTO products 
        (id, name, slug, description, redirect_link, image_path, badge_path, money_back_days, product_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          product.name,
          slug,
          product.description,
          product.redirect_link,
          product.image_path || null,
          product.badge_path || null,
          product.money_back_days,
          productId,
        ],
      )

      return { ...product, id, slug, product_id: productId }
    } catch (error) {
      console.error("Error creating product:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Get all products with search and pagination
  async findAll(options: SearchOptions = {}): Promise<{ products: Product[]; total: number }> {
    const connection = await pool.getConnection()
    const { search = "", sort = "newest", page = 1, limit = 10 } = options
    const offset = (page - 1) * limit

    try {
      let query = `SELECT * FROM products`
      let countQuery = `SELECT COUNT(*) as total FROM products`
      let params: any[] = []

      // Add search condition if provided
      if (search) {
        query += ` WHERE name LIKE ? OR description LIKE ?`
        countQuery += ` WHERE name LIKE ? OR description LIKE ?`
        params = [`%${search}%`, `%${search}%`]
      }

      // Add sorting
      if (sort === "newest") {
        query += ` ORDER BY created_at DESC`
      } else if (sort === "oldest") {
        query += ` ORDER BY created_at ASC`
      } else if (sort === "name_asc") {
        query += ` ORDER BY name ASC`
      } else if (sort === "name_desc") {
        query += ` ORDER BY name DESC`
      }

      // Add pagination
      query += ` LIMIT ? OFFSET ?`
      params.push(limit, offset)

      // Execute queries
      const [rows] = await connection.query(query, params)
      const [countResult]: any = await connection.query(countQuery, search ? [`%${search}%`, `%${search}%`] : [])

      return {
        products: rows as Product[],
        total: countResult[0].total,
      }
    } catch (error) {
      console.error("Error finding products:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Get product by ID
  async findById(id: string): Promise<Product | null> {
    const connection = await pool.getConnection()

    try {
      const [rows]: any = await connection.query("SELECT * FROM products WHERE id = ?", [id])
      return rows.length ? (rows[0] as Product) : null
    } catch (error) {
      console.error("Error finding product by ID:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Get product by slug and product ID
  async findBySlugAndProductId(slug: string, productId: string): Promise<Product | null> {
    const connection = await pool.getConnection()

    try {
      const [rows]: any = await connection.query("SELECT * FROM products WHERE slug = ? AND product_id = ?", [
        slug,
        productId,
      ])
      return rows.length ? (rows[0] as Product) : null
    } catch (error) {
      console.error("Error finding product by slug and product ID:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Update product
  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    const connection = await pool.getConnection()

    try {
      // If name is being updated, update the slug as well
      if (product.name) {
        product.slug = generateSlug(product.name)
      }

      const fields = Object.keys(product)
        .filter((key) => key !== "id" && key !== "created_at" && key !== "updated_at")
        .map((key) => `${key} = ?`)

      const values = Object.keys(product)
        .filter((key) => key !== "id" && key !== "created_at" && key !== "updated_at")
        .map((key) => (product as any)[key])

      if (fields.length === 0) {
        return await this.findById(id)
      }

      const query = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`
      await connection.query(query, [...values, id])

      return await this.findById(id)
    } catch (error) {
      console.error("Error updating product:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Delete product
  async delete(id: string): Promise<boolean> {
    const connection = await pool.getConnection()

    try {
      const [result]: any = await connection.query("DELETE FROM products WHERE id = ?", [id])
      return result.affectedRows > 0
    } catch (error) {
      console.error("Error deleting product:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Count total products
  async count(): Promise<number> {
    const connection = await pool.getConnection()

    try {
      const [rows]: any = await connection.query("SELECT COUNT(*) as count FROM products")
      return rows[0].count
    } catch (error) {
      console.error("Error counting products:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Get product stats by month
  async getStatsByMonth(months = 6): Promise<any[]> {
    const connection = await pool.getConnection()

    try {
      const [rows]: any = await connection.query(
        `SELECT 
          DATE_FORMAT(created_at, '%Y-%m') as month,
          COUNT(*) as count
        FROM products
        WHERE created_at >= DATE_SUB(CURRENT_DATE(), INTERVAL ? MONTH)
        GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ORDER BY month ASC`,
        [months],
      )
      return rows
    } catch (error) {
      console.error("Error getting product stats by month:", error)
      throw error
    } finally {
      connection.release()
    }
  },
}

// Ingredient repository
export const IngredientRepository = {
  // Create a new ingredient
  async create(ingredient: Ingredient): Promise<Ingredient> {
    const connection = await pool.getConnection()

    try {
      const id = uuidv4()

      await connection.query(
        `INSERT INTO ingredients 
        (id, product_id, title, description, image_path) 
        VALUES (?, ?, ?, ?, ?)`,
        [id, ingredient.product_id, ingredient.title, ingredient.description, ingredient.image_path || null],
      )

      return { ...ingredient, id }
    } catch (error) {
      console.error("Error creating ingredient:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Get all ingredients for a product
  async findByProductId(productId: string): Promise<Ingredient[]> {
    const connection = await pool.getConnection()

    try {
      const [rows] = await connection.query("SELECT * FROM ingredients WHERE product_id = ? ORDER BY created_at ASC", [
        productId,
      ])
      return rows as Ingredient[]
    } catch (error) {
      console.error("Error finding ingredients:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Get ingredient by ID
  async findById(id: string): Promise<Ingredient | null> {
    const connection = await pool.getConnection()

    try {
      const [rows]: any = await connection.query("SELECT * FROM ingredients WHERE id = ?", [id])
      return rows.length ? (rows[0] as Ingredient) : null
    } catch (error) {
      console.error("Error finding ingredient by ID:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Update ingredient
  async update(id: string, ingredient: Partial<Ingredient>): Promise<Ingredient | null> {
    const connection = await pool.getConnection()

    try {
      const fields = Object.keys(ingredient)
        .filter((key) => key !== "id" && key !== "product_id" && key !== "created_at" && key !== "updated_at")
        .map((key) => `${key} = ?`)

      const values = Object.keys(ingredient)
        .filter((key) => key !== "id" && key !== "product_id" && key !== "created_at" && key !== "updated_at")
        .map((key) => (ingredient as any)[key])

      if (fields.length === 0) {
        return await this.findById(id)
      }

      const query = `UPDATE ingredients SET ${fields.join(", ")} WHERE id = ?`
      await connection.query(query, [...values, id])

      return await this.findById(id)
    } catch (error) {
      console.error("Error updating ingredient:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Delete ingredient
  async delete(id: string): Promise<boolean> {
    const connection = await pool.getConnection()

    try {
      const [result]: any = await connection.query("DELETE FROM ingredients WHERE id = ?", [id])
      return result.affectedRows > 0
    } catch (error) {
      console.error("Error deleting ingredient:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Count total ingredients
  async count(): Promise<number> {
    const connection = await pool.getConnection()

    try {
      const [rows]: any = await connection.query("SELECT COUNT(*) as count FROM ingredients")
      return rows[0].count
    } catch (error) {
      console.error("Error counting ingredients:", error)
      throw error
    } finally {
      connection.release()
    }
  },
}

// Why Choose repository
export const WhyChooseRepository = {
  // Create a new why choose item
  async create(whyChoose: WhyChoose): Promise<WhyChoose> {
    const connection = await pool.getConnection()

    try {
      const id = uuidv4()

      await connection.query(
        `INSERT INTO why_choose 
        (id, product_id, title, description) 
        VALUES (?, ?, ?, ?)`,
        [id, whyChoose.product_id, whyChoose.title, whyChoose.description],
      )

      return { ...whyChoose, id }
    } catch (error) {
      console.error("Error creating why choose item:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Get all why choose items for a product
  async findByProductId(productId: string): Promise<WhyChoose[]> {
    const connection = await pool.getConnection()

    try {
      const [rows] = await connection.query("SELECT * FROM why_choose WHERE product_id = ? ORDER BY created_at ASC", [
        productId,
      ])
      return rows as WhyChoose[]
    } catch (error) {
      console.error("Error finding why choose items:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Get why choose item by ID
  async findById(id: string): Promise<WhyChoose | null> {
    const connection = await pool.getConnection()

    try {
      const [rows]: any = await connection.query("SELECT * FROM why_choose WHERE id = ?", [id])
      return rows.length ? (rows[0] as WhyChoose) : null
    } catch (error) {
      console.error("Error finding why choose item by ID:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Update why choose item
  async update(id: string, whyChoose: Partial<WhyChoose>): Promise<WhyChoose | null> {
    const connection = await pool.getConnection()

    try {
      const fields = Object.keys(whyChoose)
        .filter((key) => key !== "id" && key !== "product_id" && key !== "created_at" && key !== "updated_at")
        .map((key) => `${key} = ?`)

      const values = Object.keys(whyChoose)
        .filter((key) => key !== "id" && key !== "product_id" && key !== "created_at" && key !== "updated_at")
        .map((key) => (whyChoose as any)[key])

      if (fields.length === 0) {
        return await this.findById(id)
      }

      const query = `UPDATE why_choose SET ${fields.join(", ")} WHERE id = ?`
      await connection.query(query, [...values, id])

      return await this.findById(id)
    } catch (error) {
      console.error("Error updating why choose item:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Delete why choose item
  async delete(id: string): Promise<boolean> {
    const connection = await pool.getConnection()

    try {
      const [result]: any = await connection.query("DELETE FROM why_choose WHERE id = ?", [id])
      return result.affectedRows > 0
    } catch (error) {
      console.error("Error deleting why choose item:", error)
      throw error
    } finally {
      connection.release()
    }
  },

  // Count total why choose items
  async count(): Promise<number> {
    const connection = await pool.getConnection()

    try {
      const [rows]: any = await connection.query("SELECT COUNT(*) as count FROM why_choose")
      return rows[0].count
    } catch (error) {
      console.error("Error counting why choose items:", error)
      throw error
    } finally {
      connection.release()
    }
  },
}

export default pool
