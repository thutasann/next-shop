'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/utils/utils'
import { Category } from '@/types'

interface IMainNav {
  data: Category[]
}

function MainNav({ data }: IMainNav) {
  const pathname = usePathname()

  const routes = data.map(route => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }))

  return (
    <div className='mx-6 flex items-center space-x-4 lg:space-x-6'>
      {routes?.map(route => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary hover:underline focus:outline-none focus:underline',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  )
}

export default MainNav
