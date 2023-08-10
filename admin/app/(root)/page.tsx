import BlurImage from '@/commons/BlurImage'
import { Button } from '@/components/ui/button'

export default async function Home() {
  return (
    <div className='flex flex-col items-center justify-self-center gap-2'>
      <Button variant='destructive' className='mt-2'>
        This is button
      </Button>

      <BlurImage src={'/coffee.jpg'} alt={'coffee'} width={400} height={400} className='rounded-md mt-3' />
    </div>
  )
}
