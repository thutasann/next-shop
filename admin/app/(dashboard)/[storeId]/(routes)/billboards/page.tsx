import React from 'react'
import BillboardClient from './components/billboard-client'

function BillboardsPage() {
  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 px-8 pt-2'>
        <BillboardClient />
      </div>
    </div>
  )
}

export default BillboardsPage
