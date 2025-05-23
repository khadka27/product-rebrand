import Image from "next/image"

interface IngredientCardProps {
  name: string
  description: string
  imageSrc: string
  benefits: string[]
}

export default function IngredientCard({ name, description, imageSrc, benefits }: IngredientCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-red-50">
        <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-contain p-4" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-red-900 mb-3 font-heading">{name}</h3>
        {/* Increased font size for description */}
        <p className="text-gray-800 mb-4 font-body text-lg md:text-xl">{description}</p>
        <h4 className="font-semibold text-red-800 mb-3 font-heading text-xl">Key Benefits:</h4>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-lg md:text-xl font-body">
              <span className="text-yellow-500 font-bold text-xl">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
