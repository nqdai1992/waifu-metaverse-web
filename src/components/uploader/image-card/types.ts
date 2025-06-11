import type React from "react"
import { ImageData } from "../doujinshi-uploader/types"

export interface ImageCardProps {
  image: ImageData
  onDragStart: (id: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, id: string) => void
  onDelete: (id: string) => void
}
