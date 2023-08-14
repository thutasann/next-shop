'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuLabel, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import React, { useState } from 'react'
import { ProductColumn } from './columns'
import { IoIosMore } from 'react-icons/io'
import { AiOutlineEdit } from 'react-icons/ai'
import { BiCopy, BiTrash } from 'react-icons/bi'
import { toast } from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import ConfirmModal from '@/components/modals/confirm-modal'

interface ICellAction {
  data: ProductColumn
}

function CellAction({ data }: ICellAction) {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success('Product ID copied to clipboard')
  }

  const onDelete = async () => {
    try {
      setOpen(true)
      await axios.delete(`/api/${params.storeId}/products/${data.id}`)
      router.refresh()
      toast.success('Product deleted')
    } catch (error) {
      toast.error('Make sure you removed all categories using this billboard first.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <ConfirmModal loading={loading} isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IoIosMore className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className='cursor-pointer' onClick={() => handleCopy(data.id)}>
            <BiCopy className='mr-2 h-4 w-4' />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}>
            <AiOutlineEdit className='mr-2 h-4 w-4' />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' onClick={() => setOpen(true)}>
            <BiTrash className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction
