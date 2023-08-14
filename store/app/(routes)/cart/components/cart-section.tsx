'use client'

import { useCart } from '@/hooks/use-cart'
import React, { useEffect, useState } from 'react'
import CartItem from './cart-item'

function CartSection() {
  const [isMounted, setIsMounted] = useState(false)
  const cart = useCart()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      {cart.items.length === 0 && <p className='text-neutral-500'>No items added to cart</p>}
      <ul>
        {cart.items.map(item => (
          <CartItem key={item.id} data={item} />
        ))}
      </ul>
    </>
  )
}

export default CartSection
