import getBase64 from '@/lib/utils'
import Image from 'next/image'

export default async function Home() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN_URL

  const myBlurDataUrl = await getBase64(`${domain}/coffee.jpg`)

  return <Image src='/coffee.jpg' alt='coffee' width={400} height={400} placeholder='blur' blurDataURL={myBlurDataUrl} quality={100} />
}
