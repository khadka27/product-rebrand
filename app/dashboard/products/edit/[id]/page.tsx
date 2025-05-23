"use client"

import { useParams, useRouter } from "next/navigation"
import ProductForm from "@/components/admin/ProductForm"

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  // Handle form success
  const handleSuccess = () => {
    // Show success message or redirect
    alert("Product updated successfully!")
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {id ? (
        <ProductForm productId={id} onSuccess={handleSuccess} />
      ) : (
        <div className="text-center py-8">Loading...</div>
      )}
    </div>
  )
}
