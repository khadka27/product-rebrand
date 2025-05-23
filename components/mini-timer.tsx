"use client"

import { useState, useEffect } from "react"

interface MiniTimerProps {
  minutes: number
  seconds: number
  className?: string
}

export default function MiniTimer({ minutes = 10, seconds = 0, className = "" }: MiniTimerProps) {
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
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="text-white bg-[#8A1C1C]/80 px-3 py-1 rounded-md font-mono font-bold">
        {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
      </div>
      <span className="text-sm font-medium">Time remaining for this offer</span>
    </div>
  )
}
