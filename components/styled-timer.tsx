"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface StyledTimerProps {
  minutes: number
  seconds: number
  className?: string
}

export default function StyledTimer({ minutes = 10, seconds = 0, className = "" }: StyledTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    minutes,
    seconds,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        // Reset to original time when it reaches zero
        setTimeLeft({ minutes, seconds })
        return
      }

      let newMinutes = timeLeft.minutes
      let newSeconds = timeLeft.seconds - 1

      if (newSeconds < 0) {
        newMinutes = newMinutes - 1
        newSeconds = 59
      }

      setTimeLeft({
        minutes: newMinutes,
        seconds: newSeconds,
      })
    }

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, minutes, seconds])

  return (
    <div className={`${className}`}>
      <div className="bg-gradient-to-r from-[#8A1C1C] to-[#8A1C1C]/80 rounded-lg p-3 shadow-lg border border-[#8A1C1C]/50">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-500 rounded-full p-2 flex-shrink-0">
            <Clock className="h-5 w-5 text-[#8A1C1C]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider opacity-90">Limited Time Offer</span>
            <div className="flex items-center gap-1 font-mono font-bold text-lg">
              <div className="bg-black bg-opacity-30 px-2 py-1 rounded">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <span>:</span>
              <div className="bg-black bg-opacity-30 px-2 py-1 rounded">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <span className="text-xs ml-1 font-normal opacity-80">remaining</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
