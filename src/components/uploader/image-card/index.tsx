"use client"

import type { ImageCardProps } from "./types"
import { CardContainer, CardImage, CardOverlay, CardPageNumber, DeleteButton } from "./image-card.styled"

const ImageCard = ({ image, onDragStart, onDragOver, onDrop, onDelete }: ImageCardProps) => {
  return (
    <CardContainer
      draggable
      onDragStart={() => onDragStart(image.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, image.id)}
    >
      <CardImage src={image.url || "/placeholder.svg"} alt={image.name} />
      <CardOverlay>
        <div className="h-6 w-6 text-white flex items-center justify-center text-lg">⋮⋮</div>
      </CardOverlay>
      <CardPageNumber>{String(image.order).padStart(3, "0")}</CardPageNumber>
      <DeleteButton
        onClick={(e) => {
          e.stopPropagation()
          onDelete(image.id)
        }}
      >
        <div className="h-4 w-4 text-white flex items-center justify-center text-xs font-bold">×</div>
      </DeleteButton>
    </CardContainer>
  )
}

export default ImageCard
