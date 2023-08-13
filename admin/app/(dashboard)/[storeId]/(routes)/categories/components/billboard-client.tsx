'use client'

import ApiList from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import React, { Fragment } from 'react'
import { FiPlus } from 'react-icons/fi'
import { CategoryColumn, columns } from './columns'

interface IBillboardClient {
  data: Array<CategoryColumn>
}

function BillboardClient({ data }: IBillboardClient) {
  const router = useRouter()
  const params = useParams()

  return (
    <Fragment>
      <div className='flex items-center justify-between'>
        <Heading title={`Categories (${data.length})`} description='Manage categories for your store' />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <FiPlus className='mr-2 w-4- h4' />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable searchKey='name' columns={columns} data={data} />
      <Separator />

      <Heading title='API' description='API calls for Categories' />

      <ApiList entityName='categories' entityIdName='categoryId' />
    </Fragment>
  )
}

export default BillboardClient
