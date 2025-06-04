"use client"

import styled from "styled-components"

export const BioText = styled.p<{ isexpanded: string }>`
  color: rgb(209, 213, 219);
  font-size: 14px;
  line-height: 1.6;
  ${(props) =>
    props.isexpanded !== 'true' &&
    `
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`

export const ReadMoreLink = styled.button`
  background: none;
  border: none;
  color: rgb(59, 130, 246);
  font-size: 14px;
  cursor: pointer;
  display: inline;
  
  &:hover {
    text-decoration: underline;
  }
`
