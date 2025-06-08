"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { useProfile } from "@/features/profile/profile.context"
import { useUpdateProfile } from "@/features/profile/use-update-profile"
import { useAvatarUpload } from "@/features/profile/use-avatar-upload"
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
    const { profile, loading, error, refetchProfile } = useProfile()
    const { updateProfile, isLoading: isSaving, error: updateError, setError: setUpdateError } = useUpdateProfile()
    const { uploadAvatar, isUploading, uploadError, setUploadError } = useAvatarUpload()
    const [isEditingPersonal, setIsEditingPersonal] = useState(false)
    const [isEditingBio, setIsEditingBio] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [profileData, setProfileData] = useState<ProfileData>({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        bio: "",
    })

    useEffect(() => {
        if (profile) {
            setProfileData({
                fullName: profile.full_name || "",
                emailAddress: profile.email || "",
                phoneNumber: profile.phone || "",
                bio: profile.bio || "",
            })
        }
    }, [profile])

    const handlePersonalDataChange = (field: keyof Omit<ProfileData, "bio">, value: string) => {
        setProfileData((prev) => ({ ...prev, [field]: value }))
    }

    const handleBioChange = (value: string) => {
        setProfileData((prev) => ({ ...prev, bio: value }))
    }

    const validatePhoneNumber = (phone: string) => {
        if (!phone) return true // Phone is optional
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4,6}$/
        return phoneRegex.test(phone)
    }

    const handleSave = async () => {
        if (!profile) return
        
        setUpdateError(null)
        setSaveSuccess(false)
        
        // Validate data
        if (profileData.fullName && profileData.fullName.length > 100) {
            setUpdateError("Full name must be less than 100 characters")
            return
        }
        
        if (profileData.phoneNumber && !validatePhoneNumber(profileData.phoneNumber)) {
            setUpdateError("Please enter a valid phone number")
            return
        }
        
        if (profileData.bio && profileData.bio.length > 500) {
            setUpdateError("Bio must be less than 500 characters")
            return
        }
        
        await updateProfile(
            {
                full_name: profileData.fullName || null,
                phone: profileData.phoneNumber || null,
                bio: profileData.bio || null,
            },
            {
                onSuccess: async () => {
                    await refetchProfile()
                    setSaveSuccess(true)
                    setIsEditingPersonal(false)
                    setIsEditingBio(false)
                    // Clear success message after 3 seconds
                    setTimeout(() => setSaveSuccess(false), 3000)
                }
            }
        )
    }

    const handleFileUpload = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file || !profile) return
        
        setUploadError(null)
        
        await uploadAvatar(file, profile.id, {
            onSuccess: async () => {
                await refetchProfile()
                setSaveSuccess(true)
                setTimeout(() => setSaveSuccess(false), 3000)
            }
        })
    }

    if (loading) {
        return (
            <FormContainer>
                <div className="flex items-center justify-center p-20">
                    <div className="text-white">Loading...</div>
                </div>
            </FormContainer>
        )
    }
    
    if (error || !profile) {
        return (
            <FormContainer>
                <div className="flex items-center justify-center p-20">
                    <div className="text-red-500">{error ? `Failed to load profile: ${error.message}` : 'Please sign in to edit your profile'}</div>
                </div>
            </FormContainer>
        )
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

                <ProfilePhotoUpload 
                    onUploadClick={handleFileUpload} 
                    avatarUrl={profile?.avatar_url}
                    name={profile?.full_name}
                    email={profile?.email}
                    isUploading={isUploading}
                    uploadError={uploadError}
                />
            </div>
            <div className="w-full my-3 border-[0.9px] border-[#353945]" />
            <div className="p-7.5 gap-4 flex flex-col">
                <PersonalInformation
                    isEditing={isEditingPersonal}
                    data={{
                        fullName: profileData.fullName,
                        emailAddress: profileData.emailAddress,
                        phoneNumber: profileData.phoneNumber,
                        username: profile?.username ?? undefined,
                    }}
                    onEditToggle={() => setIsEditingPersonal(!isEditingPersonal)}
                    onDataChange={(field, value) => {
                        if (field !== 'username') {
                            handlePersonalDataChange(field as keyof Omit<ProfileData, "bio">, value)
                        }
                    }}
                />

                <BioSection
                    isEditing={isEditingBio}
                    bio={profileData.bio}
                    onEditToggle={() => setIsEditingBio(!isEditingBio)}
                    onBioChange={handleBioChange}
                />
            </div>
            {(isEditingPersonal || isEditingBio) && (
                <div className="px-7.5 pb-7.5">
                    {updateError && (
                        <div className="text-red-500 text-sm mb-4">{updateError}</div>
                    )}
                    <SaveButton onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </SaveButton>
                </div>
            )}
            
            {saveSuccess && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    Profile updated successfully!
                </div>
            )}
        </FormContainer>
    )
}

export default EditProfileForm
