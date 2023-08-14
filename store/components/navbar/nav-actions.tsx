'use client'

import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Button from '../ui/button'

function NavActions() {
  return (
    <div className='ml-auto flex items-center gap-x-4'>
      <Button className='flex items-center rounded-full px-4 py-2' aria-label='shopping cart button' role='button'>
        <AiOutlineShoppingCart size={20} color='white' />
        <span className='ml-2 text-sm font-medium text-white'>0</span>
      </Button>
    </div>
  )
}

export default NavActions
