import styled from "styled-components"

export const UploadContainer = styled.div`
  border: 2px dashed #4b5563;
  border-radius: 1rem;
  padding: 3rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  background-color: rgba(15, 20, 25, 0.5);
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #4ba3f596;
  }
`

export const UploadIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: #4ba3f596;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`

export const UploadTitle = styled.p`
  color: white;
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin-bottom: 0.5rem;
`

export const UploadDescription = styled.p`
  color: #9ca3af;
`
