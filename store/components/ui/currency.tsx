'use client'

import { formatter } from '@/utils/utils'
import React from 'react'

interface ICurrency {
  value?: string | number
}

function Currency({ value }: ICurrency) {
  return <div className='font-semibold'>{formatter.format(Number(value))}</div>
}

export default Currency
