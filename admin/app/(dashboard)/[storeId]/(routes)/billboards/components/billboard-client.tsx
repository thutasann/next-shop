'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import React, { Fragment } from 'react'
import { FiPlus } from 'react-icons/fi'

function BillboardClient() {
  const router = useRouter()
  const params = useParams()

  return (
    <Fragment>
      <div className='flex items-center justify-between'>
        <Heading title={`Billboard (0)`} description='Manage billboards for your store' />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <FiPlus className='mr-2 w-4- h4' />
          Add New
        </Button>
      </div>
      <Separator />
    </Fragment>
  )
}

export default BillboardClient
