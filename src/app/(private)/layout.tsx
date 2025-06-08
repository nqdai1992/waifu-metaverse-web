import AuthGuard from "@/features/authentication/hoc/auth-guard";
import { PropsWithChildren } from "react";
import { ProfileProvider } from "@/features/profile/profile.context";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <AuthGuard>
      <ProfileProvider>{children}</ProfileProvider>
    </AuthGuard>
  );
}
