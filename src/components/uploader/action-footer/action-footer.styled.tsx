import styled from "styled-components"

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.5rem;
  border-top: 1px solid #374151;
`

export const FooterStatus = styled.div`
  color: #9ca3af;
`

export const UnsavedChanges = styled.span`
  color: #fbbf24;
  margin-left: 0.5rem;
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`

export const CancelButton = styled.button`
  border: 1px solid #4b5563;
  color: #d1d5db;
  background: transparent;
  border-radius: 0.75rem;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #374151;
  }
`

export const SaveButton = styled.button`
  background-color: #55D2FB;
  color: black;
  font-weight: 500;
  border: none;
  border-radius: 0.75rem;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #04aee5;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
