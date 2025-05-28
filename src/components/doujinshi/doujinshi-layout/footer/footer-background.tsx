import type React from "react"
import styled from "styled-components"

const BackgroundWrapper = styled.div`
  position: relative;
  bottom: 0;
  overflow: hidden;
  background-color: #060A13;
`

const Ellipse = styled.div<{
  width: string
  height: string
  top: string
  left: string
  rotation: number
  opacity: number
}>`
  position: absolute;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  background: linear-gradient(180deg, #E11A8F 0%, #53F1FF 100%);
  border-radius: 50%;
  transform: rotate(${(props) => props.rotation}deg);
  opacity: ${(props) => props.opacity};
  filter: blur(60px);
  pointer-events: none;
`

interface FooterBackgroundProps {
  children: React.ReactNode
}

const FooterBackground = ({ children }: FooterBackgroundProps) => {
  return (
    <BackgroundWrapper>
      {/* First ellipse - positioned relative to container */}
      <Ellipse width="7rem" height="25rem" top="0%" left="15%" rotation={30} opacity={0.6} />

      {/* Second ellipse - positioned relative to container */}
      <Ellipse width="8rem" height="25rem" top="15%" left="65%" rotation={30} opacity={0.6} />

      {children}
    </BackgroundWrapper>
  )
}

export default FooterBackground
