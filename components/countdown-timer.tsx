"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  className?: string
}

export default function CountdownTimer({ className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set end date to 3 days from now
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 3)
    endDate.setHours(23, 59, 59, 999)

    const calculateTimeLeft = () => {
      const difference = +endDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Reset to a new date if expired
        endDate.setDate(endDate.getDate() + 3)
      }
    }

    // Initial calculation
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`${className}`}>
      <h3 className="text-xl md:text-2xl font-bold mb-3 font-heading">LIMITED TIME OFFER ENDS IN:</h3>
      <div className="flex justify-center gap-2 md:gap-4">
        <div className="flex flex-col items-center">
          <div className="bg-green-800/80 text-white text-2xl md:text-3xl font-bold rounded-lg w-16 md:w-20 h-16 md:h-20 flex items-center justify-center">
            {String(timeLeft.days).padStart(2, "0")}
          </div>
          <span className="text-sm mt-1 font-body">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-green-800/80 text-white text-2xl md:text-3xl font-bold rounded-lg w-16 md:w-20 h-16 md:h-20 flex items-center justify-center">
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <span className="text-sm mt-1 font-body">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-green-800/80 text-white text-2xl md:text-3xl font-bold rounded-lg w-16 md:w-20 h-16 md:h-20 flex items-center justify-center">
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <span className="text-sm mt-1 font-body">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-green-800/80 text-white text-2xl md:text-3xl font-bold rounded-lg w-16 md:w-20 h-16 md:h-20 flex items-center justify-center">
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <span className="text-sm mt-1 font-body">Seconds</span>
        </div>
      </div>
    </div>
  )
}
