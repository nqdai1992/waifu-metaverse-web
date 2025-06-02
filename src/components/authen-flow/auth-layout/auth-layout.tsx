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
        <div className="min-h-screen bg-[#050a14] flex items-center justify-center">
            <div className="w-full max-w-7xl bg-[#050a14] rounded-3xl overflow-hidden flex justify-center md:gap-10 xl:gap-17.5">
                {/* Left side - Image */}
                <div className="hidden lg:flex w-1/2 lg:min-w-[669px] min-h-[864px] items-center justify-center rounded-3xl overflow-hidden">
                    <Image
                        src={imageSrc || "/placeholder.svg"}
                        alt={imageAlt}
                        width={669}
                        height={864}
                        className="object-cover h-full w-full"
                        priority
                    />
                </div>

                {/* Right side - Content */}
                <div className="w-full lg:w-1/2 p-8 lg:p-0 flex flex-col justify-center gap-11">
                    {/* Logo */}
                    <div className="flex justify-center lg:justify-start">
                        <Image
                            src={logoSrc || "/placeholder.svg"}
                            alt={logoAlt}
                            width={107}
                            height={51}
                            className="object-cover w-auto h-auto"
                        />
                    </div>

                    <div className=" mx-auto md:mx-0 w-full flex flex-col gap-11">{children}</div>
                </div>
            </div>
        </div>
    )
}


export default AuthLayout
