interface FooterCopyrightProps {
  text?: string
}

const FooterCopyright = ({
  text = "© Copyright 2022. All Rights Reserved by Waifu Instruments",
}: FooterCopyrightProps) => {
  return (
    <div
      className=" mt-12 pt-6"
      style={{
        borderTop: '0.9px solid',
        borderImageSource: 'linear-gradient(90deg, rgba(194, 194, 194, 0) 0%, #C2C2C2 52%, rgba(194, 194, 194, 0) 100%)',
        borderImageSlice: 1
      }}
    >
      <p className="text-gray-400 text-sm text-center">{text}</p>
    </div>
  )
}

export default FooterCopyright
