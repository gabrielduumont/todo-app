import { act, fireEvent, render, screen } from '@testing-library/react'
import { useContext } from 'react'
import { getStorageItem, saveStorageItem } from 'utils/localStorageAdapter'
import TodoListContextContainer, { TodoListContext } from './TodoListContext'

jest.mock('utils/localStorageAdapter', () => ({
  getStorageItem: jest.fn(),
  saveStorageItem: jest.fn(),
}))

jest.useFakeTimers()

describe('TodoListContextContainer', () => {
  const TestConsumer = () => {
    const { states, modifiers } = useContext(TodoListContext)
    return (
      <div>
        {states.todoTasks.length ? (
          states.todoTasks.map((task) => (
            <div key={task.id}>
              <span>{task.name}</span>
              <span>
                {task.completed ? 'completed-task' : 'not-complete-task'}
              </span>
              <span
                id="test-delete-button"
                onClick={() => modifiers.removeTodoTask(task.id)}
              >
                delete-button
              </span>
              <span
                id="test-update-status-button"
                onClick={() => modifiers.updateTodoStatus(task.id, true)}
              >
                update-status-button
              </span>
              <span
                id="test-update-name-button"
                onClick={() =>
                  modifiers.updateTodoName(task.id, 'new task name')
                }
              >
                update-name-button
              </span>
            </div>
          ))
        ) : (
          <div>No tasks yet</div>
        )}
        <button
          onClick={() =>
            modifiers.addTodoTask({
              id: 'test',
              name: 'Test Task',
              completed: false,
            })
          }
        >
          Add Task
        </button>
      </div>
    )
  }

  it('should initially render loading spinner', () => {
    render(
      <TodoListContextContainer>
        <></>
      </TodoListContextContainer>,
    )
    expect(screen.getByTestId('spinner')).toBeTruthy()
  })

  it('should render children after fake timeout', () => {
    render(
      <TodoListContextContainer>
        <div data-testid="child-component" />
      </TodoListContextContainer>,
    )

    act(() => {
      jest.advanceTimersByTime(1500)
    })

    expect(screen.getByTestId('child-component')).toBeTruthy()
    expect(screen.queryByTestId('spinner')).toBeFalsy()
  })

  it('should add a todo task', () => {
    render(
      <TodoListContextContainer testRun>
        <TestConsumer />
      </TodoListContextContainer>,
    )

    expect(screen.getByText('No tasks yet')).toBeTruthy()
    fireEvent.click(screen.getByText('Add Task'))

    expect(screen.getByText('Test Task')).toBeTruthy()
    expect(screen.getByText('not-complete-task')).toBeTruthy()
    expect(screen.queryByText('No tasks yet')).toBeFalsy()
  })

  it('should update todo task status', () => {
    render(
      <TodoListContextContainer testRun>
        <TestConsumer />
      </TodoListContextContainer>,
    )

    expect(screen.getByText('No tasks yet')).toBeTruthy()
    fireEvent.click(screen.getByText('Add Task'))

    expect(screen.getByText('Test Task')).toBeTruthy()
    expect(screen.getByText('not-complete-task')).toBeTruthy()
    fireEvent.click(screen.getByText('update-status-button'))
    expect(screen.getByText('completed-task')).toBeTruthy()
    expect(screen.queryByText('No tasks yet')).toBeFalsy()
  })

  it('should remove a todo task', () => {
    render(
      <TodoListContextContainer testRun>
        <TestConsumer />
      </TodoListContextContainer>,
    )

    expect(screen.getByText('No tasks yet')).toBeTruthy()
    fireEvent.click(screen.getByText('Add Task'))

    expect(screen.getByText('Test Task')).toBeTruthy()
    expect(screen.queryByText('No tasks yet')).toBeFalsy()
    fireEvent.click(screen.getByText('delete-button'))

    expect(screen.queryByText('Test Task')).toBeFalsy()
    expect(screen.getByText('No tasks yet')).toBeTruthy()
  })

  it('should update todo task name', () => {
    render(
      <TodoListContextContainer testRun>
        <TestConsumer />
      </TodoListContextContainer>,
    )

    expect(screen.getByText('No tasks yet')).toBeTruthy()
    fireEvent.click(screen.getByText('Add Task'))

    expect(screen.getByText('Test Task')).toBeTruthy()
    expect(screen.getByText('not-complete-task')).toBeTruthy()
    fireEvent.click(screen.getByText('update-name-button'))
    expect(screen.getByText('not-complete-task')).toBeTruthy()
    expect(screen.queryByText('No tasks yet')).toBeFalsy()
    expect(screen.getByText('new task name')).toBeTruthy()
  })

  it('should load tasks from local storage on mount', () => {
    const mockTasks = [{ id: '1', name: 'Test Task 1', completed: false }]
    ;(getStorageItem as any) = jest.fn().mockReturnValue(mockTasks)

    render(
      <TodoListContextContainer>
        <TestConsumer />
      </TodoListContextContainer>,
    )

    act(() => {
      jest.advanceTimersByTime(1500)
    })
    expect(screen.getByText('Test Task 1')).toBeTruthy()
  })

  it('should save tasks to local storage on update', () => {
    const mockSaveFunction = jest.fn()
    ;(saveStorageItem as any) = jest.fn().mockImplementation(mockSaveFunction)

    render(
      <TodoListContextContainer testRun>
        <TestConsumer />
      </TodoListContextContainer>,
    )

    fireEvent.click(screen.getByText('Add Task'))

    expect(mockSaveFunction).toHaveBeenCalledWith(
      [{ id: 'test', name: 'Test Task', completed: false }],
      'todoTasks',
    )
  })
})
