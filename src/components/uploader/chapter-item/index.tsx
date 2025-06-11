"use client"

import type React from "react"

import { useState } from "react"
import type { ChapterItemProps } from "./types"
import {
  ChapterContainer,
  ChapterContent,
  ChapterTitle,
  ChapterActions,
  ActionButton,
  DeleteButton,
  ChapterImageCount,
  EditInput,
} from "./chapter-item.styled"
import DeleteChapterDialog from "../delete-chapter-dialog"

const ChapterItem = ({ chapter, isActive, onClick, onEdit, onDelete }: ChapterItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(chapter.title)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleEditStart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
    setEditTitle(chapter.title)
  }

  const handleEditSave = () => {
    if (editTitle.trim()) {
      onEdit(chapter.id)
      setIsEditing(false)
    }
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    onDelete(chapter.id)
    setShowDeleteDialog(false)
  }

  return (
    <>
      <ChapterContainer $isActive={isActive} onClick={() => onClick(chapter.id)}>
        <ChapterContent>
          {isEditing ? (
            <EditInput
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={() => {
                onEdit(chapter.id)
                setIsEditing(false)
              }}
              onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
              autoFocus
            />
          ) : (
            <ChapterTitle>{chapter.title}</ChapterTitle>
          )}
          <ChapterActions>
            <ActionButton onClick={handleEditStart}>
              <div className="h-4 w-4 flex items-center justify-center text-xs">✏</div>
            </ActionButton>
            <DeleteButton onClick={handleDeleteClick}>
              <div className="h-4 w-4 flex items-center justify-center text-xs">🗑</div>
            </DeleteButton>
          </ChapterActions>
        </ChapterContent>
        <ChapterImageCount>{chapter.images.length} images</ChapterImageCount>
      </ChapterContainer>

      {showDeleteDialog && (
        <DeleteChapterDialog
          chapterTitle={chapter.title}
          onDelete={handleDeleteConfirm}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
    </>
  )
}

export default ChapterItem
