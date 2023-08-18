'use client'

import { fetchBeers } from '@/actions/server-actions/fetch-beers'
import { Loader } from '@/components/ui/loader'
import { delay } from '@/lib/utils'
import { Beer } from '@/types'
import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Beers from './beers'

function LoadMore() {
  const [beers, setBeers] = useState<Beer[]>([])
  const [page, setPage] = useState(1)
  const { ref, inView } = useInView()

  const loadMoreBeers = async () => {
    await delay(200)
    const nextPage = (page % 7) + 1
    const newBeers = (await fetchBeers(nextPage)) ?? []
    setBeers((prev: Beer[]) => [...prev, ...newBeers])
    setPage(nextPage)
  }

  useEffect(() => {
    if (inView) {
      loadMoreBeers()
    }
  }, [inView])

  return (
    <>
      <Beers beers={beers} />
      <div className='flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3' ref={ref}>
        <Loader />
      </div>
    </>
  )
}

export default LoadMore
