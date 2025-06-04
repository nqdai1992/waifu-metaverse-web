"use client"

import type React from "react"

import { useRef, useState } from "react"
import BioSection from "./bio-section/bio-section"
import { FormContainer, HiddenFileInput, SaveButton } from "./edit-profile-form.styled"
import PersonalInformation from "./personal-information/personal-information"
import ProfileBanner from "./profile-banner/profile-banner"
import ProfilePhotoUpload from "./profile-photo-upload/profile-photo-upload"

interface ProfileData {
    fullName: string
    emailAddress: string
    phoneNumber: string
    bio: string
}

const EditProfileForm = () => {
    const [isEditingPersonal, setIsEditingPersonal] = useState(false)
    const [isEditingBio, setIsEditingBio] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [profileData, setProfileData] = useState<ProfileData>({
        fullName: "Jenny Wilson",
        emailAddress: "jen.wilson@example.com",
        phoneNumber: "+1 (555) 123-4567",
        bio: `In a world where pixels dance and stories unfold, gaming transcends mere entertainment; it becomes a vibrant tapestry woven with threads of imagination and camaraderie. Picture a realm where every corner holds a new adventure, and every character, no matter how small, plays a pivotal role in the grand narrative. As we navigate through enchanted forests, treacherous mountains, and futuristic cities, we encounter not just challenges, but opportunities to forge friendships and discover hidden treasures. The thrill of leveling up, the satisfaction of solving intricate puzzles, and the joy of sharing these experiences with friends create a bond that is both exhilarating and heartwarming. Together, we can explore the depths of our creativity, unleash our strategic prowess, and celebrate the victories. In this digital realm, every quest completed, every level conquered, and every friendship forged becomes a testament to our shared passion for adventure and discovery.`,
    })

    const handlePersonalDataChange = (field: keyof Omit<ProfileData, "bio">, value: string) => {
        setProfileData((prev) => ({ ...prev, [field]: value }))
    }

    const handleBioChange = (value: string) => {
        setProfileData((prev) => ({ ...prev, bio: value }))
    }

    const handleSave = () => {
        console.log("Saving profile data:", profileData)
        setIsEditingPersonal(false)
        setIsEditingBio(false)
    }

    const handleFileUpload = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            console.log("File selected:", file)
            // Handle file upload logic here
        }
    }

    return (
        <FormContainer>
            <div className="p-7.5">
                <ProfileBanner onEditClick={handleFileUpload} />

                <HiddenFileInput
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleFileChange}
                />

                <ProfilePhotoUpload onUploadClick={handleFileUpload} />
            </div>
            <div className="w-full my-3 border-[0.9px] border-[#353945]" />
            <div className="p-7.5 gap-4 flex flex-col">
                <PersonalInformation
                    isEditing={isEditingPersonal}
                    data={{
                        fullName: profileData.fullName,
                        emailAddress: profileData.emailAddress,
                        phoneNumber: profileData.phoneNumber,
                    }}
                    onEditToggle={() => setIsEditingPersonal(!isEditingPersonal)}
                    onDataChange={handlePersonalDataChange}
                />

                <BioSection
                    isEditing={isEditingBio}
                    bio={profileData.bio}
                    onEditToggle={() => setIsEditingBio(!isEditingBio)}
                    onBioChange={handleBioChange}
                />
            </div>
            {(isEditingPersonal || isEditingBio) && (
                <SaveButton onClick={handleSave}>
                    Save Changes
                </SaveButton>
            )}
        </FormContainer>
    )
}

export default EditProfileForm
