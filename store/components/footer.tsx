import React, { memo } from 'react'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className='bg-white border-t mt-[50px]  w-full'>
      <div className='mx-auto py-7'>
        <p className='text-center text-sm text-black'>&copy; {year} AllUNeed, All rights reserved.</p>
      </div>
    </footer>
  )
}

export default memo(Footer)
