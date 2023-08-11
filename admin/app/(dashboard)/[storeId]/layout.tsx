import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function DashbaordLayout({ children, params }: { children: React.ReactNode; params: { storeId: string } }) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userID: userId,
    },
  })

  if (!store) {
    redirect('/')
  }

  return (
    <div>
      This will be a navbar
      {children}
    </div>
  )
}
