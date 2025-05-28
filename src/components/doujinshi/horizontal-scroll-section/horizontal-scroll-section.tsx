"use client"

import { useState } from "react"
import DoujinshiCard, { IDoujinshiDetail } from "../doujinshi-card/doujinshi-card"
import NavigationButtons from "../navigation-button/navigation-button"
import DoujinshiSmallCard from "../doujinshi-small-card/doujinshi-small-card"

interface HorizontalScrollSectionProps {
  title: string
  items: IDoujinshiDetail[]
  itemsPerView?: number
  likedItems: Record<number, boolean>
  onToggleLike: (itemId: number) => void
  onItemClick?: (item: IDoujinshiDetail) => void
  showViewAll?: boolean
  onViewAll?: () => void
  className?: string
  cardSize?: "normal" | "small"
}

const HorizontalScrollSection = ({
  title,
  items,
  itemsPerView = 5,
  likedItems,
  onToggleLike,
  onItemClick,
  showViewAll = false,
  onViewAll,
  className = "",
  cardSize = "normal",
}: HorizontalScrollSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = Math.max(0, items.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const translateX = currentIndex * (227 + 16)

  const isSmallCard = cardSize === "small"

  return (
    <div className={`${isSmallCard ? 'flex flex-col gap-5.5' : 'bg-[#23262F] rounded-lg px-5 pt-7.5 pb-5 flex flex-col gap-12.5'} relative ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className={`text-white ${isSmallCard ? 'text-[1.375rem]' : 'text-[1.75rem]'} font-bold`}>{title}</h2>
        {showViewAll && (
          <button onClick={onViewAll} className="text-[#777E90] hover:text-white text-sm transition-colors">
            View All
          </button>
        )}
      </div>

      {/* Navigation Buttons */}
      <NavigationButtons
        onPrevious={prevSlide}
        onNext={nextSlide}
        canGoPrevious={currentIndex > 0}
        canGoNext={currentIndex < maxIndex}
      />

      {/* Cards Container */}
      <div className="overflow-hidden w-full">
        <div
          className={`flex transition-transform duration-300 ease-in-out ${isSmallCard ? 'gap-1.5' : 'gap-2'}`}
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {items.map((item) =>
            cardSize === "small" ? (
              <DoujinshiSmallCard
                key={item.id}
                item={item}
                onClick={onItemClick}
              />
            ) : (
              <DoujinshiCard
                key={item.id}
                item={item}
                isLiked={likedItems[item.id] || false}
                onToggleLike={onToggleLike}
                onClick={onItemClick}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default HorizontalScrollSection
