import { Product } from '@/types'
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
        <BlurImage
          className='group-hover:scale-110 transition-all duration-300 ease-in-out'
          src={data?.images[0].url}
          fill
          alt={data.name}
        />
        <ProductAction data={data} />
      </div>
      <div>
        <p className='font-semibold text-lg mb-1'>{data.name}</p>
        <p className='text-xs text-gray-100 bg-slate-600 w-fit px-3 py-1 rounded-full'>{data.category.name}</p>
      </div>

      <div className='flex items-center justify-between'>
        <Currency value={data.price} />
      </div>
    </div>
  )
}

export default ProductCard
