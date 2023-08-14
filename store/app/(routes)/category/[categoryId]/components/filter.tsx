'use client'

import { Color, Size } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import qs from 'query-string'
import Button from '@/components/ui/button'
import { cn } from '@/utils/utils'

interface IFilter {
  valueKey: string
  name: string
  data: (Size | Color)[]
}

function Filter({ valueKey, name, data }: IFilter) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedValue = searchParams.get(valueKey)

  const handleFilter = (id: string) => {
    const current = qs.parse(searchParams.toString())

    const query = {
      ...current,
      [valueKey]: id,
    }

    if (current[valueKey] === id) {
      query[valueKey] = null
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
      }
    )

    console.log('url', url)

    router.push(url)
  }

  return (
    <div className='mb-8'>
      <h3 className='text-lg font-semibold'>{name}</h3>
      <hr className='my-4' />
      <div className='flex flex-wrap gap-2'>
        {data.map((filter, idx) => (
          <div className='flex items-center' key={idx}>
            <Button
              className={cn(
                'rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300',
                selectedValue === filter.id ? 'bg-black text-white' : ''
              )}
              onClick={() => handleFilter(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter
