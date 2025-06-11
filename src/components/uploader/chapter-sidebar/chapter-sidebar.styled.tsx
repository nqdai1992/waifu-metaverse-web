import styled from "styled-components"

export const SidebarContainer = styled.div`
  width: 20rem;
`

export const SidebarContent = styled.div`
  background-color: #23262F;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`

export const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: white;
`

export const AddButton = styled.button`
  background-color: #55D2FB;
  color: black;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #04aee5;
  }
`

export const ChapterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const ScrollAreaContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #374151;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`
