"use client"

import { Pencil1Icon } from "@radix-ui/react-icons"
import {
  SectionHeader,
  SectionTitle,
  EditButton,
  FormGrid,
  FormField,
  FieldLabel,
  FieldValue,
  Input,
} from "../edit-profile-form.styled"

interface PersonalData {
  fullName: string
  emailAddress: string
  phoneNumber: string
  username?: string
}

interface PersonalInformationProps {
  isEditing: boolean
  data: PersonalData
  onEditToggle: () => void
  onDataChange: (field: keyof PersonalData, value: string) => void
}

const PersonalInformation = ({ isEditing, data, onEditToggle, onDataChange }: PersonalInformationProps) => {
  return (
    <div className="border border-[#353945] rounded-xl p-7.5 flex flex-col gap-5">
      <SectionHeader>
        <SectionTitle>Personal Information</SectionTitle>
        <EditButton onClick={onEditToggle}>
          <Pencil1Icon className="w-6 h-6"/>
          Edit
        </EditButton>
      </SectionHeader>

      {isEditing ? (
        <FormGrid>
          <FormField>
            <FieldLabel>Full Name</FieldLabel>
            <Input
              type="text"
              value={data.fullName}
              onChange={(e) => onDataChange("fullName", e.target.value)}
              placeholder="Enter your full name"
            />
          </FormField>
          <FormField>
            <FieldLabel>Email Address</FieldLabel>
            <Input
              type="email"
              value={data.emailAddress}
              disabled
              className="opacity-60 cursor-not-allowed"
              placeholder="Email cannot be changed"
            />
          </FormField>
          <FormField>
            <FieldLabel>Phone Number</FieldLabel>
            <Input
              type="tel"
              value={data.phoneNumber}
              onChange={(e) => onDataChange("phoneNumber", e.target.value)}
              placeholder="Enter your phone number"
            />
          </FormField>
        </FormGrid>
      ) : (
        <FormGrid>
          {data.username && (
            <FormField>
              <FieldLabel>User Name</FieldLabel>
              <FieldValue>{data.username}</FieldValue>
            </FormField>
          )}
          <FormField>
            <FieldLabel>Full Name</FieldLabel>
            <FieldValue>{data.fullName || 'Not set'}</FieldValue>
          </FormField>
          <FormField>
            <FieldLabel>Email Address</FieldLabel>
            <FieldValue>{data.emailAddress}</FieldValue>
          </FormField>
          <FormField>
            <FieldLabel>Phone Number</FieldLabel>
            <FieldValue>{data.phoneNumber || 'Not set'}</FieldValue>
          </FormField>
        </FormGrid>
      )}
    </div>
  )
}

export default PersonalInformation
