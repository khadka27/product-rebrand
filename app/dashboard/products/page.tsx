"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { Search, Plus, Filter, X, ChevronLeft, ChevronRight, Trash2, Edit, Eye } from "lucide-react"
import type { Product } from "@/models/database"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("newest")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  // Load products on page load and when search/sort/page changes
  useEffect(() => {
    fetchProducts()
  }, [search, sort, page, limit])

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/products", {
        params: {
          search,
          sort,
          page,
          limit,
        },
      })
      setProducts(res.data.products)
      setTotal(res.data.pagination.total)
      setTotalPages(res.data.pagination.totalPages)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching products:", err)
      setError("Failed to load products")
      setLoading(false)
    }
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1) // Reset to first page when search changes
  }

  // Clear search
  const clearSearch = () => {
    setSearch("")
    setPage(1)
  }

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value)
    setPage(1) // Reset to first page when sort changes
  }

  // Delete product
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setDeleteLoading(id)
        await axios.delete(`/api/products/${id}`)
        // Refresh products list
        fetchProducts()
        setDeleteLoading(null)
      } catch (err) {
        console.error("Error deleting product:", err)
        alert("Failed to delete product")
        setDeleteLoading(null)
      }
    }
  }

  // Generate product URL
  const getProductUrl = (product: Product) => {
    return `/product/${product.slug}/${product.product_id}`
  }

  // Go to previous page
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  // Go to next page
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
        <Link
          href="/dashboard/products/new"
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add New Product
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {search && (
              <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          <div className="w-full md:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={sort}
                onChange={handleSortChange}
                className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500 mb-4">
            {search ? `No products found matching "${search}"` : "No products found"}
          </p>
          {search ? (
            <button onClick={clearSearch} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Clear Search
            </button>
          ) : (
            <Link
              href="/dashboard/products/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Your First Product
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Money Back
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.image_path && (
                            <img
                              src={product.image_path || "/placeholder.svg"}
                              alt={product.name}
                              className="h-10 w-10 mr-3 object-contain"
                            />
                          )}
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.slug}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.product_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.money_back_days} days</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(product.created_at as Date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Link
                            href={`/dashboard/products/edit/${product.id}`}
                            className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <a
                            href={getProductUrl(product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(product.id as string)}
                            disabled={deleteLoading === product.id}
                            className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 disabled:opacity-50"
                            title="Delete"
                          >
                            {deleteLoading === product.id ? (
                              <div className="h-4 w-4 border-t-2 border-red-600 rounded-full animate-spin"></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
              <span className="font-medium">{Math.min(page * limit, total)}</span> of{" "}
              <span className="font-medium">{total}</span> products
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={page === totalPages}
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
