import styled from "styled-components"

export const DialogOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`

export const DialogContainer = styled.div`
  background-color: #1a1f2e;
  border: 1px solid #374151;
  border-radius: 1rem;
  padding: 1.5rem;
  max-width: 28rem;
  width: 90%;
`

export const DialogHeader = styled.div`
  margin-bottom: 1rem;
`

export const DialogTitle = styled.h2`
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
`

export const DialogForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const DialogInput = styled.input`
  background-color: #0f1419;
  border: 1px solid #4b5563;
  color: white;
  border-radius: 0.75rem;
  padding: 0.75rem;
  outline: none;
  
  &:focus {
    border-color: #55D2FB;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`

export const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`

export const CancelButton = styled.button`
  border: 1px solid #4b5563;
  color: #d1d5db;
  background: transparent;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #374151;
  }
`

export const AddButton = styled.button`
  background-color: #55D2FB;
  color: black;
  font-weight: 500;
  border: none;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #04aee5;
  }
`
