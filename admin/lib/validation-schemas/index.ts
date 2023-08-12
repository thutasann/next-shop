import { z } from 'zod'

export const StoreModalFormSchema = z.object({
  name: z.string().min(1),
})

export const SettingFormSchema = z.object({
  name: z.string().min(1),
})
