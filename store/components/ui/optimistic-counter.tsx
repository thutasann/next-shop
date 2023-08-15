'use client'

import { adjustLikes } from '@/actions/server-actions/adjust-likes'
import React from 'react'
import { experimental_useOptimistic as useOptmistic } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import Button from './button'

interface ICounter {
  likes: number
}

function OptimisticCounter({ likes }: ICounter) {
  const [optimisticLikes, addOptimisticLikes] = useOptmistic(likes, (state, amount) => state + Number(amount))

  const updateLikes = async (amount: number) => {
    addOptimisticLikes(amount)
    await adjustLikes(amount)
  }

  return (
    <div className='flex items-center space-x-3 border rounded-md p-5 mb-2'>
      <Button onClick={() => updateLikes(-1)} role='button' aria-label='minus' className='py-5'>
        <AiOutlineMinus />
      </Button>
      <p className='font-semibold text-base'>{optimisticLikes}</p>
      <Button onClick={() => updateLikes(1)} role='button' aria-label='plus' className='py-5'>
        <AiOutlinePlus />
      </Button>
    </div>
  )
}

export default OptimisticCounter
