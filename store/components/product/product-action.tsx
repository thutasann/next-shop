'use client'

import { usePreviewModal } from '@/hooks/use-preview-modal'
import { Product } from '@/types'
import React, { MouseEventHandler } from 'react'
import { AiOutlineExpand, AiOutlineShoppingCart } from 'react-icons/ai'
import IconButton from '../ui/icon-button'

interface IProductAction {
  data: Product
}

function ProductAction({ data }: IProductAction) {
  const previewModal = usePreviewModal()

  const handlePreview: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation()
    previewModal.onOpen(data)
  }

  return (
    <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
      <div className='flex gap-x-6 justify-center'>
        <IconButton onClick={handlePreview} icon={<AiOutlineExpand size={20} className='text-gray-600' />} />
        <IconButton onClick={() => {}} icon={<AiOutlineShoppingCart size={20} className='text-gray-600' />} />
      </div>
    </div>
  )
}

export default ProductAction
