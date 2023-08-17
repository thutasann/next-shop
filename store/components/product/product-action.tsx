'use client'

import { usePreviewModal } from '@/hooks/use-preview-modal'
import { useCart } from '@/hooks/use-cart'
import { Product } from '@/types'
import React, { MouseEventHandler } from 'react'
import { AiOutlineExpand, AiOutlineShoppingCart } from 'react-icons/ai'
import IconButton from '../ui/icon-button'

interface IProductAction {
  data: Product
}

function ProductAction({ data }: IProductAction) {
  const previewModal = usePreviewModal()
  const cart = useCart()

  const handlePreview: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation()
    previewModal.onOpen(data)
  }

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation()
    cart.addItem(data)
  }

  return (
    <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
      <div className='flex gap-x-6 justify-center'>
        <IconButton
          onClick={handlePreview}
          icon={<AiOutlineExpand size={20} className='text-gray-600' />}
          role='button'
          aria-label='preview'
        />
        <IconButton
          onClick={handleAddToCart}
          icon={<AiOutlineShoppingCart size={20} className='text-gray-600' />}
          role='button'
          aria-label='add to cart'
        />
      </div>
    </div>
  )
}

export default ProductAction
