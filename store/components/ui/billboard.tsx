import type { Billboard as BillboardType } from '@/types'
import React from 'react'
import BlurImage from '../blur-image'

interface IBillboard {
  data: BillboardType
}

export const revalidate = 0

function Billboard({ data }: IBillboard) {
  return (
    <div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden'>
      <div className='rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden'>
        <BlurImage src={data?.imageUrl} priority fetchPriority='high' fill alt='billbaord' />
        <div className='h-full w-full flex flex-col justify-center items-center text-center gap-y-8'>
          <div className='absolute font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs'>
            <h1 className='text-white'>{data.label}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billboard
