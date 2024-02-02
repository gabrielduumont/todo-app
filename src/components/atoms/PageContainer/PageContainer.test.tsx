import { render, screen } from '@testing-library/react'
import PageContainer from './'

describe('PageContainer', () => {
  it('renders its children', () => {
    render(
      <PageContainer>
        <div>Test Child</div>
      </PageContainer>,
    )
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })
})
