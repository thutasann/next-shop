'use client'

import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { ColorColumn } from './columns'
import ConfirmModal from '@/components/modals/confirm-modal'
import { IoIosMore } from 'react-icons/io'
import { BiCopy } from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'

interface CellActionProps {
  data: ColorColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onConfirm = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/colors/${data.id}`)
      toast.success('Color deleted.')
      router.refresh()
    } catch (error) {
      toast.error('Make sure you removed all products using this color first.')
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success('Color ID copied to clipboard.')
  }

  return (
    <>
      <ConfirmModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IoIosMore className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <BiCopy className='mr-2 h-4 w-4' />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}>
            <AiOutlineEdit className='mr-2 h-4 w-4' />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <BsTrash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
