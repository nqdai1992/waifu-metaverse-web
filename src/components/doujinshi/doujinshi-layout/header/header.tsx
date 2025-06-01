import RoundIconButton from "@/components/round-icon-button/round-icon-button";
import { BellIcon, CaretDownIcon, DragHandleDots2Icon, HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DoujinshiHeader = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const router = useRouter()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(e.target.value);
    };

    const handleMenuClick = (): void => {
        console.log('Menu clicked');
    };

    const handleGridClick = (): void => {
        console.log('Grid clicked');
    };

    const handleNotificationClick = (): void => {
        console.log('Notification clicked');
    };

    const handleProfileClick = (): void => {
        console.log('Profile clicked');
    };

    const handleLogoClick = (): void => {
        router.push(`/doujinshi`)
    };

    return (
        <header
            className="bg-[#060A13] text-white"
            style={{
                border: '0.9px solid',
                borderImageSource: 'linear-gradient(90deg, rgba(194, 194, 194, 0) 0%, #C2C2C2 52%, rgba(194, 194, 194, 0) 100%)',
                borderImageSlice: 1,
            }}
        >
            <div className="flex items-center justify-between py-5.75">
                {/* Left side - Menu and Logo */}
                <div className="flex items-center space-x-2.5">
                    <HamburgerMenuIcon className="w-8 h-8 cursor-pointer" onClick={handleMenuClick} />

                    <div className={`flex items-center `}>
                        <div className="flex items-center justify-center text-white cursor-pointer" onClick={handleLogoClick}>
                            {/* Angel/Winged figure logo */}
                            <Image
                                src={"/Header-logo.svg"}
                                alt={'logo'}
                                width={57}
                                height={51}
                                className="object-cover h-full w-full"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Center - Search Bar */}
                <div className="relative flex-1 max-w-xl">
                    <input
                        type="text"
                        placeholder={'Search...'}
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full bg-white border border-gray-700 rounded-xl px-4.5 py-4 pr-27 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors font-medium"
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 flex items-center text-black transform -translate-y-1/2 bg-cyan-500 hover:bg-cyan-600 px-3 py-3 rounded-md text-sm transition-colors font-semibold "
                    >
                        <MagnifyingGlassIcon className="w-6 h-6" />
                        <span>Search</span>
                    </button>
                </div>
                {/* Right side - Icons and Profile */}
                <div className="flex items-center space-x-3">
                    <RoundIconButton
                        onClick={handleGridClick}
                        aria-label="Grid view"
                        className="bg-[#4B4B4B] cursor-pointer"
                    >
                        <DragHandleDots2Icon className="w-6 h-6" />
                    </RoundIconButton>

                    <RoundIconButton
                        onClick={handleNotificationClick}
                        aria-label="Notifications"
                        className="bg-[#353945] cursor-pointer"
                    >
                        <BellIcon className="w-6 h-6" />
                    </RoundIconButton>

                    <div className="flex items-center gap-2 cursor-pointer">
                        <RoundIconButton
                            onClick={handleProfileClick}
                            aria-label="avata"
                            className="!p-0 items-center cursor-pointer"
                        >
                            <Image
                                src={"/Mock/Mock-header-avatar.svg"}
                                alt={'logo'}
                                width={54}
                                height={54}
                                className="object-cover h-full w-full"
                                priority
                            />
                        </RoundIconButton>
                        <CaretDownIcon className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default DoujinshiHeader