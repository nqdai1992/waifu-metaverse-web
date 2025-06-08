import { useState } from 'react'

interface UploadAvatarOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function useAvatarUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const uploadAvatar = async (
    file: File,
    profileId: string,
    options?: UploadAvatarOptions
  ): Promise<boolean> => {
    setIsUploading(true)
    setUploadError(null)

    try {
      // Create form data
      const formData = new FormData()
      formData.append('avatar', file)

      // Upload to API endpoint
      const response = await fetch('/api/me/avatar', {
        method: 'PUT',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload avatar')
      }

      options?.onSuccess?.()
      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image'
      setUploadError(errorMessage)
      options?.onError?.(errorMessage)
      return false
    } finally {
      setIsUploading(false)
    }
  }

  return {
    uploadAvatar,
    isUploading,
    uploadError,
    setUploadError,
  }
}