import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'
import React from 'react'
import BillboardClient from './components/billboard-client'
import { BillboardColumn } from './components/columns'

async function BillboardsPage({ params }: { params: { storeId: string } }) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const transformedBillboards: BillboardColumn[] = billboards.map(item => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 px-8 pt-2'>
        <BillboardClient data={transformedBillboards} />
      </div>
    </div>
  )
}

export default BillboardsPage
