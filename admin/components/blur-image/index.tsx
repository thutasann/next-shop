import getBase64 from '@/lib/getBase64'
import Image from 'next/image'

interface IBlurImage {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
}

function BlurImage({ src, alt, fill, className, width, height, priority, ...props }: IBlurImage) {
  const domain = process.env.NEXT_PUBLIC_DOMAIN_URL

  return (
    <Image
      {...props}
      src={src}
      width={width}
      height={height}
      placeholder='blur'
      blurDataURL={src}
      loading='lazy'
      className={className}
      alt={alt}
      fill={fill}
      priority={priority}
    />
  )
}

export default BlurImage
