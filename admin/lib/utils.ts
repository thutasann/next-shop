import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getPlaiceholder } from 'plaiceholder'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl)

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`)
    }

    const buffer = await res.arrayBuffer()

    const { base64 } = await getPlaiceholder(Buffer.from(buffer))

    return base64
  } catch (e) {
    if (e instanceof Error) console.log(e.stack)
  }
}
