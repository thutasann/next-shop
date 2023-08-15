'use client'

import { Product } from '@/types'
import React, { MouseEventHandler } from 'react'
import Button from '../ui/button'
import Currency from '../ui/currency'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useCart } from '@/hooks/use-cart'

interface IProductInfo {
  data: Product
}

function ProductInfo({ data }: IProductInfo) {
  const cart = useCart()

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation()
    cart.addItem(data)
  }

  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>{data.name}</h1>
      <div className='mt-3 flex items-end justify-between'>
        <p className='text-2xl text-gray-900'>
          <Currency value={data.price} />
        </p>
      </div>
      <hr className='my-4' />
      <div className='flex items-center gap-x-4'>
        <h3 className='font-semibold text-blas'>Size: </h3>
        {data.size.value}
      </div>
      <div className='mt-3 flex items-center gap-x-4'>
        <h3 className='font-semibold text-blas'>Color: </h3>
        <div
          className='h-7 w-7 rounded-full border'
          style={{
            backgroundColor: data?.color?.value,
          }}
        />
      </div>
      <div className='mt-7 flex items-center gap-x-3'>
        <Button className='flex items-center gap-x-3' onClick={handleAddToCart}>
          Add to cart
          <AiOutlineShoppingCart className='w-6 h-6' />
        </Button>
      </div>
    </div>
  )
}

export default ProductInfo
