'use server'

import { jsonPlaceholderAxios } from '@/lib/jsonPlaceholder'

export const getPostsQueryFn = async ({ pageParam = 1 }) =>
  jsonPlaceholderAxios.get(`/posts`, { params: { _page: pageParam } }).then(res => res.data)
