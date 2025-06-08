import { useState } from 'react'
import { Profile } from '@/features/profile/types'

interface UpdateProfileOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
}

interface UpdateProfilePayload {
  full_name?: string | null
  bio?: string | null
  phone?: string | null
  avatar_url?: string | null
  email?: string | null
}

export function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateProfile = async (
    payload: UpdateProfilePayload,
    options?: UpdateProfileOptions
  ): Promise<Profile | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      options?.onSuccess?.()
      return data.profile
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile'
      setError(errorMessage)
      options?.onError?.(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    updateProfile,
    isLoading,
    error,
    setError,
  }
}