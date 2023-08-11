import prismadb from '@/lib/prismadb'
import React from 'react'

interface IDashboardPage {
  params: { storeId: string }
}

const DashboardPage = async ({ params }: IDashboardPage) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  })

  return <div>Active store: {store?.name}</div>
}

export default DashboardPage
