"use client"

import RoundIconButton from "@/components/doujinshi/round-icon-button/round-icon-button"
import { CaretDownIcon, ExitIcon, UploadIcon, PersonIcon, CaretUpIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { DropdownMenuItem } from "./dropdown-menu-item"
import { useRouter } from "next/navigation"

export function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleMenuItemClick = (action: string) => {
        console.log(`${action} clicked`)
        setIsOpen(false)

        // Add your navigation/action logic here
        switch (action) {
            case "User Profile":
                // Navigate to profile page
                router.push(`/profile/edit`)
                break
            case "Upload Image":
                // Open upload modal
                router.push(`/profile/uploader`)
                break
            case "Logout":
                // Handle logout
                break
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <RoundIconButton
                    aria-label="avata"
                    className="!p-0 items-center cursor-pointer"
                >
                    <Image
                        src={"/mock/mock-header-avatar.svg"}
                        alt={'logo'}
                        width={54}
                        height={54}
                        className="object-cover h-full w-full"
                        priority
                    />
                </RoundIconButton>
                {
                    isOpen ? <CaretUpIcon className="w-6 h-6" /> : <CaretDownIcon className="w-6 h-6" />
                }
            </div>

            {isOpen && (
                <div className="absolute right-0 top-full mt-6 min-w-[12rem] bg-gray-800 border border-gray-700 rounded-md py-1 shadow-lg z-50">
                    <DropdownMenuItem icon={<PersonIcon className="w-6 h-6" />} onClick={() => handleMenuItemClick("User Profile")}>
                        User Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem icon={<UploadIcon className="w-6 h-6" />} onClick={() => handleMenuItemClick("Upload Image")}>
                        Upload Image
                    </DropdownMenuItem>

                    <div className="h-px bg-gray-700 my-1"></div>

                    <DropdownMenuItem icon={<ExitIcon className="w-6 h-6" />} onClick={() => handleMenuItemClick("Logout")} variant="danger">
                        Logout
                    </DropdownMenuItem>
                </div>
            )}
        </div>
    )
}
