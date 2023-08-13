import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'
import React from 'react'
import SizesClient from './components/sizes-client'
import { SizeColumn } from './components/columns'

async function CategoriesPage({ params }: { params: { storeId: string } }) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const transformedSizes: Array<SizeColumn> = sizes.map(item => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 px-8 pt-2'>
        <SizesClient data={transformedSizes} />
      </div>
    </div>
  )
}

export default CategoriesPage
