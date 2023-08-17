import { cn } from '@/utils/utils'
import { forwardRef, MouseEventHandler } from 'react'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  icon: React.ReactElement
  className?: string
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ onClick, icon, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn('rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition', className)}
      {...props}
    >
      {icon}
    </button>
  )
})

IconButton.displayName = 'IconButton'

export default IconButton
