"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Tab } from "@headlessui/react"
import type { Ingredient, WhyChoose } from "@/models/database"

// Form state interface
interface FormState {
  product: {
    name: string
    description: string
    redirect_link: string
    money_back_days: number
    image: File | null
    badge: File | null
  }
  ingredients: {
    title: string
    description: string
    image: File | null
  }[]
  whyChoose: {
    title: string
    description: string
  }[]
}

// Props interface
interface ProductFormProps {
  productId?: string
  onSuccess?: (productId: string) => void
}

export default function ProductForm({ productId, onSuccess }: ProductFormProps) {
  // Form state
  const [formState, setFormState] = useState<FormState>({
    product: {
      name: "",
      description: "",
      redirect_link: "",
      money_back_days: 60,
      image: null,
      badge: null,
    },
    ingredients: [
      {
        title: "",
        description: "",
        image: null,
      },
    ],
    whyChoose: [
      {
        title: "",
        description: "",
      },
    ],
  })

  // Loading and error states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  // Preview URLs for images
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null)
  const [badgeImagePreview, setBadgeImagePreview] = useState<string | null>(null)
  const [ingredientImagePreviews, setIngredientImagePreviews] = useState<(string | null)[]>([null])

  // Load existing product data if editing
  useEffect(() => {
    if (productId) {
      loadProductData()
    }
  }, [productId])

  // Load product data
  const loadProductData = async () => {
    try {
      setLoading(true)

      // Fetch product data
      const productRes = await axios.get(`/api/products/${productId}`)
      const product = productRes.data

      // Fetch ingredients
      const ingredientsRes = await axios.get(`/api/products/${productId}/ingredients`)
      const ingredients = ingredientsRes.data

      // Fetch why choose items
      const whyChooseRes = await axios.get(`/api/products/${productId}/why-choose`)
      const whyChoose = whyChooseRes.data

      // Update form state
      setFormState({
        product: {
          name: product.name,
          description: product.description,
          redirect_link: product.redirect_link,
          money_back_days: product.money_back_days,
          image: null,
          badge: null,
        },
        ingredients:
          ingredients.length > 0
            ? ingredients.map((ing: Ingredient) => ({
                title: ing.title,
                description: ing.description,
                image: null,
              }))
            : [{ title: "", description: "", image: null }],
        whyChoose:
          whyChoose.length > 0
            ? whyChoose.map((wc: WhyChoose) => ({
                title: wc.title,
                description: wc.description,
              }))
            : [{ title: "", description: "" }],
      })

      // Set image previews
      if (product.image_path) {
        setProductImagePreview(product.image_path)
      }

      if (product.badge_path) {
        setBadgeImagePreview(product.badge_path)
      }

      // Set ingredient image previews
      setIngredientImagePreviews(ingredients.map((ing: Ingredient) => ing.image_path || null))

      setLoading(false)
    } catch (err) {
      console.error("Error loading product data:", err)
      setError("Failed to load product data")
      setLoading(false)
    }
  }

  // Handle product field changes
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        [name]: value,
      },
    }))
  }

  // Handle product image changes
  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Update form state
      setFormState((prev) => ({
        ...prev,
        product: {
          ...prev.product,
          [e.target.name]: file,
        },
      }))

      // Create preview URL
      const reader = new FileReader()
      reader.onload = () => {
        if (e.target.name === "image") {
          setProductImagePreview(reader.result as string)
        } else if (e.target.name === "badge") {
          setBadgeImagePreview(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle ingredient field changes
  const handleIngredientChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => {
      const newIngredients = [...prev.ingredients]
      newIngredients[index] = {
        ...newIngredients[index],
        [name]: value,
      }
      return {
        ...prev,
        ingredients: newIngredients,
      }
    })
  }

  // Handle ingredient image changes
  const handleIngredientImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Update form state
      setFormState((prev) => {
        const newIngredients = [...prev.ingredients]
        newIngredients[index] = {
          ...newIngredients[index],
          image: file,
        }
        return {
          ...prev,
          ingredients: newIngredients,
        }
      })

      // Create preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setIngredientImagePreviews((prev) => {
          const newPreviews = [...prev]
          newPreviews[index] = reader.result as string
          return newPreviews
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle why choose field changes
  const handleWhyChooseChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => {
      const newWhyChoose = [...prev.whyChoose]
      newWhyChoose[index] = {
        ...newWhyChoose[index],
        [name]: value,
      }
      return {
        ...prev,
        whyChoose: newWhyChoose,
      }
    })
  }

  // Add new ingredient
  const addIngredient = () => {
    setFormState((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { title: "", description: "", image: null }],
    }))
    setIngredientImagePreviews((prev) => [...prev, null])
  }

  // Remove ingredient
  const removeIngredient = (index: number) => {
    setFormState((prev) => {
      const newIngredients = [...prev.ingredients]
      newIngredients.splice(index, 1)
      return {
        ...prev,
        ingredients: newIngredients.length > 0 ? newIngredients : [{ title: "", description: "", image: null }],
      }
    })

    setIngredientImagePreviews((prev) => {
      const newPreviews = [...prev]
      newPreviews.splice(index, 1)
      return newPreviews.length > 0 ? newPreviews : [null]
    })
  }

  // Add new why choose item
  const addWhyChoose = () => {
    setFormState((prev) => ({
      ...prev,
      whyChoose: [...prev.whyChoose, { title: "", description: "" }],
    }))
  }

  // Remove why choose item
  const removeWhyChoose = (index: number) => {
    setFormState((prev) => {
      const newWhyChoose = [...prev.whyChoose]
      newWhyChoose.splice(index, 1)
      return {
        ...prev,
        whyChoose: newWhyChoose.length > 0 ? newWhyChoose : [{ title: "", description: "" }],
      }
    })
  }

  // Check if product form is valid
  const isProductFormValid = () => {
    const { name, description, redirect_link } = formState.product
    return name.trim() !== "" && description.trim() !== "" && redirect_link.trim() !== ""
  }

  // Check if ingredients form is valid
  const isIngredientsFormValid = () => {
    return formState.ingredients.every((ing) => ing.title.trim() !== "" && ing.description.trim() !== "")
  }

  // Check if why choose form is valid
  const isWhyChooseFormValid = () => {
    return formState.whyChoose.every((wc) => wc.title.trim() !== "" && wc.description.trim() !== "")
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      // Create FormData for product
      const productFormData = new FormData()
      productFormData.append("name", formState.product.name)
      productFormData.append("description", formState.product.description)
      productFormData.append("redirect_link", formState.product.redirect_link)
      productFormData.append("money_back_days", formState.product.money_back_days.toString())

      if (formState.product.image) {
        productFormData.append("image", formState.product.image)
      }

      if (formState.product.badge) {
        productFormData.append("badge", formState.product.badge)
      }

      // Create or update product
      let productId = ""
      if (productId) {
        // Update existing product
        const productRes = await axios.put(`/api/products/${productId}`, productFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        productId = productRes.data.id
      } else {
        // Create new product
        const productRes = await axios.post("/api/products", productFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        productId = productRes.data.id
      }

      // Create or update ingredients
      for (let i = 0; i < formState.ingredients.length; i++) {
        const ing = formState.ingredients[i]

        // Skip empty ingredients
        if (ing.title.trim() === "" || ing.description.trim() === "") {
          continue
        }

        const ingredientFormData = new FormData()
        ingredientFormData.append("title", ing.title)
        ingredientFormData.append("description", ing.description)

        if (ing.image) {
          ingredientFormData.append("image", ing.image)
        }

        await axios.post(`/api/products/${productId}/ingredients`, ingredientFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }

      // Create or update why choose items
      for (let i = 0; i < formState.whyChoose.length; i++) {
        const wc = formState.whyChoose[i]

        // Skip empty why choose items
        if (wc.title.trim() === "" || wc.description.trim() === "") {
          continue
        }

        await axios.post(`/api/products/${productId}/why-choose`, {
          title: wc.title,
          description: wc.description,
        })
      }

      setSuccess("Product saved successfully!")

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(productId)
      }

      setLoading(false)
    } catch (err) {
      console.error("Error saving product:", err)
      setError("Failed to save product")
      setLoading(false)
    }
  }

  // Next tab
  const goToNextTab = () => {
    if (activeTab < 2) {
      setActiveTab(activeTab + 1)
    }
  }

  // Previous tab
  const goToPrevTab = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{productId ? "Edit Product" : "Create New Product"}</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>
      )}

      <form onSubmit={handleSubmit}>
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                ${selected ? "bg-white text-blue-700 shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"}`
              }
            >
              Product Details
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                ${selected ? "bg-white text-blue-700 shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"}`
              }
              disabled={!isProductFormValid()}
            >
              Ingredients
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                ${selected ? "bg-white text-blue-700 shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"}`
              }
              disabled={!isProductFormValid() || !isIngredientsFormValid()}
            >
              Why Choose
            </Tab>
          </Tab.List>

          <Tab.Panels>
            {/* Product Details Panel */}
            <Tab.Panel>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.product.name}
                    onChange={handleProductChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formState.product.description}
                    onChange={handleProductChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Redirect Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    name="redirect_link"
                    value={formState.product.redirect_link}
                    onChange={handleProductChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Money Back Guarantee (Days)</label>
                  <input
                    type="number"
                    name="money_back_days"
                    value={formState.product.money_back_days}
                    onChange={handleProductChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleProductImageChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {productImagePreview && (
                    <div className="mt-2">
                      <img
                        src={productImagePreview || "/placeholder.svg"}
                        alt="Product preview"
                        className="h-32 w-32 object-contain border rounded"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge Image</label>
                  <input
                    type="file"
                    name="badge"
                    onChange={handleProductImageChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {badgeImagePreview && (
                    <div className="mt-2">
                      <img
                        src={badgeImagePreview || "/placeholder.svg"}
                        alt="Badge preview"
                        className="h-32 w-32 object-contain border rounded"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={goToNextTab}
                    disabled={!isProductFormValid()}
                    className={`px-4 py-2 rounded-md text-white ${
                      isProductFormValid() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next: Ingredients
                  </button>
                </div>
              </div>
            </Tab.Panel>

            {/* Ingredients Panel */}
            <Tab.Panel>
              <div className="space-y-6">
                {formState.ingredients.map((ingredient, index) => (
                  <div key={index} className="p-4 border rounded-md bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Ingredient #{index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={ingredient.title}
                          onChange={(e) => handleIngredientChange(index, e)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="description"
                          value={ingredient.description}
                          onChange={(e) => handleIngredientChange(index, e)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <input
                          type="file"
                          name="image"
                          onChange={(e) => handleIngredientImageChange(index, e)}
                          accept="image/*"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {ingredientImagePreviews[index] && (
                          <div className="mt-2">
                            <img
                              src={ingredientImagePreviews[index] || ""}
                              alt={`Ingredient ${index + 1} preview`}
                              className="h-32 w-32 object-contain border rounded"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add Ingredient
                  </button>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={goToPrevTab}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Back: Product Details
                  </button>
                  <button
                    type="button"
                    onClick={goToNextTab}
                    disabled={!isIngredientsFormValid()}
                    className={`px-4 py-2 rounded-md text-white ${
                      isIngredientsFormValid() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next: Why Choose
                  </button>
                </div>
              </div>
            </Tab.Panel>

            {/* Why Choose Panel */}
            <Tab.Panel>
              <div className="space-y-6">
                {formState.whyChoose.map((whyChoose, index) => (
                  <div key={index} className="p-4 border rounded-md bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Why Choose #{index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeWhyChoose(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={whyChoose.title}
                          onChange={(e) => handleWhyChooseChange(index, e)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="description"
                          value={whyChoose.description}
                          onChange={(e) => handleWhyChooseChange(index, e)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <button
                    type="button"
                    onClick={addWhyChoose}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add Why Choose
                  </button>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={goToPrevTab}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Back: Ingredients
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !isWhyChooseFormValid()}
                    className={`px-4 py-2 rounded-md text-white ${
                      !loading && isWhyChooseFormValid()
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Saving..." : "Save Product"}
                  </button>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </form>
    </div>
  )
}
