import { Beer } from '@/types'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import BlurImage from '@/components/blur-image'
import Image from 'next/image'

export interface IBeers {
  beers: Beer[] | undefined
}

function Beers({ beers }: IBeers) {
  return (
    <>
      {beers ? (
        beers.map(beer => {
          return (
            <Card key={beer.id} className='backdrop-blur-md'>
              <CardContent className='flex flex-col items-center justify-center p-4'>
                <Image
                  width={50}
                  height={50}
                  src={beer.image_url}
                  quality={100}
                  fetchPriority='auto'
                  alt={beer.name}
                  className='object-contain rounded'
                />
              </CardContent>
              <CardFooter className='text-center flex flex-col p-4'>
                <CardTitle className='my-2'>{beer.name}</CardTitle>
                <CardDescription>{beer.tagline}</CardDescription>
              </CardFooter>
            </Card>
          )
        })
      ) : (
        <div className='text-xl font-bold'>No beers available !! </div>
      )}
    </>
  )
}

export default Beers
