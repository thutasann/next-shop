'use client'

import { useStoreModal } from '@/hooks/use-store-modal'
import { Modal } from '../modal'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { StoreModalFormSchema } from '@/lib/validation-schemas'

export const StoreModal = () => {
  const storeModal = useStoreModal()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof StoreModalFormSchema>>({
    resolver: zodResolver(StoreModalFormSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof StoreModalFormSchema>) => {
    try {
      setLoading(true)
      const response = await axios.post(`/api/stores`, values)
      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      toast.error(`Something went wrong`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title='Create store'
      description='Add a new store to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={() => storeModal.onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder='Eg. E-Commerce' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end'>
                <Button disabled={loading} variant='outline' onClick={storeModal.onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} variant='default' type='submit'>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
