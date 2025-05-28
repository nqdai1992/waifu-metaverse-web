import styled from "styled-components"

export const ContentContainer = styled.div`
  background-color: #23262F;
  border-radius: 8px;
  padding: 60px 80px;
  display: flex;
  gap: 120px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 16px;
    padding: 16px;
  }
`

export const CoverImageContainer = styled.div`
  flex-shrink: 0;
  width: 350px;
  height: 480px;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
`

export const ContentInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 14px;
`

export const Title = styled.h1`
  color: white;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`

export const Description = styled.p`
  color: rgb(209, 213, 219);
  font-size: 16px;
  line-height: 1.4;
`
export const IdNumber = styled.div`
  color: #FCFCFD;
  font-size: 15px;
`

export const MetadataRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
`

export const MetadataLabel = styled.div`
  color: white;
  font-weight: 500;
  min-width: 90px;
  align-self: self-start;
`

export const MetadataValue = styled.span`
  color: white;
  background-color: #777E90;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
`

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const Tag = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
`

export const TagLabel = styled.span`
  background-color: #777E90;
  color: white;
  padding: 2px 6px;
`

export const TagCount = styled.span`
  background-color: #2B2B2B;
  color: #B1B5C3;
  padding: 2px 6px;
  font-weight: 400;
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`

export const ActionButton = styled.button<{ variant: "primary" | "secondary" }>`
  padding: 10.8px 14.4px;
  border-radius: 6px;
  font-size: 12.6px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  
  ${(props) =>
        props.variant === "primary"
            ? `
    background-color: #55D2FB;
    opacity: 1;
    color: black;
    &:hover {
      opacity: 0.6;
    }
  `
            : `
    background-color: rgb(75, 85, 99);
    color: white;
    
    &:hover {
      background-color: rgb(55, 65, 81);
    }
  `}
`