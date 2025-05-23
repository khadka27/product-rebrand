"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Leaf, Droplet, Zap, Heart, ArrowRight, CheckCircle } from "lucide-react"

const ingredients = [
  {
    id: "milk-thistle",
    name: "Milk Thistle Extract",
    icon: <Leaf className="h-6 w-6 text-green-600" />,
    description:
      "A powerful herb known for its liver-protective properties. Contains silymarin, which helps regenerate liver cells and reduce inflammation.",
    benefits: [
      "Supports liver cell regeneration",
      "Helps detoxify the liver",
      "Contains silymarin, a potent antioxidant",
      "Reduces inflammation",
    ],
    imageSrc: "/milk-thistle-extract.png",
    color: "bg-green-100",
    textColor: "text-green-800",
  },
  {
    id: "dandelion",
    name: "Dandelion Root",
    icon: <Droplet className="h-6 w-6 text-blue-600" />,
    description:
      "Traditional herb used for centuries to support liver health. Acts as a natural diuretic that helps reduce water retention.",
    benefits: [
      "Natural diuretic that helps reduce water retention",
      "Rich in antioxidants that protect liver cells",
      "Supports healthy bile production",
      "Aids in digestion",
    ],
    imageSrc: "/dandelion-root.png",
    color: "bg-blue-100",
    textColor: "text-blue-800",
  },
  {
    id: "artichoke",
    name: "Artichoke Leaf Extract",
    icon: <Heart className="h-6 w-6 text-red-600" />,
    description:
      "Mediterranean herb that supports liver function and digestion. Stimulates bile production and helps lower cholesterol levels.",
    benefits: [
      "Stimulates bile production",
      "Helps lower cholesterol levels",
      "Supports fat metabolism",
      "Rich in cynarin and silymarin",
    ],
    imageSrc: "/artichoke-leaf.png",
    color: "bg-red-100",
    textColor: "text-red-800",
  },
  {
    id: "berberine",
    name: "Berberine",
    icon: <Zap className="h-6 w-6 text-yellow-600" />,
    description:
      "Plant compound with powerful metabolic benefits. Activates AMPK, the metabolic master switch, and helps regulate blood sugar levels.",
    benefits: [
      "Activates AMPK, the metabolic master switch",
      "Helps regulate blood sugar levels",
      "Supports healthy cholesterol levels",
      "Promotes healthy gut bacteria",
    ],
    imageSrc: "/berberine.png",
    color: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  {
    id: "turmeric",
    name: "Turmeric Extract",
    icon: <Leaf className="h-6 w-6 text-orange-600" />,
    description:
      "Ancient spice with potent anti-inflammatory properties. Contains curcumin, a powerful antioxidant that reduces inflammation throughout the body.",
    benefits: [
      "Contains curcumin, a powerful antioxidant",
      "Reduces inflammation throughout the body",
      "Supports liver detoxification pathways",
      "Enhances bile production",
    ],
    imageSrc: "/turmeric-root-powder.png",
    color: "bg-orange-100",
    textColor: "text-orange-800",
  },
  {
    id: "choline",
    name: "Choline",
    icon: <Droplet className="h-6 w-6 text-purple-600" />,
    description:
      "Essential nutrient that supports liver health and fat metabolism. Prevents fat accumulation in the liver and supports cellular membrane integrity.",
    benefits: [
      "Prevents fat accumulation in the liver",
      "Supports cellular membrane integrity",
      "Essential for proper liver function",
      "Helps transport fats from the liver",
    ],
    imageSrc: "/choline-supplement.png",
    color: "bg-purple-100",
    textColor: "text-purple-800",
  },
]

export default function IngredientShowcase() {
  const [activeIngredient, setActiveIngredient] = useState(ingredients[0])

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left side - Ingredient Image and Description */}
        <div className="relative p-8 lg:p-12 flex flex-col">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-50 to-white opacity-50 z-0"></div>

          <div className="relative z-10 flex-1 flex flex-col">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${activeIngredient.color} ${activeIngredient.textColor} text-sm font-bold mb-6 self-start`}
            >
              {activeIngredient.icon}
              <span>Premium Ingredient</span>
            </div>

            <h3 className="text-3xl font-bold text-red-900 mb-4 font-heading">{activeIngredient.name}</h3>

            {/* Increased font size for ingredient description */}
            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-body">{activeIngredient.description}</p>

            <div className="mb-8">
              <h4 className="text-xl font-bold text-red-800 mb-4 font-heading">Key Benefits:</h4>
              <ul className="space-y-3">
                {activeIngredient.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-lg md:text-xl font-body">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative z-10 mt-auto">
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <span className="text-gray-500 font-body">Explore more ingredients</span>
              <ArrowRight className="h-5 w-5 text-red-800" />
            </div>
          </div>
        </div>

        {/* Right side - Ingredient Image and Selector */}
        <div className="bg-gradient-to-br from-red-800 to-red-900 p-8 lg:p-12 flex flex-col">
          <div className="relative h-64 md:h-80 mb-8 mx-auto">
            <motion.div
              key={activeIngredient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Image
                src={activeIngredient.imageSrc || "/placeholder.svg"}
                alt={activeIngredient.name}
                fill
                className="object-contain"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-auto">
            {ingredients.map((ingredient) => (
              <button
                key={ingredient.id}
                onClick={() => setActiveIngredient(ingredient)}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  activeIngredient.id === ingredient.id
                    ? "bg-white text-red-900 shadow-lg scale-110 z-10"
                    : "bg-red-950 text-white hover:bg-red-800"
                }`}
              >
                <div className="flex flex-col items-center">
                  {ingredient.icon}
                  <span className="text-xs mt-2 font-bold text-center font-heading">
                    {ingredient.name.split(" ")[0]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
