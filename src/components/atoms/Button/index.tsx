import { ReactNode } from 'react'
import { GlassmorphicButton } from './styles'

type ButtonProps = {
  children?: string
  icon?: ReactNode
  onClick?: () => void
}

const Button = ({ children, icon, onClick }: ButtonProps) => (
  <GlassmorphicButton onClick={onClick}>
    <>
      {children}
      {icon}
    </>
  </GlassmorphicButton>
)

export default Button
