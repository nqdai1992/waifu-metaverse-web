"use client"

import type React from "react"
import type { ImageUploaderProps } from "./types"
import { UploadContainer, UploadIcon, UploadTitle, UploadDescription } from "./image-uploader.styled"

const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const handleClick = () => {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.multiple = true
    fileInput.accept = "image/*"

    fileInput.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files && files.length > 0) {
        onUpload(Array.from(files))
      }
    }

    fileInput.click()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(Array.from(e.dataTransfer.files))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <UploadContainer onClick={handleClick} onDrop={handleDrop} onDragOver={handleDragOver}>
      <UploadIcon>
        <div className="h-8 w-8 text-blue-100 flex items-center justify-center text-2xl">☁</div>
      </UploadIcon>
      <UploadTitle>Drag and drop images here or click to browse</UploadTitle>
      <UploadDescription>Supports JPG, PNG, GIF files up to 10MB each</UploadDescription>
    </UploadContainer>
  )
}

export default ImageUploader
