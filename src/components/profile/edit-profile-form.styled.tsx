"use client"

import styled from "styled-components"

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const FieldLabel = styled.label`
  color: #B1B5C3;
  font-size: 16px;
  font-weight: 400;
`

export const FieldValue = styled.div`
  color: #FCFCFD;
  font-size: 16px;
  font-weight: 400;
  padding: 12px 0;
`

export const Input = styled.input`
  background-color: #060A13;
  border: 1px solid #353945;
  border-radius: 12px;
  color: #777E90;
  font-size: 14px;
  font-weight: 300;
  padding: 20px 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgb(139, 92, 246);
  }

  &::placeholder {
    color: #777E90;
  }
`

export const TextArea = styled.textarea`
  background-color: rgb(31, 41, 55);
  border: 1px solid rgb(75, 85, 99);
  border-radius: 6px;
  color: white;
  font-size: 14px;
  padding: 12px 16px;
  transition: border-color 0.2s ease;
  width: 100%;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: rgb(139, 92, 246);
  }

  &::placeholder {
    color: rgb(107, 114, 128);
  }
`

export const EditButton = styled.button`
  background: none;
  border: 1px solid #353945;
  color: white;
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3.5px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SectionTitle = styled.h2`
  color: #FCFCFD;
  font-size: 22px;
  font-weight: 600;
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`
export const FormContainer = styled.div`
  background-color: #23262F;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #353945;
`

export const HiddenFileInput = styled.input`
  display: none;
`

export const SaveButton = styled.button`
  float: right;
  background: #55D2FB;
  color: #060A13;
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
  margin-bottom: 30px;
  margin-right: 30px;

  &:hover {
    background-color: #f3ee4c;
  }
`
