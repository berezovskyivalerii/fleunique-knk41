import type { ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

const buttonClassName = [
  'flex items-center justify-center rounded-[27px] border-2 border-rose-300',
  'bg-white/20 px-0 font-montserrat! text-lg font-semibold text-rose-300',
  'shadow-[0_2px_2px_rgba(61,59,60,0.1)] backdrop-blur-sm transition-all',
  'hover:bg-rose-300 hover:text-white'
].join(' ')

type MediumOutlinedButtonProps = LinkProps & {
  children: ReactNode
}

export const MediumOutlinedButton = ({ children, className = '', ...props }: MediumOutlinedButtonProps) => {
  return (
    <Link
      {...props}
      className={`${buttonClassName} ${className}`}
    >
      {children}
    </Link>
  )
}