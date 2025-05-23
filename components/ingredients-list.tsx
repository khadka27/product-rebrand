import Image from "next/image"

interface Ingredient {
  name: string
  description: string
  imageSrc: string
}

const ingredients: Ingredient[] = [
  {
    name: "Milk Thistle Extract",
    description:
      "A powerful herb for liver protection. Contains silymarin that helps regenerate liver cells and reduce inflammation.",
    imageSrc: "/milk-thistle-extract.png",
  },
  {
    name: "Dandelion Root",
    description:
      "A traditional herb used for centuries to support liver health. Acts as a natural diuretic that helps reduce water retention, rich in antioxidants that protect liver cells, and supports healthy bile production.",
    imageSrc: "/dandelion-root.png",
  },
  {
    name: "Artichoke Leaf Extract",
    description:
      "Mediterranean herb that supports liver function and digestion. Stimulates bile production, helps lower cholesterol levels, and supports fat metabolism through its active compounds cynarin and silymarin.",
    imageSrc: "/artichoke-leaf.png",
  },
  {
    name: "Berberine",
    description:
      "A powerful plant compound with significant metabolic benefits. Activates AMPK, the metabolic master switch, helps regulate blood sugar levels, and supports healthy cholesterol levels while promoting healthy gut bacteria.",
    imageSrc: "/berberine.png",
  },
  {
    name: "Turmeric Extract",
    description:
      "Ancient spice with potent anti-inflammatory properties. Contains curcumin, a powerful antioxidant that reduces inflammation throughout the body, supports liver detoxification pathways, and enhances bile production.",
    imageSrc: "/turmeric-root-powder.png",
  },
  {
    name: "Choline",
    description:
      "Essential nutrient that supports liver health and fat metabolism. Prevents fat accumulation in the liver, supports cellular membrane integrity, and helps transport fats from the liver for improved metabolic function.",
    imageSrc: "/choline-supplement.png",
  },
  {
    name: "Ginger Root Extract",
    description:
      "Traditional herb with powerful anti-inflammatory and antioxidant effects. Supports digestion, reduces inflammation, and helps improve metabolism while providing natural support for detoxification processes.",
    imageSrc: "/ginger-root-extract.png",
  },
  {
    name: "Green Tea Extract",
    description:
      "Rich in catechins and antioxidants that support liver health and metabolism. Helps increase fat burning, improves insulin sensitivity, and provides protective effects for liver cells against oxidative damage.",
    imageSrc: "/green-tea-extract.png",
  },
  {
    name: "N-Acetyl Cysteine",
    description:
      "Powerful amino acid derivative that replenishes glutathione, the body's master antioxidant. Supports liver detoxification pathways, protects against oxidative stress, and helps remove toxins from the body.",
    imageSrc: "/n-acetyl-cysteine.png",
  },
  {
    name: "Alpha Lipoic Acid",
    description:
      "Universal antioxidant that works in both water and fat-soluble environments. Regenerates other antioxidants, supports energy production in cells, and helps improve insulin sensitivity for better metabolic function.",
    imageSrc: "/alpha-lipoic-acid.png",
  },
]

export default function IngredientsList() {
  return (
    <div className="w-full mx-auto">
      <div className="flex items-center justify-center mb-8 md:mb-12">
        <div className="h-px bg-gray-300 w-12 md:w-24 hidden sm:block"></div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-red-900 px-3 sm:px-6 font-heading">
          Key Ingredients
        </h2>
        <div className="h-px bg-gray-300 w-12 md:w-24 hidden sm:block"></div>
      </div>

      <div className="space-y-4 md:space-y-6">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-white flex items-center justify-center">
                  <Image
                    src={ingredient.imageSrc || "/placeholder.svg"}
                    alt={ingredient.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-red-800 mb-1 sm:mb-2 font-heading text-center sm:text-left">
                  {ingredient.name}
                </h3>
                {/* Increased font size for ingredient descriptions */}
                <p className="text-gray-700 font-body text-base sm:text-lg md:text-xl text-center sm:text-left">
                  {ingredient.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
