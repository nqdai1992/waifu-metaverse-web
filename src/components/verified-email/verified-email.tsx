"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckIcon } from "@radix-ui/react-icons"
import { Text } from "@radix-ui/themes"
import { GradientBackground } from "./styled"

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
    <GradientBackground>
      <div className="w-full max-w-100 flex flex-col items-center justify-center text-center gap-17">
        {/* Animated Circle */}
        <div className="relative w-40 h-40">
          {animationState === "loading" ? (
            <div className="w-full h-full">
              <div className="absolute inset-0 rounded-full border-10 border-transparent animate-spin-slow">
                <div className="absolute inset-0 rounded-full border-10 border-[#E11A8F] border-r-[#DCB827] animate-spin-slow"></div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-12 border-[#DCB827] animate-scale-in"></div>
              <CheckIcon className=" text-[#DCB827] w-30 h-30 z-10 animate-fade-in" />
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Text className="text-[28px] text-white">
              Great job <span className="inline-block animate-bounce">🎉</span>
            </Text>
            <Text className="text-[28px] text-white">Your email has been verified!</Text>
          </div>
          <Text className="text-base text-[#777E90]">Use it to log into Waifu Metaverse.</Text>
        </div>

        {/* Continue Button */}
        <Link
          href="/"
          className="w-full text-lg font-bold bg-[#5ecef9] hover:bg-[#DCB827] text-black py-5.5 rounded-lg transition-colors"
        >
          Continue
        </Link>
      </div>
    </GradientBackground>
  )
}

export default VerifiedEmail
