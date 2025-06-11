import styled from "styled-components"

interface ChapterContainerProps {
  $isActive: boolean
}

export const ChapterContainer = styled.div<ChapterContainerProps>`
  padding: 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => (props.$isActive ? "#19c5f033" : "#0f1419")};
  border: ${(props) => (props.$isActive ? "1px solid #4ba3f596" : "none")};

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#2472e65e" : "#252a3a")};
  }
`

export const ChapterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ChapterTitle = styled.span`
  font-weight: 500;
  color: white;
`

export const ChapterActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const ActionButton = styled.button`
  color: #9ca3af;
  transition: color 0.2s ease;
  padding: 0.25rem;
  border-radius: 0.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
  
  &:hover {
    color: white;
  }
`

export const DeleteButton = styled.button`
  color: #9ca3af;
  transition: color 0.2s ease;
  padding: 0.25rem;
  border-radius: 0.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
  
  &:hover {
    color: #f87171;
  }
`

export const ChapterImageCount = styled.div`
  font-size: 0.875rem;
  color: #9ca3af;
  margin-top: 0.5rem;
`

export const EditInput = styled.input`
  background-color: #0f1419;
  border: 1px solid #4b5563;
  color: white;
  border-radius: 0.5rem;
  height: 2rem;
  font-size: 0.875rem;
  padding: 0 0.75rem;
  outline: none;
  
  &:focus {
    border-color: #8b5cf6;
  }
`
