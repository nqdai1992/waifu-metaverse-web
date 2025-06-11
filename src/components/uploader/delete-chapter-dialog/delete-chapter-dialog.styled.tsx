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
  margin-bottom: 0.5rem;
`

export const DialogDescription = styled.p`
  color: #9ca3af;
  font-size: 0.875rem;
`

export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
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

export const DeleteButton = styled.button`
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #b91c1c;
  }
`
