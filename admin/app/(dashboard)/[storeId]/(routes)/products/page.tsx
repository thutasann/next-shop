import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'
import React from 'react'
import ProductClient from './components/product-client'
import { ProductColumn } from './components/columns'
import { formatter } from '@/lib/utils'

async function ProductsPage({ params }: { params: { storeId: string } }) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const transformedProducts: ProductColumn[] = products.map(item => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    category: item.category.name,
    size: item.category.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 px-8 pt-2'>
        <ProductClient data={transformedProducts} />
      </div>
    </div>
  )
}

export default ProductsPage
