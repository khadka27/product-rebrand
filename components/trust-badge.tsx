import Image from "next/image"

interface TrustBadgeProps {
  imageSrc: string
  title: string
}

export default function TrustBadge({ imageSrc, title }: TrustBadgeProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-3">
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            width={160}
            height={160}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <h3 className="font-bold text-red-900 text-center font-heading text-xl">{title}</h3>
    </div>
  )
}
