"use client"


import { IDoujinshiDetail } from "@/components/doujinshi/doujinshi-card/doujinshi-card"
import { useState } from "react"


export const useLikedItems = (initialItems: IDoujinshiDetail[]) => {
  const [likedItems, setLikedItems] = useState<Record<number, boolean>>(
    initialItems.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item.liked,
      }),
      {},
    ),
  )

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  return { likedItems, toggleLike }
}
