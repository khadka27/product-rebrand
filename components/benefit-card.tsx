import type { ReactNode } from "react"

interface BenefitCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="bg-red-800 p-4 sm:p-5 md:p-6 rounded-lg text-center hover:bg-red-700 transition-colors">
      <div className="flex justify-center mb-3 md:mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3 font-heading">{title}</h3>
      <p className="font-body text-sm sm:text-base">{description}</p>
    </div>
  )
}
