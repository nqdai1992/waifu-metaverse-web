"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckIcon } from "@radix-ui/react-icons"

const VerifiedEmail = () => {
  const [animationState, setAnimationState] = useState<"loading" | "success">("loading")

  useEffect(() => {
    // Simulate verification process
    const timer = setTimeout(() => {
      setAnimationState("success")
    }, 1000)

    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#141416] via-[#060A13] to-[#E11A8F]">
      <div className="w-full max-w-md flex flex-col items-center justify-center text-center">
        {/* Animated Circle */}
        <div className="relative w-24 h-24 mb-8">
          {animationState === "loading" ? (
            <div className="w-full h-full">
              <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin-slow">
                <div className="absolute inset-0 rounded-full border-4 border-[#ff3399] border-r-[#ffcc00] animate-spin-slow"></div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#ffcc00] animate-scale-in"></div>
              <CheckIcon className="text-[#ffcc00] w-10 h-10 z-10 animate-fade-in" />
            </div>
          )}
        </div>

        {/* Text Content */}
        <h1 className="text-2xl font-bold text-white mb-2">
          Great job <span className="inline-block animate-bounce">🎉</span>
        </h1>
        <p className="text-xl text-white mb-2">Your email has been verified!</p>
        <p className="text-gray-400 mb-8">Use it to log into Waifu Metaverse.</p>

        {/* Continue Button */}
        <Link
          href="/"
          className="w-full bg-[#5ecef9] hover:bg-[#4bb8e8] text-black font-medium py-4 rounded-md transition-colors"
        >
          Continue
        </Link>
      </div>
    </div>
  )
}

export default VerifiedEmail
