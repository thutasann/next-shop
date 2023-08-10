import BlurImage from '@/commons/BlurImage'

export default async function Home() {
  return (
    <div className='flex flex-col items-center justify-self-center gap-2'>
      <BlurImage src={'/coffee.jpg'} alt={'coffee'} width={400} height={400} className='rounded-md mt-3' />
    </div>
  )
}
