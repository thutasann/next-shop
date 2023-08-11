import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind ClassNames merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
