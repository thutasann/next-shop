import { UserButton } from '@clerk/nextjs'

export default function SetupPage() {
  return (
    <div className='flex flex-col items-center justify-self-center gap-2'>
      <UserButton afterSignOutUrl='/' />
    </div>
  )
}
