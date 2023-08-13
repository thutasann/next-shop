import prismadb from '@/lib/prismadb'
import React from 'react'
import BillboardForm from './components/billboard-form'

async function BillboardPage({ params }: { params: { billboardId: string } }) {
  const billboard =
    params.billboardId.length < 24
      ? null
      : await prismadb.billboard.findUnique({
          where: {
            id: params.billboardId,
          },
        })

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 px-8 pt-2'>
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}

export default BillboardPage
