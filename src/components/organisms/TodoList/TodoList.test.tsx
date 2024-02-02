import { render, screen } from '@testing-library/react'
import TodoList from './'

describe('TodoList', () => {
  it('renders NewTaskForm and TaskList components', () => {
    render(<TodoList testRun />)

    expect(screen.getByText('No tasks yet')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Type new task name'),
    ).toBeInTheDocument()
  })
})
