'use client';

import DoujinshiLayout from "@/components/doujinshi/doujinshi-layout/doujinshi-layout";
import { ProfileProvider } from "@/features/profile/profile.context";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileProvider>
      <DoujinshiLayout>{children}</DoujinshiLayout>
    </ProfileProvider>
  );
}
