import getBase64 from '@/utils/getBase64'
import Image from 'next/image'

interface IBlurImage {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  quality?: number
  laoding?: 'lazy' | 'eager'
  fetchPriority?: 'auto' | 'high' | 'low'
  isExternal?: boolean
}

async function BlurImage({
  src,
  alt,
  fill,
  className,
  width,
  height,
  priority,
  laoding,
  quality,
  fetchPriority,
  isExternal,
  ...props
}: // @ts-ignore
IBlurImage): any {
  const myBlurDataUrl = await getBase64(src)
  return (
    <Image
      {...props}
      src={src}
      width={width}
      height={height}
      placeholder='blur'
      blurDataURL={myBlurDataUrl}
      loading={laoding}
      className={className}
      alt={alt}
      fill={fill}
      priority={priority}
      quality={quality}
      fetchPriority={fetchPriority}
    />
  )
}

export default BlurImage
