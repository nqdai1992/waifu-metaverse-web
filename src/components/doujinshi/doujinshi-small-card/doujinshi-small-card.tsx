"use client"

import type React from "react"
import { IDoujinshiDetail } from "../doujinshi-card/doujinshi-card"
import { CardContainer, CardContent, CardImage, GradientOverlay, Title, TitleContainer,  } from "./doujinshi-small-card.styled"

interface DoujinshiSmallCardProps {
  item: IDoujinshiDetail
  onClick?: (item: IDoujinshiDetail) => void
  className?: string
  style?: React.CSSProperties
}



const DoujinshiSmallCard = ({ item, onClick, className = "", style }: DoujinshiSmallCardProps) => {
  return (
    <CardContainer className={`group ${className}`} style={style} onClick={() => onClick?.(item)}>
      <CardContent className="card-content">
        <CardImage
          className="card-image"
          src={item.thumbnail || "/placeholder.svg?height=195&width=195"}
          alt={item.title}
          fill
        />
        <GradientOverlay />
        <TitleContainer>
          <Title>{item.title}</Title>
        </TitleContainer>
      </CardContent>
    </CardContainer>
  )
}

export default DoujinshiSmallCard
