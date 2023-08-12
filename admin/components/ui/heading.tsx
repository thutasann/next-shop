import React from 'react'

interface IHeading {
  title: string
  description: string
}

function Heading({ title, description }: IHeading) {
  return (
    <div>
      <h1 className='text-2xl font-extrabold tracking-tight'>{title}</h1>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  )
}

export default Heading
