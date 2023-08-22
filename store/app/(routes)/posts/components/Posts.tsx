'use client'

import { getPostsQueryFn } from '@/actions/server-actions/get-posts'
import Button from '@/components/ui/button'
import Container from '@/components/ui/container'
import { Loader } from '@/components/ui/loader'
import { PostProps } from '@/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { Post } from './post'

function Posts() {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<PostProps[]>({
    queryKey: ['posts'],
    queryFn: getPostsQueryFn,
    getNextPageParam: (_, pages) => pages.length + 1,
  })

  if (!data) return <div>No posts found</div>

  return (
    <Container>
      <div className='px-4 sm:px-6 lg:px-8 pb-24'>
        <div className=''>
          {data.pages.map((group, i) => (
            <div className='space-y-3 mt-3' key={i}>
              {group.map(post => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          ))}
          {isFetchingNextPage ? (
            <div className='my-3'>
              <Loader />
            </div>
          ) : hasNextPage ? (
            <Button className='mt-2' onClick={() => fetchNextPage()}>
              Load More
            </Button>
          ) : null}
        </div>
      </div>
    </Container>
  )
}

export default Posts
