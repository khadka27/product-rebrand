"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CreativeCountdownProps {
  minutes: number
  seconds: number
  className?: string
}

export default function CreativeCountdown({ minutes = 10, seconds = 0, className = "" }: CreativeCountdownProps) {
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

  // Calculate percentage for progress bar
  const totalSeconds = minutes * 60 + seconds
  const currentSeconds = timeLeft.minutes * 60 + timeLeft.seconds
  const percentageLeft = (currentSeconds / totalSeconds) * 100

  return (
    <div className={`${className}`}>
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg sm:rounded-xl shadow-lg">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 h-1 bg-white bg-opacity-50" style={{ width: `${percentageLeft}%` }}></div>

        <div className="p-2 sm:p-3 md:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Pulsing dot */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="w-2 h-2 sm:w-3 sm:h-3 bg-green-800 rounded-full"
            ></motion.div>
            <span className="font-bold text-green-900 uppercase tracking-wider text-xs sm:text-sm md:text-base">
              Limited Time Offer
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Minutes */}
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-md sm:rounded-lg px-2 sm:px-3 py-1 border border-white border-opacity-30">
              <span className="font-mono font-bold text-sm sm:text-lg md:text-xl lg:text-2xl text-green-900">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
            </div>
            <span className="font-bold text-green-900 text-sm sm:text-lg md:text-xl">:</span>
            {/* Seconds */}
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-md sm:rounded-lg px-2 sm:px-3 py-1 border border-white border-opacity-30">
              <span className="font-mono font-bold text-sm sm:text-lg md:text-xl lg:text-2xl text-green-900">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="bg-black bg-opacity-20 py-1 px-2 sm:px-4 text-center">
          <span className="text-[10px] sm:text-xs font-medium text-green-900">
            Offer expires when timer ends - Act now!
          </span>
        </div>
      </div>
    </div>
  )
}
