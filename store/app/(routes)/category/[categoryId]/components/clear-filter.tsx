'use client'

import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'

function ClearFilter() {
  const router = useRouter()
  const parmas = useParams()

  return (
    <>
      <p
        onClick={() => router.push(`/category/${parmas.categoryId}`)}
        role='button'
        aria-hidden
        className='
        flex items-center gap-2
            text-md font-bold group cursor-pointer'
      >
        <span className='group-hover:text-slate-600'>Remove Filter</span> <FaDeleteLeft className='group-hover:text-slate-600' size={20} />
      </p>
      <hr className='my-4' />
    </>
  )
}

export default ClearFilter
