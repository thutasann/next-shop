'use client'

import { useStoreModal } from '@/hooks/use-store-modal'
import { Store } from '@prisma/client'
import { BiStoreAlt } from 'react-icons/bi'
import { useParams, useRouter } from 'next/navigation'
import React, { memo, useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'
import { HiChevronUpDown } from 'react-icons/hi2'
import { PopoverContent } from '@radix-ui/react-popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../ui/command'
import { AiOutlineCheck, AiOutlinePlusCircle } from 'react-icons/ai'

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>

interface IStoreSwitcher extends PopoverTriggerProps {
  items: Array<Store>
}

interface IStore {
  label: string
  value: string
}

function StoreSwitcher({ className, items = [] }: IStoreSwitcher) {
  const storeModal = useStoreModal()
  const params = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const transformedItems: Array<IStore> = items?.map(item => ({
    label: item.name,
    value: item.id,
  }))

  const currentStore = transformedItems?.find(item => item.value === params.storeId)

  const onStoreSelect = (store: IStore) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          aria-label='Select a store'
          role='combobox'
          aria-expanded={open}
          className={cn('w-[200px] bg-transparent backdrop-blur-md  justify-between', className)}
        >
          <BiStoreAlt className='mr-2 h-4 w-4' />
          <span>{currentStore?.label}</span>
          <HiChevronUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[200px] p-0'>
        <Command className='border mt-1'>
          <CommandList>
            <CommandInput placeholder='Search store...' />
            <CommandEmpty>No store found...</CommandEmpty>
            <CommandGroup heading='Stores'>
              {transformedItems?.map(item => (
                <CommandItem key={item.value} onSelect={() => onStoreSelect(item)} className='text-sm'>
                  <BiStoreAlt className='mr-2 h-4 w-4' />
                  <span>{item.label}</span>
                  <AiOutlineCheck className={cn('ml-auto h-4 w-4', currentStore?.value === item.value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />

          <CommandList>
            <CommandGroup>
              <CommandItem
                className='cursor-pointer'
                onSelect={() => {
                  setOpen(false)
                  storeModal.onOpen()
                }}
              >
                <AiOutlinePlusCircle className='mr-2 h-5 w-5' />
                <span>Create store</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default memo(StoreSwitcher)
