"use client"

import Image from "next/image"
import {
  PhotoUploadInfo,
  ProfilePhotoContainer,
  ProfilePhotoSection,
  ProfileSection,
  UploadButton,
} from "./profile-photo-upload.styled"

interface ProfilePhotoUploadProps {
  onUploadClick: () => void
  avatarUrl?: string | null
  name?: string | null
  email?: string | null
  isUploading?: boolean
  uploadError?: string | null
}

const ProfilePhotoUpload = ({ onUploadClick, avatarUrl, name, email, isUploading, uploadError }: ProfilePhotoUploadProps) => {
  const getInitial = () => {
    const displayName = name || email || 'U'
    return displayName.charAt(0).toUpperCase()
  }
  return (
    <ProfileSection>
      <ProfilePhotoSection>
        <ProfilePhotoContainer>
          {avatarUrl ? (
            <Image src={avatarUrl} alt="Profile" fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <span className="text-white text-5xl font-semibold">{getInitial()}</span>
            </div>
          )}
        </ProfilePhotoContainer>

        <PhotoUploadInfo>
          <UploadButton onClick={onUploadClick} disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload new photo'}
          </UploadButton>

          <p>
            At least 800x800 px recommended
            <br />
            JPG or PNG Allowed (Max 5MB)
          </p>
          
          {uploadError && (
            <p className="text-red-500 text-sm mt-2">{uploadError}</p>
          )}
        </PhotoUploadInfo>
      </ProfilePhotoSection>
    </ProfileSection>
  )
}

export default ProfilePhotoUpload
