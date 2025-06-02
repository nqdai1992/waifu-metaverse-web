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
}

const ProfilePhotoUpload = ({ onUploadClick }: ProfilePhotoUploadProps) => {
  return (
    <ProfileSection>
      <ProfilePhotoSection>
        <ProfilePhotoContainer>
          <Image src="/Mock/Mock-header-avatar.svg" alt="Profile" fill className="object-cover" />
        </ProfilePhotoContainer>

        <PhotoUploadInfo>
          <UploadButton onClick={onUploadClick}>Upload new photo</UploadButton>

          <p>
            At least 800x800 px recommended
            <br />
            JPG or PNG Allowed
          </p>
        </PhotoUploadInfo>
      </ProfilePhotoSection>
    </ProfileSection>
  )
}

export default ProfilePhotoUpload
