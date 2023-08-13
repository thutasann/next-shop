'use client'

import ConfirmModal from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { CategoryFormSchema } from '@/lib/validation-schemas'
import { Billboard, Category } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BiTrash } from 'react-icons/bi'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type CaregoryFormValues = z.infer<typeof CategoryFormSchema>

interface ICategoyForm {
  initialData: Category | null
  billboards: Billboard[]
}

function CategoryForm({ initialData, billboards }: ICategoyForm) {
  const params = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit category' : 'Create category'
  const description = initialData ? 'Edit a category' : 'Add a new category'
  const toastMessage = initialData ? 'Category updated' : 'Category created'
  const action = initialData ? 'Save changes' : 'Create category'

  const form = useForm<CaregoryFormValues>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: initialData || {
      name: '',
      billboardId: '',
    },
  })

  const handleSubmit = async (data: CaregoryFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/categories`)
      toast.success(toastMessage)
    } catch (error) {
      toast.error(`Something went wrong`)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setOpen(true)
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
      router.refresh()
      router.push(`/${params.storeId}/categories`)
      toast.success('categories deleted')
    } catch (error) {
      toast.error('Make sure you removed all products using this category first.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Fragment>
      <ConfirmModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />

      <div className='flex items-center justify-between'>
        <Heading isDetail title={title} description={description} />
        {initialData ? (
          <Button variant='destructive' size='sm' onClick={() => setOpen(true)}>
            <BiTrash className='h-4 w-4' />
          </Button>
        ) : null}
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8 w-full'>
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Category Name' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='billboardId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder='Select a billboard' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards?.map(billboard => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>

      <Separator />
    </Fragment>
  )
}

export default CategoryForm
