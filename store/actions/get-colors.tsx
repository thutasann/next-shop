import { Color } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`

export const getColors = async (): Promise<Color[]> => {
  const res = await fetch(URL, {
    next: {
      revalidate: 3,
    },
  })
  return res.json()
}
