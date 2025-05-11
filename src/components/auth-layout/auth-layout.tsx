'use client'
import type React from "react"
import Image from "next/image"

interface AuthLayoutProps {
    imageSrc: string
    imageAlt: string
    logoSrc: string
    logoAlt: string
    children: React.ReactNode
}


const AuthLayout = ({ imageSrc, imageAlt, logoSrc, logoAlt, children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen bg-[#050a14] flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-[#050a14] rounded-3xl overflow-hidden flex">
                {/* Left side - Image */}
                <div className="hidden md:block w-1/2 min-h-[864px] relative rounded-3xl overflow-hidden">
                    <Image
                        src={imageSrc || "/placeholder.svg"}
                        alt={imageAlt}
                        width={669}
                        height={864}
                        className="object-cover w-full h-full"
                        priority
                    />
                </div>

                {/* Right side - Content */}
                <div className="w-full md:w-1/2 p-8 md:pl-12 flex flex-col justify-center gap-11">
                    {/* Logo */}
                    <div className="flex justify-center md:justify-start">
                        <Image
                            src={logoSrc || "/placeholder.svg"}
                            alt={logoAlt}
                            width={107}
                            height={51} 
                            className="h-10 w-auto" />
                    </div>

                    <div className="max-w-md mx-auto md:mx-0 w-full flex flex-col gap-11">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
