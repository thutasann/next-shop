'use client'

import { queryClientOptions } from '@/lib/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode, useState } from 'react'

interface IReactQueryProvider {
  children: ReactNode
}

function ReactQueryProvider({ children }: IReactQueryProvider) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions))

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ReactQueryProvider
