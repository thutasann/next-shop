import { Product } from '@/types'
import React from 'react'
import NoResults from '../ui/no-result'
import ProductCard from './product-card'

interface IProductList {
  title: string
  items: Product[]
}

function ProductList({ title, items }: IProductList) {
  return (
    <div className='space-y-4'>
      <h2 className='font-bold text-2xl'>{title}</h2>
      {items.length === 0 ? (
        <NoResults />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {items.map((item, idx) => (
            <ProductCard key={idx} data={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
