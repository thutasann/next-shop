import { getCategory } from '@/actions/get-category'
import { getColors } from '@/actions/get-colors'
import { getProducts } from '@/actions/get-products'
import { getSizes } from '@/actions/get-sizes'
import Billboard from '@/components/ui/billboard'
import Container from '@/components/ui/container'
import React from 'react'

interface ICategoryPage {
  params: {
    categoryId: string
  }
  searchParams: {
    colorId: string
    sizeId: string
  }
}

async function CategoryPage({ params, searchParams }: ICategoryPage) {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  })
  const sizes = await getSizes()
  const colors = await getColors()
  const category = await getCategory(params.categoryId)
  console.log('category', category)

  return (
    <Container>
      <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center'>
        <Container>{/* <Billboard data={category.billboard} /> */}</Container>
      </div>
    </Container>
  )
}

export default CategoryPage
