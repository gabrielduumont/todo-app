import { fireEvent, render, screen } from '@testing-library/react'
import Input from './'

describe('Input', () => {
  it('renders with the correct placeholder', () => {
    render(<Input placeholder="Enter text here" />)
    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument()
  })

  it('calls onValueChange with the correct value on input change', () => {
    const handleValueChange = jest.fn()
    render(<Input onValueChange={handleValueChange} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new text' } })
    expect(handleValueChange).toHaveBeenCalledWith('new text')
  })

  it('calls onEnterPress when Enter key is pressed', () => {
    const handleEnterPress = jest.fn()
    render(<Input onEnterPress={handleEnterPress} />)
    const input = screen.getByRole('textbox')
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(handleEnterPress).toHaveBeenCalled()
  })

  it('displays the correct value', () => {
    render(<Input value="initial value" />)
    expect(screen.getByRole('textbox')).toHaveValue('initial value')
  })

  it('calls both functions if both provided', () => {
    const handleValueChange = jest.fn()
    const handleEnterPress = jest.fn()
    render(
      <Input
        onValueChange={handleValueChange}
        onEnterPress={handleEnterPress}
      />,
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new text' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(handleValueChange).toHaveBeenCalledWith('new text')
    expect(handleEnterPress).toHaveBeenCalled()
  })
})
