'use client'

import { HiServerStack } from 'react-icons/hi2'
import { Alert, AlertDescription, AlertTitle } from './alert'
import { Badge, BadgeProps } from './badge'
import { Button } from './button'
import { FiCopy } from 'react-icons/fi'
import { toast } from 'react-hot-toast'

interface IApiAlert {
  title: string
  description: string
  variant: 'public' | 'admin'
}

const textMap: Record<IApiAlert['variant'], string> = {
  public: 'public',
  admin: 'Admin',
}

const variantMap: Record<IApiAlert['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
}

function ApiAlert({ title, description, variant }: IApiAlert) {
  const handleCopy = (description: string) => {
    navigator.clipboard.writeText(description)
    toast.success('API Route copied to clipboard')
  }

  return (
    <Alert>
      <HiServerStack className='h-4 w-4 mt-1' />
      <AlertTitle className='flex items-center gap-2'>
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className='mt-4 flex items-center justify-between'>
        <code className='relative rounded-lg bg-muted px-[0.5rem] py-[0.2rem] font-mono text-sm font-semibold'>{description}</code>
        <Button variant='outline' size='icon' onClick={() => handleCopy(description)}>
          <FiCopy />
        </Button>
      </AlertDescription>
    </Alert>
  )
}

export default ApiAlert
