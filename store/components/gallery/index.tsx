'use client'

import type { Image as ImageType } from '@/types'
import { Tab } from '@headlessui/react'
import Image from 'next/image'
import React from 'react'
import GalleryTab from './gallery-tab'

interface IGallery {
  images: ImageType[]
}

const Gallery = ({ images }: IGallery) => {
  return (
    <Tab.Group as='div' className='flex flex-col-reverse'>
      <div className='mt-6 w-full max-w-2xl sm:block lg:max-w-none'>
        <Tab.List className='grid grid-cols-4 gap-6'>
          {images?.map(image => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className='aspect-square w-full'>
        {images.map(image => (
          <Tab.Panel key={image.id} className='border'>
            <div className='aspect-square relative h-ful w-full sm:rounded-lg overflow-hidden'>
              <Image
                priority
                fetchPriority='high'
                fill
                src={image.url}
                alt='Product'
                className='object-cover object-center'
                quality={100}
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Gallery
