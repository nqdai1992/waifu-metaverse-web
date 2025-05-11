/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { ChevronDownIcon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons"
import { useRef, useState } from "react"
import { CountryCode, countryCodes, FormInputProps } from "./type"
import { DropdownMenu } from "radix-ui"


export default function FormInput({ label, type = "text", defaultValue, value, onChange, placeHolder, ...props }: FormInputProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)
    const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0])
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(value)
    const [formattedNumber, setFormattedNumber] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)

    // Format phone number as user types
    const formatPhoneNumber = (value: string) => {
        // Remove all non-digit characters
        const digits = value.replace(/\D/g, "")

        // Format based on US phone number pattern (can be extended for other countries)
        if (digits.length <= 3) {
            return digits
        } else if (digits.length <= 6) {
            return `${digits.slice(0, 3)}-${digits.slice(3)}`
        } else {
            return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`
        }
    }

    // Handle phone number change
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const formatted = formatPhoneNumber(input)
        setPhoneNumber(input.replace(/\D/g, ""))
        setFormattedNumber(formatted)

        if (onChange) {
            // onChange(input.replace(/\D/g, ""), selectedCountry.dial_code)
        }
    }

    // Handle country selection
    const handleCountrySelect = (country: CountryCode) => {
        setSelectedCountry(country)
        if (onChange) {
            // onChange(phoneNumber, country.dial_code)
        }
        // Focus the input after selecting a country
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    // Handle password visibility toggle
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
        setInputType(showPassword ? "password" : "text")
    }

    // Only show the eye icon for password fields
    const isPassword = type === "password"

    const isPhone = type === "phone"


    return (
        <div className="relative">
            <div className="w-full bg-[#0c0c10] border border-[#2a2a2a] rounded-2xl px-5 py-4 text-white">
                <div className="text-[#8a8a8a] text-base font-normal mb-1">{label}</div>
                <div className="flex">
                    {
                        isPhone && <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button
                                    className="flex items-center space-x-1 mr-2 p-1 hover:bg-[#1a1a1a] rounded transition-colors"
                                    aria-label="Select country code"
                                >
                                    <span className="text-xl">{selectedCountry.flag}</span>
                                    <ChevronDownIcon className="h-4 w-4 text-[#8a8a8a]" />
                                </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                    className="bg-[#1a1a1a] border border-[#333] rounded-lg p-1 shadow-lg z-50 max-h-60 overflow-y-auto"
                                    sideOffset={5}
                                >
                                    {countryCodes.map((country) => (
                                        <DropdownMenu.Item
                                            key={country.code}
                                            className="flex items-center space-x-2 p-2 hover:bg-[#333] rounded cursor-pointer text-white"
                                            onClick={() => handleCountrySelect(country)}
                                        >
                                            <span className="text-xl">{country.flag}</span>
                                            <span>{country.name}</span>
                                            <span className="text-[#8a8a8a]">{country.dial_code}</span>
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    }
                    <input
                        type={isPassword ? inputType : type}
                        className="w-full bg-transparent border-none p-0 text-white text-base focus:outline-none placeholder:text-[#3a3a3a]"
                        defaultValue={defaultValue}
                        value={isPhone ? formattedNumber : value}
                        onChange={isPhone ? handlePhoneChange : onChange}
                        placeholder={placeHolder}
                        {...props}
                    />
                </div>
            </div>
            {isPassword && (
                <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white opacity-80 hover:opacity-100 p-2 rounded-full hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeClosedIcon className="w-5 h-5" /> : <EyeOpenIcon className="w-5 h-5" />}
                </button>
            )}
        </div>
    )
}
