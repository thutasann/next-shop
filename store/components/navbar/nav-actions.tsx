'use client'

import { useCart } from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Button from '../ui/button'

function NavActions() {
  const router = useRouter()
  const { items } = useCart()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className='ml-auto flex items-center gap-x-4'>
      <Button
        onClick={() => router.push(`/cart`)}
        className='flex items-center rounded-full px-4 py-2'
        aria-label='shopping cart button'
        role='button'
      >
        <AiOutlineShoppingCart size={20} color='white' />
        <span className='ml-2 text-sm font-medium text-white'>{items.length}</span>
      </Button>
    </div>
  )
}

export default NavActions
