import styled from "styled-components"

export const ContentWrapper = styled.div`
  min-height: 100vh;
  color: white;
`

export const PageHeader = styled.div`
  margin-bottom: 2rem;
`

export const PageTitle = styled.h1`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`

export const PageDescription = styled.p`
  color: #9ca3af;
`

export const MainLayout = styled.div`
  display: flex;
  gap: 1.5rem;
`

export const MainContentWrapper = styled.div`
  flex: 1;
  height: 100%;
`

export const MainContent = styled.div`
  flex: 1;
  background-color: #23262F;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`

export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`

export const ContentTitle = styled.h2`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: white;
`

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
`

export const ActionButton = styled.button`
  background-color: #55D2FB;
  color: black;
  font-weight: 500;
  border: none;
  border-radius: 0.55rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #04aee5;
  }
`

export const SecondaryButton = styled.button`
  border: 1px solid #4b5563;
  color: #d1d5db;
  background: transparent;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #374151;
  }
`
