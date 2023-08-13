import prismadb from '@/lib/prismadb'
import React from 'react'
import CategoryForm from './components/category-form'

async function CategoryPage({ params }: { params: { categoryId: string; storeId: string } }) {
  const category =
    params.categoryId.length < 24
      ? null
      : await prismadb.category.findUniqueOrThrow({
          where: {
            id: params.categoryId,
          },
        })

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 px-8 pt-2'>
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  )
}

export default CategoryPage
