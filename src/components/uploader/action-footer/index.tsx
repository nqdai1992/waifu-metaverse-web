"use client"

import type { ActionFooterProps } from "./types"
import {
  FooterContainer,
  FooterStatus,
  UnsavedChanges,
  ButtonContainer,
  CancelButton,
  SaveButton,
} from "./action-footer.styled"

const ActionFooter = ({ chapterTitle, imageCount, hasUnsavedChanges, onSave, onCancel }: ActionFooterProps) => {
  return (
    <FooterContainer>
      <FooterStatus>
        Total: {imageCount} images in {chapterTitle}
        {hasUnsavedChanges && <UnsavedChanges>• Unsaved changes</UnsavedChanges>}
      </FooterStatus>
      <ButtonContainer>
        <CancelButton onClick={onCancel}>
          <div className="h-4 w-4 mr-2 flex items-center justify-center text-2xl font-bold">×</div> Cancel
        </CancelButton>
        <SaveButton onClick={onSave} disabled={!hasUnsavedChanges}>
          <div className="h-4 w-4 mr-2 flex items-center justify-center text-xs">💾</div> Save Changes
        </SaveButton>
      </ButtonContainer>
    </FooterContainer>
  )
}

export default ActionFooter
