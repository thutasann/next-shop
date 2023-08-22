import { getPostsQueryFn } from '@/actions/server-actions/get-posts'
import getQueryClient from '@/lib/getQueryClient'
import { ReactQueryHydrate } from '@/providers/react-query-hydrate'
import { dehydrate } from '@tanstack/react-query'
import React from 'react'
import Posts from './components/Posts'

async function PostsPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchInfiniteQuery(['posts'], getPostsQueryFn)
  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <div className='my-7'>
        <Posts />
      </div>
    </ReactQueryHydrate>
  )
}

export default PostsPage
