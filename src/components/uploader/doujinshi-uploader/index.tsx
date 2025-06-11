"use client"

import { initialChapters } from "@/mock-data/uploader-data"
import { useState } from "react"
import ActionFooter from "../action-footer"
import ChapterSidebar from "../chapter-sidebar"
import ImageGrid from "../image-grid"
import ImageUploader from "../image-uploader"
import {
  ActionButton,
  ContentHeader,
  ContentTitle,
  ContentWrapper,
  HeaderActions,
  MainContent,
  MainContentWrapper,
  MainLayout,
  PageDescription,
  PageHeader,
  PageTitle
} from "./doujinshi-uploader.styled"
import type { Chapter, DoujinshiUploaderProps, ImageData } from "./types"

const DoujinshiUploader = ({}: DoujinshiUploaderProps) => {
  const [activeChapter, setActiveChapter] = useState<number>(1)
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const currentChapter = chapters.find((c) => c.id === activeChapter)
  const sortedImages = currentChapter?.images.sort((a, b) => a.order - b.order) || []

  // Chapter operations
  const handleAddChapter = (title: string) => {
    const newId = Math.max(...chapters.map((c) => c.id)) + 1
    const newChapter: Chapter = {
      id: newId,
      title: title,
      images: [],
    }
    setChapters([...chapters, newChapter])
    setHasUnsavedChanges(true)
  }

  const handleEditChapter = (chapterId: number, title: string) => {
    setChapters(chapters.map((c) => (c.id === chapterId ? { ...c, title } : c)))
    setHasUnsavedChanges(true)
  }

  const handleDeleteChapter = (chapterId: number) => {
    setChapters(chapters.filter((c) => c.id !== chapterId))
    if (activeChapter === chapterId && chapters.length > 1) {
      const remainingChapters = chapters.filter((c) => c.id !== chapterId)
      setActiveChapter(remainingChapters[0].id)
    }
    setHasUnsavedChanges(true)
  }

  // Image operations
  const handleUploadImages = (files: File[]) => {
    if (currentChapter) {
      const newImages: ImageData[] = files.map((file, index) => ({
        id: `${activeChapter}-${Date.now()}-${index}`,
        name: file.name,
        url: URL.createObjectURL(file),
        order: currentChapter.images.length + index + 1,
      }))

      setChapters(chapters.map((c) => (c.id === activeChapter ? { ...c, images: [...c.images, ...newImages] } : c)))
      setHasUnsavedChanges(true)
    }
  }

  const openFileDialog = () => {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.multiple = true
    fileInput.accept = "image/*"

    fileInput.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files && files.length > 0) {
        handleUploadImages(Array.from(files))
      }
    }

    fileInput.click()
  }

  const handleImageMove = (draggedId: string, targetId: string) => {
    if (currentChapter) {
      const draggedImg = currentChapter.images.find((img) => img.id === draggedId)
      const targetImg = currentChapter.images.find((img) => img.id === targetId)

      if (draggedImg && targetImg) {
        const newImages = [...currentChapter.images]
        const draggedIndex = newImages.findIndex((img) => img.id === draggedId)
        const targetIndex = newImages.findIndex((img) => img.id === targetId)

        // Swap the images
        newImages[draggedIndex] = { ...draggedImg, order: targetImg.order }
        newImages[targetIndex] = { ...targetImg, order: draggedImg.order }

        setChapters(chapters.map((c) => (c.id === activeChapter ? { ...c, images: newImages } : c)))
        setHasUnsavedChanges(true)
      }
    }
  }

  const handleDeleteImage = (imageId: string) => {
    if (currentChapter) {
      const updatedImages = currentChapter.images.filter((img) => img.id !== imageId)
      setChapters(chapters.map((c) => (c.id === activeChapter ? { ...c, images: updatedImages } : c)))
      setHasUnsavedChanges(true)
    }
  }

  // Save/Cancel operations
  const handleSaveChanges = () => {
    setHasUnsavedChanges(false)
    // Here you would typically save to a backend
    alert("Changes saved successfully!")
  }

  const handleCancel = () => {
    setChapters(initialChapters)
    setHasUnsavedChanges(false)
    setActiveChapter(1)
  }

  return (
    <ContentWrapper>
      <div className="max-w-7xl mx-auto">
        <PageHeader>
          <PageTitle>Upload Images</PageTitle>
          <PageDescription>Organize your doujinshi by chapters and manage image order</PageDescription>
        </PageHeader>

        <MainLayout>
          {/* Sidebar */}
          <ChapterSidebar
            chapters={chapters}
            activeChapter={activeChapter}
            onChapterSelect={setActiveChapter}
            onAddChapter={handleAddChapter}
            onEditChapter={handleEditChapter}
            onDeleteChapter={handleDeleteChapter}
          />

          {/* Main Content Area */}
          <MainContentWrapper>
            <MainContent>
              {/* Header */}
              <ContentHeader>
                <ContentTitle>{currentChapter?.title} Images</ContentTitle>
                <HeaderActions>
                  <ActionButton onClick={() => openFileDialog()}>
                    Upload Images
                  </ActionButton>
                </HeaderActions>
              </ContentHeader>

              {/* Upload Area */}
              <ImageUploader onUpload={handleUploadImages} />

              {/* Image Grid */}
              <ImageGrid images={sortedImages} onImageMove={handleImageMove} onImageDelete={handleDeleteImage} />

              {/* Footer */}
              <ActionFooter
                chapterTitle={currentChapter?.title || ""}
                imageCount={currentChapter?.images.length || 0}
                hasUnsavedChanges={hasUnsavedChanges}
                onSave={handleSaveChanges}
                onCancel={handleCancel}
              />
            </MainContent>
          </MainContentWrapper>
        </MainLayout>
      </div>
    </ContentWrapper>
  )
}

export default DoujinshiUploader
