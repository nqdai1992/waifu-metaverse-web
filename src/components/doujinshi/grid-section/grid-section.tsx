"use client"

import DoujinshiCard, { IDoujinshiDetail } from "../doujinshi-card/doujinshi-card"


interface GridSectionProps {
  title: string
  items: IDoujinshiDetail[]
  columns?: number
  likedItems: Record<number, boolean>
  onToggleLike: (itemId: number) => void
  onItemClick?: (item: IDoujinshiDetail) => void
  className?: string
}

const GridSection = ({
  title,
  items,
  columns = 5,
  likedItems,
  onToggleLike,
  onItemClick,
  className = "",
}: GridSectionProps) => {

  return (
    <div className={`bg-[#23262F] rounded-lg px-5 pt-7.5 pb-5 flex flex-col gap-12.5 ${className}`}>
      {/* Header */}
      <h2 className="text-white text-[1.75rem] font-bold">{title}</h2>

      {/* Content */}
      <div
        className="grid gap-2 justify-center w-full"
        style={{
          gridTemplateColumns: `repeat(${columns}, 227px)`,
        }}
      >
        {items.map((item) => (
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
  )
}

export default GridSection
