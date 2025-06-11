"use client"

import type React from "react"

import { useState } from "react"
import type { ImageGridProps } from "./types"
import { GridContainer } from "./image-grid.styled"
import ImageCard from "../image-card"

const ImageGrid = ({ images, onImageMove, onImageDelete }: ImageGridProps) => {
  const [draggedImage, setDraggedImage] = useState<string | null>(null)

  const handleDragStart = (imageId: string) => {
    setDraggedImage(imageId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetImageId: string) => {
    e.preventDefault()
    if (draggedImage && draggedImage !== targetImageId) {
      onImageMove(draggedImage, targetImageId)
    }
    setDraggedImage(null)
  }

  return (
    <GridContainer>
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDelete={onImageDelete}
        />
      ))}
    </GridContainer>
  )
}

export default ImageGrid
