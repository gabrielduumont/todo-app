import { render, screen } from '@testing-library/react'
import Title from './'

describe('Title', () => {
  it('renders the title', () => {
    render(<Title children="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('conditionally renders the subtitle', () => {
    render(<Title children="Test Title" subtitle="Test Subtitle" />)
    expect(screen.getByTestId('subtitle')).toBeInTheDocument()
  })

  it('should not render subtitle', () => {
    render(<Title children="Test Title" />)
    expect(screen.queryByTestId('subtitle')).not.toBeInTheDocument()
  })

  it('applies the alignment prop correctly', () => {
    render(<Title children="Test Title" align="center" />)
    const container = screen.getByTestId('title-container')
    expect(container).toHaveStyle(`text-align: center`)
  })
})
