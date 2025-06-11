import styled from "styled-components"

export const CardContainer = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  background-color: #0f1419;
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: move;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`

export const CardPageNumber = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
`

export const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #ef4444;
  border: none;
  border-radius: 9999px;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #dc2626;
  }

  ${CardContainer}:hover & {
    opacity: 1;
  }
`
