'use client'

import ConfirmModal from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ProductFormSchema } from '@/lib/validation-schemas'
import { Category, Color, Image, Product, Size } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BiTrash } from 'react-icons/bi'
import { z } from 'zod'
import ImageUpload from '@/components/ui/image-upload'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

type ProductFormValues = z.infer<typeof ProductFormSchema>

interface IProductForm {
  initialData:
    | (Product & {
        images: Image[]
      })
    | null

  categories: Category[]
  sizes: Size[]
  colors: Color[]
}

function ProductForm({ initialData, categories, sizes, colors }: IProductForm) {
  const params = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit product' : 'Create product'
  const description = initialData ? 'Edit a product' : 'Add a new product'
  const toastMessage = initialData ? 'Product updated' : 'Product created'
  const action = initialData ? 'Save changes' : 'Create product'

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: '',
          images: [],
          price: 0,
          categoryId: '',
          colorId: '',
          sizeId: '',
          isFeatured: false,
          isArchived: false,
        },
  })

  const handleSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data)
      } else {
        await axios.post(`/api/${params.storeId}/products`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/products`)
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
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
      router.refresh()
      router.push(`/${params.storeId}/products`)
      toast.success('Product deleted')
    } catch (error) {
      toast.error('Something went wrong')
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
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    values={field.value.map(image => image.url)}
                    disabled={loading}
                    onChange={url => field.onChange([...field.value, { url }])}
                    onRemove={url => field.onChange([...field.value.filter(current => current.url !== url)])}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Product name' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder='Product price' {...field} />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder='Select a category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sizeId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder='Select a size' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes?.map(size => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='colorId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder='Select a color' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors?.map(color => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='isFeatured'
              render={({ field }) => {
                return (
                  <FormItem className='flex flex-rwo items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox className='mt-1' checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>This product will appear on the home page</FormDescription>
                    </div>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name='isArchived'
              render={({ field }) => {
                return (
                  <FormItem className='flex flex-rwo items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox className='mt-1' checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>This product will not appear anywhere in the store.</FormDescription>
                    </div>
                  </FormItem>
                )
              }}
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

export default ProductForm
