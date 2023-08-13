'use client'

import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import { FiPlus } from 'react-icons/fi'
import { columns, ColorColumn } from './columns'
import Heading from '@/components/ui/heading'
import ApiList from '@/components/ui/api-list'

interface ColorClientProps {
  data: ColorColumn[]
}

export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={`Colors (${data.length})`} description='Manage colors for your products' />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <FiPlus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' columns={columns} data={data} />
      <Heading title='API' description='API Calls for Colors' />
      <Separator />
      <ApiList entityName='colors' entityIdName='colorId' />
    </>
  )
}
