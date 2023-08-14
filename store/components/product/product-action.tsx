'use client'

import { Product } from '@/types'
import React from 'react'
import { AiOutlineExpand, AiOutlineShoppingCart } from 'react-icons/ai'
import IconButton from '../ui/icon-button'

interface IProductAction {
  data: Product
}

function ProductAction({ data }: IProductAction) {
  return (
    <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
      <div className='flex gap-x-6 justify-center'>
        <IconButton onClick={() => {}} icon={<AiOutlineExpand size={20} className='text-gray-600' />} />
        <IconButton onClick={() => {}} icon={<AiOutlineShoppingCart size={20} className='text-gray-600' />} />
      </div>
    </div>
  )
}

export default ProductAction
