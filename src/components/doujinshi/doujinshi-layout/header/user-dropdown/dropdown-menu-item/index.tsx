"use client"

import type { ReactNode } from "react"

interface DropdownMenuItemProps {
  icon: ReactNode
  children: ReactNode
  onClick?: () => void
  variant?: "default" | "danger"
}

export function DropdownMenuItem({ icon, children, onClick, variant = "default" }: DropdownMenuItemProps) {
  const baseClasses = "flex items-center w-full px-3 py-2 transition-colors text-left cursor-pointer"
  const variantClasses =
    variant === "danger" ? "text-red-400 hover:bg-red-900/20 hover:text-red-300" : "text-white hover:bg-gray-700"

  return (
    <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
      <span className="mr-2 h-4 w-4 flex items-center justify-center">{icon}</span>
      {children}
    </button>
  )
}
