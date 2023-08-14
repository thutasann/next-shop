'use client'

import { Color, Size } from '@/types'
import React from 'react'
import { BsPlus } from 'react-icons/bs'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Filter from './filter'
import ClearFilter from './clear-filter'

interface IMobileFilters {
  sizes: Size[]
  colors: Color[]
}

function MobileFilters({ sizes, colors }: IMobileFilters) {
  return (
    <Sheet>
      <SheetTrigger className='flex items-center gap-3 rounded-full bg-black border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold hover:opacity-75 transition'>
        Filters
        <BsPlus size={20} />
      </SheetTrigger>
      <SheetContent>
        <div className='p-4'>
          <ClearFilter />
          <Filter valueKey='sizeId' name='Sizes' data={sizes} />
          <Filter valueKey='colorId' name='Colors' data={colors} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileFilters
