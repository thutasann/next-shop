'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { GrGallery } from 'react-icons/gr'
import { BiTrash } from 'react-icons/bi'
import BlurImage from './blur-image'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  values: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, values }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {values.map(url => (
          <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
            <div className='z-10 absolute top-2 right-2'>
              <Button type='button' onClick={() => onRemove(url)} variant='destructive' size='sm'>
                <BiTrash className='h-4 w-4' />
              </Button>
            </div>
            <BlurImage fill className='object-cover' alt='Image' src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset='alluneed'>
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button type='button' disabled={disabled} variant='secondary' onClick={onClick}>
              <GrGallery className='h-4 w-4 mr-2' />
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
