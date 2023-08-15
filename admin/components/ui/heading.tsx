'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { BiSolidChevronLeft } from 'react-icons/bi'

interface IHeading {
  title: string
  description: string
  isDetail?: boolean
}

function Heading({ title, description, isDetail }: IHeading) {
  const router = useRouter()

  return (
    <div>
      {isDetail ? (
        <button className='mb-4' type='button' aria-label='back button' onClick={() => router.back()}>
          <BiSolidChevronLeft className='w-6 h-6 hover:text-slate-600 ' />
        </button>
      ) : null}
      <h1 className='text-2xl font-extrabold tracking-tight'>{title}</h1>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  )
}

export default Heading
