"use client"

import { useState } from "react"
import type { AddChapterDialogProps } from "./types"
import {
  DialogOverlay,
  DialogContainer,
  DialogHeader,
  DialogTitle,
  DialogForm,
  DialogInput,
  DialogActions,
  CancelButton,
  AddButton,
} from "./add-chapter-dialog.styled"

const AddChapterDialog = ({ onAdd, onCancel }: AddChapterDialogProps) => {
  const [newChapterTitle, setNewChapterTitle] = useState("")

  const handleAddChapter = () => {
    if (newChapterTitle.trim()) {
      onAdd(newChapterTitle.trim())
      setNewChapterTitle("")
      onCancel()
    }
  }

  return (
    <DialogOverlay onClick={onCancel}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Add New Chapter</DialogTitle>
        </DialogHeader>
        <DialogForm>
          <DialogInput
            placeholder="Chapter title"
            value={newChapterTitle}
            onChange={(e) => setNewChapterTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddChapter()}
            autoFocus
          />
          <DialogActions>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
            <AddButton onClick={handleAddChapter}>Add Chapter</AddButton>
          </DialogActions>
        </DialogForm>
      </DialogContainer>
    </DialogOverlay>
  )
}

export default AddChapterDialog
