import { render, screen } from '@testing-library/react'
import TodoListContextContainer, {
  useTodoListContext,
} from 'contexts/TodoListContext'
import TaskList from './'

describe('TaskList', () => {
  it('renders no task message when there are no tasks', () => {
    ;(useTodoListContext as any) = jest.fn().mockReturnValue([
      { todoTasks: [] },
      {
        addTodoTask: jest.fn(),
        updateTodoStatus: jest.fn(),
        removeTodoTask: jest.fn(),
        updateTodoName: jest.fn(),
      },
    ])
    render(
      <TodoListContextContainer testRun>
        <TaskList />
      </TodoListContextContainer>,
    )
    expect(screen.getByText('No tasks yet')).toBeInTheDocument()
  })

  it('renders task items when there are tasks', () => {
    const mockTasks = [
      { id: '1', name: 'Task 1', completed: false },
      { id: '2', name: 'Task 2', completed: true },
    ]
    ;(useTodoListContext as any) = jest.fn().mockReturnValue([
      { todoTasks: mockTasks },
      {
        addTodoTask: jest.fn(),
        updateTodoStatus: jest.fn(),
        removeTodoTask: jest.fn(),
        updateTodoName: jest.fn(),
      },
    ])
    render(
      <TodoListContextContainer testRun>
        <TaskList />
      </TodoListContextContainer>,
    )
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })
})
