import type { ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

const buttonClassName = [
  'flex items-center justify-center rounded-[27px] border-2 border-[#B3158E]',
  'bg-white/20 px-0 py-2 font-montserrat text-lg font-semibold text-[#B3158E]',
  'shadow-[0_2px_2px_rgba(61,59,60,0.1)] backdrop-blur-sm transition-all',
  'hover:bg-[#B3158E] hover:text-white'
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