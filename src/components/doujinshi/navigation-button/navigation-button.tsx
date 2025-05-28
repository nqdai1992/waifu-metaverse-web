"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { NavigationButton } from "./navigation-button.styled"

interface NavigationButtonsProps {
  onPrevious: () => void
  onNext: () => void
  canGoPrevious: boolean
  canGoNext: boolean
  className?: string
}

const NavigationButtons = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  className = "",
}: NavigationButtonsProps) => {
  return (
    <>
      <NavigationButton position="left" className={className} onClick={onPrevious} disabled={!canGoPrevious}>
        <ChevronLeftIcon className="w-6 h-6" />
      </NavigationButton>

      <NavigationButton position="right" className={className} onClick={onNext} disabled={!canGoNext}>
        <ChevronRightIcon className="w-6 h-6" />
      </NavigationButton>
    </>
  )
}

export default NavigationButtons
