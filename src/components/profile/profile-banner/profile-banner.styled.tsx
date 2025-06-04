"use client"

import styled from "styled-components"

export const BannerSection = styled.div`
  position: relative;
  height: 255px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
`

export const EditBannerButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  color: #FCFCFD;
  border: 1px solid #FCFCFD;
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3.5px;
  transition: background-color 0.2s ease;
  z-index: 3;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`
