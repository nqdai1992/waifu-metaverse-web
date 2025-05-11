import { InputHTMLAttributes } from "react"

export interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
    label: string
    type?: string
    defaultValue?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeHolder?: string
}

export interface CountryCode {
  code: string
  flag: string
  name: string
  dial_code: string
}

export const countryCodes: CountryCode[] = [
  { code: "US", flag: "🇺🇸", name: "United States", dial_code: "+1" },
  { code: "GB", flag: "🇬🇧", name: "United Kingdom", dial_code: "+44" },
  { code: "CA", flag: "🇨🇦", name: "Canada", dial_code: "+1" },
  { code: "AU", flag: "🇦🇺", name: "Australia", dial_code: "+61" },
  { code: "DE", flag: "🇩🇪", name: "Germany", dial_code: "+49" },
  { code: "FR", flag: "🇫🇷", name: "France", dial_code: "+33" },
  { code: "JP", flag: "🇯🇵", name: "Japan", dial_code: "+81" },
  { code: "CN", flag: "🇨🇳", name: "China", dial_code: "+86" },
  { code: "IN", flag: "🇮🇳", name: "India", dial_code: "+91" },
]