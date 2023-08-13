import { z } from 'zod'

export const StoreModalFormSchema = z.object({
  name: z.string().min(1),
})

export const SettingFormSchema = z.object({
  name: z.string().min(1),
})

export const BillboardFormSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
})

export const CategoryFormSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
})

export const SizeFormSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
})
