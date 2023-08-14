import { BsSearch } from 'react-icons/bs'

const NoResults = () => {
  return (
    <div className='py-7 flex items-center justify-center h-full w-full text-neutral-500'>
      <div className='flex flex-col items-center justify-center gap-y-4'>
        <BsSearch className='h-7 w-7' />
        <span className='text-md'> No result found.</span>
      </div>
    </div>
  )
}

export default NoResults
