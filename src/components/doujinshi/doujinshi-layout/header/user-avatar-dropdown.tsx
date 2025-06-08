"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CaretDownIcon, PersonIcon, ExitIcon } from "@radix-ui/react-icons";
import RoundIconButton from "@/components/doujinshi/round-icon-button/round-icon-button";
import signOut from "@/features/authentication/sign-out.action";
import { useProfile } from "@/features/profile/profile.context";

const UserAvatarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { profile } = useProfile();

  const handleProfileClick = () => {
    setIsOpen(false);
    router.push("/profile/edit");
  };

  const handleSignOut = async () => {
    setIsOpen(false);
    try {
      await signOut();
      router.push("/sign-in");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#060A13] rounded-full transition-all duration-50"
          aria-label="User menu"
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <RoundIconButton
            aria-hidden="true"
            className="!p-0 items-center cursor-pointer"
          >
            <Image
              src={profile?.avatar_url || "/mock/mock-header-avatar.svg"}
              alt={profile?.username || "User avatar"}
              width={54}
              height={54}
              className="object-cover h-full w-full"
              priority
            />
          </RoundIconButton>
          <CaretDownIcon
            className={`w-6 h-6 transition-transform duration-50 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-[#1a1a1a] border border-[#353945] rounded-lg p-1 shadow-lg z-50 min-w-[200px] animate-scale-in"
          sideOffset={8}
          align="end"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenu.Item
            className="flex items-center space-x-3 p-3 hover:bg-[#353945] rounded-md cursor-pointer text-white transition-colors focus:outline-none focus:bg-[#353945] data-[highlighted]:bg-[#353945]"
            onClick={handleProfileClick}
            onSelect={(e) => {
              e.preventDefault();
              handleProfileClick();
            }}
          >
            <PersonIcon className="w-5 h-5 text-[#8a8a8a]" />
            <span className="text-base font-medium">
              {profile?.username || "Profile"}
            </span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-[#353945] my-1" />

          <DropdownMenu.Item
            className="flex items-center space-x-3 p-3 hover:bg-[#353945] rounded-md cursor-pointer text-white transition-colors focus:outline-none focus:bg-[#353945] data-[highlighted]:bg-[#353945]"
            onClick={handleSignOut}
            onSelect={(e) => {
              e.preventDefault();
              handleSignOut();
            }}
          >
            <ExitIcon className="w-5 h-5 text-[#8a8a8a]" />
            <span className="text-base font-medium">Sign Out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserAvatarDropdown;
