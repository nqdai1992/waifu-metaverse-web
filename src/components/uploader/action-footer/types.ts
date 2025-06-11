export interface ActionFooterProps {
  chapterTitle: string
  imageCount: number
  hasUnsavedChanges: boolean
  onSave: () => void
  onCancel: () => void
}
