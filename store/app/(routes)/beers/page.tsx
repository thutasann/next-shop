import { fetchBeers } from '@/actions/server-actions/fetch-beers'
import Container from '@/components/ui/container'
import React from 'react'
import Beers from './components/beers'
import LoadMore from './components/load-more'

async function BeersPage() {
  const beers = await fetchBeers(1)

  return (
    <Container>
      <div className='container mx-auto px-4 py-8 min-h-screen max-w-5xl'>
        <h1 className='text-3xl font-bold mb-4 text-center'>Infinite Beers</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          <Beers beers={beers} />
          <LoadMore />
        </div>
      </div>
    </Container>
  )
}

export default BeersPage
