import { ButtonHTMLAttributes } from "react";
import DoujinshiHeader from "./header/header"
import DoujinshiFooter from "./footer/footer";

interface DoujinshiLayoutProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}


const DoujinshiLayout = ({ children }: DoujinshiLayoutProps) => {
    return (
        <div className="bg-[#060A13] flex items-center justify-center">
            <div className=" w-full max-w-[75rem] bg-[#050a14] relative">
                <DoujinshiHeader />
                {children}
                <DoujinshiFooter />
            </div>
        </div>
    )
}

export default DoujinshiLayout