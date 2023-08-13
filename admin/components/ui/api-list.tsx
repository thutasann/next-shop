'use client'

import React, { Fragment } from 'react'
import { useParams } from 'next/navigation'
import { useOrigin } from '@/hooks/use-origin'
import ApiAlert from './api-alert'

interface IApiList {
  entityName: string
  entityIdName: string
}

function ApiList({ entityName, entityIdName }: IApiList) {
  const params = useParams()
  const origin = useOrigin()
  const baseURL = `${origin}/api/${params.storeId}`

  return (
    <Fragment>
      <ApiAlert title='GET' variant='public' description={`${baseURL}/${entityName}`} />
      <ApiAlert title='GET' variant='public' description={`${baseURL}/${entityName}/{${entityIdName}}`} />
      <ApiAlert title='POST' variant='admin' description={`${baseURL}/{${entityName}}`} />
      <ApiAlert title='PATCH' variant='public' description={`${baseURL}/${entityName}/{${entityIdName}}`} />
      <ApiAlert title='DELETE' variant='admin' description={`${baseURL}/${entityName}/{${entityIdName}}`} />
    </Fragment>
  )
}

export default ApiList
