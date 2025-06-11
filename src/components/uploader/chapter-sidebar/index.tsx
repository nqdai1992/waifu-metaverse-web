"use client"

import { useState } from "react"
import type { ChapterSidebarProps } from "./types"
import {
  SidebarContainer,
  SidebarContent,
  SidebarHeader,
  SidebarTitle,
  ChapterList,
  ScrollAreaContainer,
  AddButton,
} from "./chapter-sidebar.styled"
import AddChapterDialog from "../add-chapter-dialog"
import ChapterItem from "../chapter-item"

const ChapterSidebar = ({
  chapters,
  activeChapter,
  onChapterSelect,
  onAddChapter,
  onEditChapter,
  onDeleteChapter,
}: ChapterSidebarProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <>
      <SidebarContainer>
        <SidebarContent>
          <SidebarHeader>
            <SidebarTitle>Chapters</SidebarTitle>
            <AddButton onClick={() => setShowAddDialog(true)}>
              <div className="h-4 w-4 flex items-center justify-center text-2xl font-bold">+</div> Add
            </AddButton>
          </SidebarHeader>

          <ScrollAreaContainer>
            <ChapterList>
              {chapters.map((chapter) => (
                <ChapterItem
                  key={chapter.id}
                  chapter={chapter}
                  isActive={activeChapter === chapter.id}
                  onClick={onChapterSelect}
                  onEdit={(id) => onEditChapter(id, chapter.title)}
                  onDelete={onDeleteChapter}
                />
              ))}
            </ChapterList>
          </ScrollAreaContainer>
        </SidebarContent>
      </SidebarContainer>

      {showAddDialog && <AddChapterDialog onAdd={onAddChapter} onCancel={() => setShowAddDialog(false)} />}
    </>
  )
}

export default ChapterSidebar
