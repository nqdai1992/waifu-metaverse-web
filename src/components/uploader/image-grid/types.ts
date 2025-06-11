import { ImageData } from "../doujinshi-uploader/types"

export interface ImageGridProps {
  images: ImageData[]
  onImageMove: (draggedId: string, targetId: string) => void
  onImageDelete: (id: string) => void
}
