import { Chapter } from "../doujinshi-uploader/types"

export interface ChapterSidebarProps {
  chapters: Chapter[]
  activeChapter: number
  onChapterSelect: (id: number) => void
  onAddChapter: (title: string) => void
  onEditChapter: (id: number, title: string) => void
  onDeleteChapter: (id: number) => void
}
