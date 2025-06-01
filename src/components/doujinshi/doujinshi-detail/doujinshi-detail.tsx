import Image from "next/image"
import { IDoujinshiDetail } from "../doujinshi-card/doujinshi-card"
import { ActionButton, ActionButtons, ContentContainer, ContentInfo, CoverImageContainer, Description, IdNumber, MetadataLabel, MetadataRow, MetadataValue, Tag, TagContainer, TagCount, TagLabel, Title } from "./doujinshi-detail.styled"

interface DoujinshiDetailProps {
    item: IDoujinshiDetail
    isLiked: boolean
    onToggleLike: (itemId: number) => void
}


const DoujinshiDetail = ({ item, isLiked, onToggleLike }: DoujinshiDetailProps) => {
    const handleFavorite = () => {
        onToggleLike(item.id)
    }

    const handleDownload = () => {
        console.log("Download clicked for:", item.title)
    }

    return (
        <ContentContainer>
            <CoverImageContainer>
                <Image
                    src={item.thumbnail || "/placeholder.svg?height=400&width=300"}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            </CoverImageContainer>

            <ContentInfo>
                <Title>{item.title}</Title>

                <Description>
                    {item.title}
                </Description>
                <IdNumber>
                    #{item.id}
                </IdNumber>
                <MetadataRow>
                    <MetadataLabel>Languages:</MetadataLabel>
                    <TagContainer>
                        <Tag>
                            <TagLabel>translated</TagLabel>
                            <TagCount>212K</TagCount>
                        </Tag>
                        <Tag>
                            <TagLabel>english</TagLabel>
                            <TagCount>120K</TagCount>
                        </Tag>
                        <Tag>
                            <TagLabel>english</TagLabel>
                            <TagCount>120K</TagCount>
                        </Tag>
                        <Tag>
                            <TagLabel>english</TagLabel>
                            <TagCount>120K</TagCount>
                        </Tag>
                        <Tag>
                            <TagLabel>english</TagLabel>
                            <TagCount>120K</TagCount>
                        </Tag>
                        <Tag>
                            <TagLabel>english</TagLabel>
                            <TagCount>120K</TagCount>
                        </Tag>
                        <Tag>
                            <TagLabel>english</TagLabel>
                            <TagCount>120K</TagCount>
                        </Tag>
                        <Tag>
                            <TagLabel>english</TagLabel>
                            <TagCount>120K</TagCount>
                        </Tag>
                        <Tag>
                            <TagLabel>english</TagLabel>
                            <TagCount>120K</TagCount>
                        </Tag>
                        <Tag>
                            <TagLabel>english</TagLabel>
                            <TagCount>120K</TagCount>
                        </Tag>
                    </TagContainer>
                </MetadataRow>

                <MetadataRow>
                    <MetadataLabel>Categories:</MetadataLabel>
                    <TagContainer>
                        <Tag>
                            <TagLabel>doujinshi</TagLabel>
                            <TagCount>409K</TagCount>
                        </Tag>
                    </TagContainer>
                </MetadataRow>

                <MetadataRow>
                    <MetadataLabel>Pages:</MetadataLabel>
                    <MetadataValue>{item.pageTotal}</MetadataValue>
                </MetadataRow>

                <MetadataRow>
                    <MetadataLabel>Uploaded:</MetadataLabel>
                    <span style={{ color: "white", fontSize: "14px" }}>2 hours, 10 minutes ago</span>
                </MetadataRow>

                <ActionButtons>
                    <ActionButton variant="primary" onClick={handleFavorite}>
                        <Image src={isLiked ? "/heart-fill.svg" : "/heart.svg"} alt="Favorite" width={21.6} height={21.6} />
                        Favourite
                    </ActionButton>

                    <ActionButton variant="secondary" onClick={handleDownload}>
                        <Image src={"/download-icon.svg"} alt="Download" width={21.6} height={21.6} />
                        Download
                    </ActionButton>
                </ActionButtons>
            </ContentInfo>
        </ContentContainer>
    )
}

export default DoujinshiDetail