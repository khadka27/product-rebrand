"use client"

import { useRouter } from "next/navigation"
import ProductForm from "@/components/admin/ProductForm"

export default function NewProductPage() {
  const router = useRouter()

  // Handle form success
  const handleSuccess = (productId: string) => {
    // Redirect to edit page
    router.push(`/dashboard/products/edit/${productId}`)
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <ProductForm onSuccess={handleSuccess} />
    </div>
  )
}
