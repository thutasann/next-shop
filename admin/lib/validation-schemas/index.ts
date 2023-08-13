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