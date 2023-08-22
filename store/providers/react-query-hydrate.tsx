'use client'

import { Hydrate as RQHydrate, type HydrateProps } from '@tanstack/react-query'

export const ReactQueryHydrate = (props: HydrateProps) => {
  return <RQHydrate {...props} />
}
