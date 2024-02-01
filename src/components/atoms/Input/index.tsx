import { GlassmorphicInput } from './styles';

type InputProps = {
  placeholder?: string
  value?: string;
  onValueChange?: (newValue: string) => void
  onEnterPress?: (newValue: string) => void
}

const Input = ({ placeholder, onValueChange, onEnterPress, value }: InputProps) => {
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    onValueChange?.(newValue)
  }

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key.toLowerCase() === 'enter'){
      const newValue = (event.target as HTMLInputElement).value
      onValueChange?.(newValue)
      onEnterPress?.(newValue)
    }
  }

  return (
    <GlassmorphicInput
      value={value}
      placeholder={placeholder}
      onChange={onChangeInput}
      onKeyDown={onKeyPress}
    />
  )
}

export default Input
