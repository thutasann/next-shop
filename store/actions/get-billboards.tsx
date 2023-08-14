import { Billboard } from '@/types'
import { BASE_API_URL } from '@/utils/constants'

const URL = `${BASE_API_URL}billboards`

export const getBillboards = async (id: string): Promise<Billboard> => {
  const res = await fetch(`${URL}/${id}`)
  return res.json()
}
