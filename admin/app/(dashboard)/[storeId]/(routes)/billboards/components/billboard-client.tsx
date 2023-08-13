'use client'

import ApiList from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import React, { Fragment } from 'react'
import { FiPlus } from 'react-icons/fi'
import { BillboardColumn, columns } from './columns'

interface IBillboardClient {
  data: Array<BillboardColumn>
}

function BillboardClient({ data }: IBillboardClient) {
  const router = useRouter()
  const params = useParams()

  return (
    <Fragment>
      <div className='flex items-center justify-between'>
        <Heading title={`Billboard (${data.length})`} description='Manage billboards for your store' />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <FiPlus className='mr-2 w-4- h4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='label' columns={columns} data={data} />
      <Separator />

      <Heading title='API' description='API calls for Billboards' />

      <ApiList entityName='billboards' entityIdName='billboardId' />
    </Fragment>
  )
}

export default BillboardClient
