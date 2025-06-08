"use client";

import { IDoujinshiDetail } from "@/components/doujinshi/doujinshi-card/doujinshi-card";
import GridSection from "@/components/doujinshi/grid-section/grid-section";
import HorizontalScrollSection from "@/components/doujinshi/horizontal-scroll-section/horizontal-scroll-section";
import { useLikedItems } from "@/hooks/use-liked-items";
import { newUploads, popularItems } from "@/mock-data/doujinshi-data";
import { useRouter } from "next/navigation";

const DoujinshiPage = () => {
  const router = useRouter();
  const { likedItems, toggleLike } = useLikedItems([
    ...popularItems,
    ...newUploads,
  ]);

  const handleItemClick = (item: IDoujinshiDetail) => {
    console.log("Clicked item:", item.title);
    console.log("Pages:", item.pages);
    console.log("Total pages:", item.pageTotal);
    router.push(`/doujinshi/${item.id}`);
  };

  return (
    <div className="space-y-12.5 py-12.5">
      <HorizontalScrollSection
        title="MOST POPULAR NOW"
        items={popularItems}
        itemsPerView={5}
        likedItems={likedItems}
        onToggleLike={toggleLike}
        onItemClick={handleItemClick}
      />
      <GridSection
        title="NEW UPLOADS"
        items={newUploads}
        columns={5}
        likedItems={likedItems}
        onToggleLike={toggleLike}
        onItemClick={handleItemClick}
      />
    </div>
  );
};

export default DoujinshiPage;
