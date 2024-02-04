import { render, screen } from '@testing-library/react'
import LoadingSpinner from './'

describe('LoadingSpinner', () => {
  it('renders the spinner when isLoading is true', () => {
    render(<LoadingSpinner isLoading={true} />)
    const spinner = screen.queryByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('does not render the spinner when isLoading is false', () => {
    render(<LoadingSpinner isLoading={false} />)
    const spinner = screen.queryByTestId('spinner')
    expect(spinner).not.toBeInTheDocument()
  })
})
