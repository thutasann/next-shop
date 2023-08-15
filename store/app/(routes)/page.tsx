import { getBillboards } from '@/actions/get-billboards'
import { getProducts } from '@/actions/get-products'
import ProductList from '@/components/product/product-list'
import Billboard from '@/components/ui/billboard'
import Container from '@/components/ui/container'

export default async function Home() {
  const billboard = await getBillboards(`64d89a558bb197637b1da584`)
  const products = await getProducts({ isFeatured: true })
  console.log('products', products)

  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard data={billboard} />
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
          <ProductList title='Featured Products' items={products} />
        </div>
      </div>
    </Container>
  )
}
