'use client'

import ApiList from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import React, { Fragment } from 'react'
import { FiPlus } from 'react-icons/fi'
import { SizeColumn, columns } from './columns'

interface ISizes {
  data: Array<SizeColumn>
}

function SizesClient({ data }: ISizes) {
  const router = useRouter()
  const params = useParams()

  return (
    <Fragment>
      <div className='flex items-center justify-between'>
        <Heading title={`Sizes (${data.length})`} description='Manage sizes for your store' />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <FiPlus className='mr-2 w-4- h4' />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable searchKey='name' columns={columns} data={data} />
      <Separator />

      <Heading title='API' description='API calls for Categories' />

      <ApiList entityName='sizes' entityIdName='sizeId' />
    </Fragment>
  )
}

export default SizesClient
