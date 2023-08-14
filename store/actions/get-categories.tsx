import { Category } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL, {
    next: {
      revalidate: 10,
    },
  })
  return res.json()
}
