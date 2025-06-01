import styled from "styled-components";

export const NavigationButton = styled.button<{ position: "left" | "right" }>`
  position: absolute;
  ${(props) => props.position}: -25px;
  top: 50%;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #55D2FB;
  color: black;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:disabled {
    color: white;
    background-color: #353945;
    cursor: not-allowed;
  }
`