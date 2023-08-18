import { getProducts } from '@/actions/get-products'
import { getServerSideSitemap } from 'next-sitemap'

interface IProductPage {
  params: {
    productId: string
  }
}

export const getServerSideProps = async (ctx: any, { params }: IProductPage) => {
  const products = await getProducts({ isFeatured: true })

  const dynamicRoutes = products.map(prod => `https://alluneed.vercel.app/product/${prod.id}`)

  const fields = [
    {
      loc: `https://alluneed.vercel.app/prodcut/${dynamicRoutes}`,
      lastmod: new Date().toISOString(),
    },
  ]

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
