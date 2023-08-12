import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import SettingsForm from './components/setting-form'

interface ISettingPage {
  params: {
    storeId: string
  }
}

async function SettingPage({ params: { storeId } }: ISettingPage) {
  const { userId } = auth()

  if (!userId) {
    redirect(`/sign-in`)
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  })

  if (!store) {
    redirect('/')
  }

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 px-8 pt-2'>
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}

export default SettingPage
