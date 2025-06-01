interface FooterLink {
  label: string
  href: string
}

interface FooterSectionProps {
  title: string
  links: FooterLink[]
}

const FooterSection = ({ title, links }: FooterSectionProps) => {
  return (
    <div className="space-y-6.75">
      <h3 className="text-[#777E90] font-semibold uppercase tracking-wide text-xs">{title}</h3>
      <ul className="space-y-3 md:space-y-5.75">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} className="text-[#FCFCFD] hover:text-white transition-colors text-sm font-medium">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterSection
