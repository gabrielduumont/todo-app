import { ReactNode } from 'react'
import { GlassmorphicButton } from './styles'

type ButtonProps = {
  children?: string
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ children, icon, onClick, disabled }: ButtonProps) => {
  const onButtonClick = () => {
    if (disabled) {
      return
    }

    onClick?.()
  }
  return (
    <GlassmorphicButton onClick={onButtonClick} disabled={disabled}>
      <>
        {children}
        {icon}
      </>
    </GlassmorphicButton>
  )
}

export default Button
