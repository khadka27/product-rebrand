import React from "react"
import { cn } from "@/lib/utils"

interface ShineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  enhanced?: boolean
}

const ShineButton = React.forwardRef<HTMLButtonElement, ShineButtonProps>(
  ({ children, className, enhanced = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "shine-button relative overflow-hidden font-bold transition-all font-heading",
          enhanced ? "enhanced-shine-button" : "",
          className,
        )}
        {...props}
      >
        {enhanced && <div className="glare-effect"></div>}
        {children}
      </button>
    )
  },
)

ShineButton.displayName = "ShineButton"

export default ShineButton
