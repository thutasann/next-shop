'use client'

import { PostProps } from '@/types'
import React from 'react'

interface Props {
  post: PostProps
}

export const Post = ({ post }: Props) => {
  return (
    <div className='border rounded-md px-3 py-2 shadow-sm'>
      <p className='text-2xl font-semibold'>{post.title}</p>
      <p className='mt-2 text-slate-600'>{post.body}</p>
    </div>
  )
}
