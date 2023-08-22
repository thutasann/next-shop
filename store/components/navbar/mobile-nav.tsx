'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Category } from '@/types'
import Link from 'next/link'

interface IMobileNav {
  categories: Category[]
}

function Mobilenav({ categories }: IMobileNav) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='bg-transparent'>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            {categories?.map(cate => (
              <Link href={`/category/${cate.id}`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{cate.name}</NavigationMenuLink>
              </Link>
            ))}
            <Link href={`/beers`} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Beers</NavigationMenuLink>
            </Link>
            <Link href={`/posts`} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Posts</NavigationMenuLink>
            </Link>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Mobilenav
