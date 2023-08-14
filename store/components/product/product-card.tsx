import { Product } from '@/types'
import Link from 'next/link'
import React from 'react'
import BlurImage from '../blur-image'
import Currency from '../ui/currency'
import ProductAction from './product-action'

interface IProductCard {
  data: Product
}

function ProductCard({ data }: IProductCard) {
  return (
    <div className='bg-white group cursor-pointer rounded-xl border p-3 space-y-4'>
      <div className='group aspect-square rounded-xl bg-gray-100 relative'>
        <Link href={`/product/${data.id}`}>
          <BlurImage
            className='group-hover:scale-110 transition-all duration-300 ease-in-out'
            src={data?.images[0].url}
            fill
            alt={data.name}
          />
        </Link>
        <ProductAction data={data} />
      </div>
      <div>
        <Link href={`/product/${data.id}`} className='focus:outline-none font-semibold group-hover:underline text-lg'>
          {data.name}
        </Link>
        <p className='mt-1 text-xs text-gray-100 bg-slate-600 w-fit px-3 py-1 rounded-full'>{data.category.name}</p>
      </div>

      <div className='flex items-center justify-between'>
        <Currency value={data.price} />
      </div>
    </div>
  )
}

export default ProductCard
