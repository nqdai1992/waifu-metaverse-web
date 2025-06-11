import { Chapter } from "../doujinshi-uploader/types"

export interface ChapterItemProps {
  chapter: Chapter
  isActive: boolean
  onClick: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}
