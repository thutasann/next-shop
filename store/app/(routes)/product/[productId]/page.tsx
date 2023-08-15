import { getProduct } from '@/actions/get-product'
import { getProducts } from '@/actions/get-products'
import Gallery from '@/components/gallery'
import ProductInfo from '@/components/gallery/product-info'
import ProductList from '@/components/product/product-list'
import Container from '@/components/ui/container'
import Counter from '@/components/ui/counter'
import OptimisticCounter from '@/components/ui/optimistic-counter'
import React from 'react'

interface IProductPage {
  params: {
    productId: string
  }
}

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL

async function ProductPage({ params }: IProductPage) {
  const product = await getProduct(params.productId)

  const suggestedProducts = await getProducts({
    categoryId: product?.category.id,
  })

  const res = await fetch(`${DOMAIN_URL}api/likes`, {
    cache: 'no-cache',
    next: {
      tags: ['likes'],
    },
  })

  const { likes } = await res.json()

  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-10 sm:px-6 lg:px-8'>
          <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
            <Gallery images={product.images} />
            <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
              <ProductInfo data={product} />
            </div>
          </div>
          <hr className='my-10' />
          <h3 className='font-bold text-2xl mb-3'>Total likes </h3>
          <OptimisticCounter likes={likes} />
          <hr className='my-10' />
          <ProductList title='Related Items' items={suggestedProducts} />
        </div>
      </Container>
    </div>
  )
}

export default ProductPage
