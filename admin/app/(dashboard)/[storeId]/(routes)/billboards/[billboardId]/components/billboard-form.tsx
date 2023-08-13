'use client'

import ConfirmModal from '@/components/modals/confirm-modal'
import ApiAlert from '@/components/ui/api-alert'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { BillboardFormSchema } from '@/lib/validation-schemas'
import { useOrigin } from '@/hooks/use-origin'
import { Billboard } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BiTrash } from 'react-icons/bi'
import { z } from 'zod'
import ImageUpload from '@/components/ui/image-upload'

type BillboardFormValues = z.infer<typeof BillboardFormSchema>

interface IBillboardForm {
  initialData: Billboard | null
}

function BillboardForm({ initialData }: IBillboardForm) {
  const params = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit billboard' : 'Create billboard'
  const description = initialData ? 'Edit a billboard' : 'Add a new billboard'
  const toastMessage = initialData ? 'Billboard updated' : 'Billboard created'
  const action = initialData ? 'Save changes' : 'Create billlboard'

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(BillboardFormSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  })

  const handleSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
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
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast.success('Billboard deleted')
    } catch (error) {
      toast.error('Make sure you removed all categories using this billboard first.')
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
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    values={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={url => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='label'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder='Billboard Label' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </Fragment>
  )
}

export default BillboardForm
