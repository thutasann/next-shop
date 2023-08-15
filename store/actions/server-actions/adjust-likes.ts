'use server'

import { revalidateTag } from 'next/cache'

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL

export const adjustLikes = async (amount: number) => {
  if (!amount) return

  await fetch(`${DOMAIN_URL}api/likes`, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({
      amount,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  })
  revalidateTag('likes')
}
