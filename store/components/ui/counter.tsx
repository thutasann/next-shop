'use client'

import { adjustLikes } from '@/actions/server-actions/adjust-likes'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import Button from './button'

interface ICounter {
  likes: number
}

function Counter({ likes }: ICounter) {
  return (
    <div className='flex items-center space-x-3 border rounded-md p-5 mb-2'>
      <Button onClick={() => adjustLikes(-1)} role='button' aria-label='minus' className='py-5'>
        <AiOutlineMinus />
      </Button>
      <p className='font-semibold text-base'>{likes}</p>
      <Button onClick={() => adjustLikes(1)} role='button' aria-label='plus' className='py-5'>
        <AiOutlinePlus />
      </Button>
    </div>
  )
}

export default Counter
