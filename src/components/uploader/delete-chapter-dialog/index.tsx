"use client"

import type { DeleteChapterDialogProps } from "./types"
import {
  DialogOverlay,
  DialogContainer,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  CancelButton,
  DeleteButton,
} from "./delete-chapter-dialog.styled"

const DeleteChapterDialog = ({ chapterTitle, onDelete, onCancel }: DeleteChapterDialogProps) => {
  return (
    <DialogOverlay onClick={onCancel}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Delete Chapter</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{chapterTitle}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        </DialogFooter>
      </DialogContainer>
    </DialogOverlay>
  )
}

export default DeleteChapterDialog
