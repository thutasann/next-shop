import prismadb from '@/lib/prismadb'
import React from 'react'
import SizeForm from './components/size-form'

async function SizePage({ params }: { params: { sizeId: string; storeId: string } }) {
  const size =
    params.sizeId.length < 24
      ? null
      : await prismadb.size.findUnique({
          where: {
            id: params.sizeId,
          },
        })

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 px-8 pt-2'>
        <SizeForm initialData={size} />
      </div>
    </div>
  )
}

export default SizePage
