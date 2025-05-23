import { CheckCircle } from "lucide-react"

interface BenefitProps {
  title: string
  description: string
}

const Benefits: BenefitProps[] = [
  {
    title: "Liver Detoxification",
    description:
      "Cleanses and rejuvenates your liver, removing harmful toxins that slow down metabolism and impair fat burning.",
  },
  {
    title: "Metabolic Enhancement",
    description:
      "Activates your body's natural fat-burning mechanisms for more efficient calorie burning throughout the day.",
  },
  {
    title: "Appetite Regulation",
    description: "Helps control cravings and reduces hunger, making it easier to maintain a healthy caloric intake.",
  },
  {
    title: "Energy Amplification",
    description:
      "Boosts natural energy levels without stimulants, helping you stay active and motivated throughout the day.",
  },
  {
    title: "All-Natural Formula",
    description: "Made with 100% natural ingredients with no artificial additives, fillers, or harmful chemicals.",
  },
  {
    title: "Rapid Results",
    description: "Delivers noticeable improvements within weeks, with optimal results seen after consistent use.",
  },
]

export default function BenefitsShowcase() {
  return (
    <div className="w-full bg-white py-10 md:py-16 px-3 md:px-4 rounded-2xl shadow-xl border border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-8 md:mb-12">
          <div className="h-px bg-red-500 w-12 md:w-32 hidden sm:block"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-red-900 px-3 sm:px-6 font-heading">
            The HepatoBurn Revolution
          </h2>
          <div className="h-px bg-red-500 w-12 md:w-32 hidden sm:block"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {Benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-red-50 p-4 sm:p-6 md:p-8 rounded-xl border border-red-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-800" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-red-900 mb-2 font-heading">{benefit.title}</h3>
                  <p className="text-black text-sm sm:text-base md:text-lg font-body">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
