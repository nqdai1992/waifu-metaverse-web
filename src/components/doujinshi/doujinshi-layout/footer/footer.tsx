import FooterSection from "./footer-section"
import FooterNewsletter from "./footer-newsletter"
import FooterCopyright from "./footer-copyright"
import FooterBackground from "./footer-background"
import Image from "next/image"

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Features", href: "#" },
  { label: "Works", href: "#" },
  { label: "Career", href: "#" },
]

const helpLinks = [
  { label: "Customer Support", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
]

const DoujinshiFooter = () => {
  return (
    <FooterBackground>
      <footer className="text-white relative z-10">
        <div className="container mx-auto pb-9 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-[5.625rem]">
            {/* Logo and Description - Inline */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="flex justify-center lg:justify-start">
                  <Image
                    src={"/Logo.svg"}
                    alt={'logo'}
                    width={107}
                    height={51}
                    className="object-cover w-auto h-auto"
                  />
                </div>
              </div>
              <p className="text-[#777E90] text-base font-normal leading-relaxed">A short unique sentencing brand or company.</p>
            </div>

            <FooterSection title="COMPANY" links={companyLinks} />
            <FooterSection title="HELP" links={helpLinks} />
            <FooterNewsletter />
          </div>
          <FooterCopyright />
        </div>
      </footer>
    </FooterBackground>
  )
}

export default DoujinshiFooter
