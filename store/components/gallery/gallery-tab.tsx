import type { Image as ImageType } from '@/types'
import React from 'react'
import { cn } from '@/utils/utils'
import { Tab } from '@headlessui/react'
import Image from 'next/image'

interface IGalleryTab {
  image: ImageType
}

function GalleryTab({ image }: IGalleryTab) {
  return (
    <Tab className='relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white'>
      {({ selected }) => (
        <div>
          <span className='absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md'>
            <Image loading='lazy' fill src={image.url} alt='product' className='object-cover object-center' quality={100} />
          </span>
          <span
            className={cn('absolute outline-none inset-0 rounded-md ring-1 ring-offset-1', selected ? 'ring-black' : 'ring-transparent')}
          />
        </div>
      )}
    </Tab>
  )
}

export default GalleryTab
