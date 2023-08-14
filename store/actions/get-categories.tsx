import { Category } from '@/types'
import { BASE_API_URL } from '@/utils/constants'

const URL = `${BASE_API_URL}categories`

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL)
  return res.json()
}
