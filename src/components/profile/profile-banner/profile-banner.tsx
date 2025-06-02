"use client"

import Image from "next/image"
import { BannerSection, EditBannerButton } from "./profile-banner.styled"
import { Pencil1Icon } from "@radix-ui/react-icons"

interface ProfileBannerProps {
  onEditClick: () => void
}

const ProfileBanner = ({ onEditClick }: ProfileBannerProps) => {
  return (
    <BannerSection>
      <Image
        src={'/Mock/user-cover.png'}
        alt="user cover"
        width={1200}
        height={255}
        className="object-cover h-full w-full"
      />

      <EditBannerButton onClick={onEditClick}>
        <Pencil1Icon className="w-6 h-6"/>
        Edit
      </EditBannerButton>
    </BannerSection>
  )
}

export default ProfileBanner
