import styled from "styled-components"

export const GradientBackground = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: 
    linear-gradient(180deg, rgba(6, 10, 19, 0) 0%, rgba(225, 26, 143, 0.3) 100%),
    linear-gradient(243.18deg, rgba(6, 10, 19, 0) 0%, rgba(6, 10, 19, 0.1545) 68%, rgba(225, 26, 143, 0.3) 100%),
    linear-gradient(296.82deg, rgba(225, 26, 143, 0.3) 0%, rgba(72, 15, 56, 0.09) 32%, rgba(6, 10, 19, 0) 100%);
`