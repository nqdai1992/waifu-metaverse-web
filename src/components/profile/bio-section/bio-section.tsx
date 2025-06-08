"use client"

import { Pencil1Icon } from "@radix-ui/react-icons"
import { useState } from "react"
import { EditButton, FormField, SectionHeader, SectionTitle, TextArea } from "../edit-profile-form.styled"
import { BioText, ReadMoreLink } from "./bio-section.styled"

interface BioSectionProps {
  isEditing: boolean
  bio: string
  onEditToggle: () => void
  onBioChange: (value: string) => void
}

const BioSection = ({ isEditing, bio, onEditToggle, onBioChange }: BioSectionProps) => {
  const [isBioExpanded, setIsBioExpanded] = useState(false)

  const toggleBioExpansion = () => {
    setIsBioExpanded(!isBioExpanded)
  }

  // Check if bio text needs "Read More" (simple check based on length)
  const needsReadMore = bio.length > 250

  return (
    <div className="border border-[#353945] rounded-xl p-7.5 flex flex-col gap-5">
      <SectionHeader>
        <SectionTitle>Bio</SectionTitle>
        <EditButton onClick={onEditToggle}>
          <Pencil1Icon className="w-6 h-6"/>
          Edit
        </EditButton>
      </SectionHeader>

      {isEditing ? (
        <FormField>
          <TextArea value={bio} onChange={(e) => onBioChange(e.target.value)} placeholder="Enter your bio" rows={6} />
        </FormField>
      ) : (
        <div>
          <BioText isExpanded={isBioExpanded}>
            {bio}
          </BioText>
          {needsReadMore && !isBioExpanded && (
            <ReadMoreLink onClick={toggleBioExpansion}> Read More</ReadMoreLink>
          )}
          {needsReadMore && isBioExpanded && <ReadMoreLink onClick={toggleBioExpansion}>Read Less</ReadMoreLink>}
        </div>
      )}
    </div>
  )
}

export default BioSection
