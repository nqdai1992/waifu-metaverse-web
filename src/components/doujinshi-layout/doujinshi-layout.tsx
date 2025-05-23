import { ButtonHTMLAttributes } from "react";
import DoujinshiHeader from "./header/header"

interface DoujinshiLayoutProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}


const DoujinshiLayout = ({ children }: DoujinshiLayoutProps) => {
    return (
        <div className="bg-[#060A13] flex items-center justify-center">
            <div className="w-full max-w-7xl bg-[#050a14] flex flex-col justify-center xl:gap-17.5">


                <DoujinshiHeader />
                {children}
            </div>
        </div>
    )
}

export default DoujinshiLayout