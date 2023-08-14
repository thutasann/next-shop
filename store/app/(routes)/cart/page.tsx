import Container from '@/components/ui/container'
import React from 'react'
import CartSection from './components/cart-section'
import Summary from './components/summary'

function CartPage() {
  return (
    <div className='bg-white'>
      <Container>
        <div className='mt-5 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-2xl font-bold'>Shopping Cart</h1>
          <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
            <div className='lg:col-span-7'>
              <CartSection />
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CartPage
