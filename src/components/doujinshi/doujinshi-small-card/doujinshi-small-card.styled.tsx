import Image from "next/image"
import styled from "styled-components"

export const CardContainer = styled.div`
  width: 195px;
  height: 195px;
  cursor: pointer;
  flex-shrink: 0;
  
  &:hover .card-content {
    opacity: 0.9;
  }
  
  &:hover .card-image {
    transform: scale(1.05);
  }
`

export const CardContent = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
`

export const CardImage = styled(Image)`
  object-fit: cover;
  transition: transform 0.3s ease;
`

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 66%, rgba(0, 0, 0, 0.5) 100%),
              linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 66%, rgba(0, 0, 0, 0.5) 100%);
`

export const TitleContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 12px 12px;
`

export const Title = styled.h3`
  color: white;
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`