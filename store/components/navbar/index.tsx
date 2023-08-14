import { getCategories } from '@/actions/get-categories'
import Link from 'next/link'
import React, { Fragment } from 'react'
import Container from '../ui/container'
import MainNav from './main-nav'
import NavActions from './nav-actions'

export const revalidate = 30

async function Navbar() {
  const categories = await getCategories()

  return (
    <Fragment>
      <div className='border-b backdrop-blur-md fixed left-0 w-full top-0 z-30'>
        <Container>
          <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center'>
            <Link
              href='/'
              className='ml-4 flex lg:ml-0 gap-x-2 text-xl font-bold hover:text-slate-700 focus:text-slate-700 focus:outline-none'
            >
              ALLUNEED
            </Link>
            <MainNav data={categories} />
            <NavActions />
          </div>
        </Container>
      </div>
      <div className='h-[60px]' />
    </Fragment>
  )
}

export default Navbar
