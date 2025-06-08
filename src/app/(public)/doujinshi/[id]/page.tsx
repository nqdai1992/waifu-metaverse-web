"use client";

import { IDoujinshiDetail } from "@/components/doujinshi/doujinshi-card/doujinshi-card";
import DoujinshiDetail from "@/components/doujinshi/doujinshi-detail/doujinshi-detail";
import HorizontalScrollSection from "@/components/doujinshi/horizontal-scroll-section/horizontal-scroll-section";
import { useLikedItems } from "@/hooks/use-liked-items";
import { newUploads, popularItems } from "@/mock-data/doujinshi-data";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { mockListDetailDoujinshiPages } from "../../../../mock-data/doujinshi-data";

const DoujinshiDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const contentId = Number.parseInt(params.id as string);

  // Find the content item (in real app, this would be an API call)
  const allItems = [...popularItems, ...newUploads];
  const contentItem =
    allItems.find((item) => item.id === contentId) || popularItems[0];

  const { likedItems, toggleLike } = useLikedItems(allItems);

  const handleItemClick = (item: IDoujinshiDetail) => {
    router.push(`/doujinshi/${item.id}`);
  };

  const handleViewAll = (section: string) => {
    console.log(`View all clicked for: ${section}`);
    // Navigate to category page
    // router.push(`/category/${section}`)
  };

  return (
    <div className="space-y-12.5 py-12.5">
      <DoujinshiDetail
        item={contentItem}
        isLiked={likedItems[contentItem.id] || false}
        onToggleLike={toggleLike}
      />
      <div
        className="bg-[#23262F] rounded-lg p-5 grid gap-2 justify-center w-full"
        style={{
          gridTemplateColumns: `repeat(5, 227px)`,
        }}
      >
        {mockListDetailDoujinshiPages.map((src, index) => (
          <div
            key={index}
            className="relative overflow-hidden cursor-pointer"
            style={{ width: "222px", height: "315px" }}
          >
            <Image
              src={src}
              alt={"hehe"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
      <HorizontalScrollSection
        title="Recommended"
        items={popularItems}
        itemsPerView={6}
        likedItems={likedItems}
        onToggleLike={toggleLike}
        onItemClick={handleItemClick}
        cardSize="small"
        showViewAll
        onViewAll={() => handleViewAll("recommended")}
      />
    </div>
  );
};

export default DoujinshiDetailPage;
