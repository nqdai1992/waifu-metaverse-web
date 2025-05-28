"use client"

import type React from "react"

import Image from "next/image"

export interface IDoujinshiDetail {
  id: number
  title: string
  thumbnail: string
  liked: boolean
  pageTotal?: number
  pages: string[]
}

interface DoujinshiCardProps {
  item: IDoujinshiDetail
  isLiked: boolean
  onToggleLike: (itemId: number) => void
  onClick?: (item: IDoujinshiDetail) => void
  className?: string
  style?: React.CSSProperties
}

export default function DoujinshiCard({ item, isLiked, onToggleLike, onClick, className = "", style }: DoujinshiCardProps) {
  return (
    <div
      className={`group cursor-pointer flex-shrink-0 ${className}`}
      style={{ width: "227px", height: "384px", ...style }}
      onClick={() => onClick?.(item)}
    >
      <div className="relative rounded-lg overflow-hidden hover:opacity-90 transition-opacity w-full h-full">
        {/* Thumbnail Image */}
        <div className="relative w-full h-[320px] overflow-hidden">
          <Image
            src={item.thumbnail || "/placeholder.svg?height=280&width=227"}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Total Page Count */}
          {
            item.pageTotal && <div
              className="absolute rounded-full flex items-center text-white text-xs font-medium"
              style={{
                width: "48px",
                height: "34px",
                top: "12px",
                left: "166.75px",
                padding: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(4px)",
                gap: "6px",
              }}
            >
              <Image src="/page-icon.svg" alt="Pages" width={12} height={12} className="flex-shrink-0" />
              <span className="text-xs">{item.pageTotal}</span>
            </div>
          }

          {/* Like Button - positioned on the image */}
          <button
            className="absolute rounded-full transition-all duration-200 hover:scale-110"
            style={{
              width: "38px",
              height: "38px",
              bottom: "10px",
              right: "12px",
              padding: "10px",
              backgroundColor: "rgba(6, 10, 19, 0.1)",
              backdropFilter: "blur(4px)",
              border: "none",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation()
              onToggleLike(item.id)
            }}
          >
            <Image
              src={isLiked ? "/heart-fill.svg" : "/heart.svg"}
              alt={isLiked ? "Unlike" : "Like"}
              width={18}
              height={18}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </button>
        </div>

        {/* Title Section with dark background */}
        <div className="p-2 h-[64px] flex items-center" style={{ backgroundColor: "#060A13" }}>
          <h3 className="text-white text-sm font-medium line-clamp-2 leading-tight overflow-hidden">{item.title}</h3>
        </div>
      </div>
    </div>
  )
}
