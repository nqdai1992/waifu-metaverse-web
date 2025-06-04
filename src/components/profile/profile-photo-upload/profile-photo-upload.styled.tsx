"use client"

import styled from "styled-components"

export const ProfileSection = styled.div`
  padding: 36px;
  padding-bottom: 0;
  margin-top: -60px;
  position: relative;
  z-index: 1;
`

export const ProfilePhotoSection = styled.div`
  display: flex;
  gap: 20px;
`

export const ProfilePhotoContainer = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`

export const PhotoUploadInfo = styled.div`
  color: white;
  margin-top: auto;
  p {
    font-size: 14px;
    color: rgb(156, 163, 175);
    margin: 20px 0 7px 0;
    line-height: 1.4;
  }
`

export const UploadButton = styled.button`
  background: none;
  border: 1px solid #353945;
  color: #FCFCFD;
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`
