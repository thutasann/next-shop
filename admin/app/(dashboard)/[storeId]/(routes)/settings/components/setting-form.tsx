'use client'

import ConfirmModal from '@/components/modals/confirm-modal'
import ApiAlert from '@/components/ui/api-alert'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useOrigin } from '@/hooks/use-origin'
import { SettingFormSchema } from '@/lib/validation-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@prisma/client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BiTrash } from 'react-icons/bi'
import { z } from 'zod'

interface ISettingsForm {
  initialData: Store
}

type SettingFormValues = z.infer<typeof SettingFormSchema>

function SettingsForm({ initialData }: ISettingsForm) {
  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(SettingFormSchema),
    defaultValues: initialData,
  })

  const handleSubmit = async (data: SettingFormValues) => {
    try {
      setLoading(true)
      await axios.patch(`/api/stores/${params.storeId}`, data)
      router.refresh()
      toast.success('Store updated')
    } catch (error) {
      toast.error(`Something went wrong`)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setOpen(true)
      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push('/')
      toast.success('Store deleted')
    } catch (error) {
      toast.error('Make sure you removed all products and categories first.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Fragment>
      <ConfirmModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className='flex items-center justify-between'>
        <Heading title='Settings' description='Manage store preference' />
        <Button variant='destructive' size='sm' onClick={() => setOpen(true)}>
          <BiTrash className='h-4 w-4' />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8 w-full'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder='Store name' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={loading} className='ml-auto' type='submit'>
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />

      <ApiAlert variant='public' title='text' description={`${origin}/api/${params.storeId}`} />
    </Fragment>
  )
}

export default SettingsForm
