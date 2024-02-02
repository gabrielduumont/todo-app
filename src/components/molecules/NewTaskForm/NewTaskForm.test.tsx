import { fireEvent, render, screen } from '@testing-library/react';
import TodoListContextContainer from 'contexts/TodoListContext';
import NewTaskForm from './';


describe('NewTaskForm', () => {
  it('updates the input value on change', () => {
    render(<NewTaskForm />)
    const input = screen.getByPlaceholderText(
      'Type new task name',
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'New Task' } })
    expect(input.value).toBe('New Task')
  })

  it('adds a new task on button click', () => {
    crypto.randomUUID = jest.fn().mockReturnValue('mock-uuid-asd-asd-asd');
    render(
      <TodoListContextContainer testRun>
        <NewTaskForm />
      </TodoListContextContainer>,
    )
    const input = screen.getByPlaceholderText('Type new task name') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'New Task' } })

    const addButton = screen.getByRole('button')
    fireEvent.click(addButton)
    expect(input.value).toBe('')
  })

  it('adds a new task on enter key press in input', () => {
    crypto.randomUUID = jest.fn().mockReturnValue('mock-uuid-asd-asd-asd');
    render(
      <TodoListContextContainer testRun>
        <NewTaskForm />
      </TodoListContextContainer>,
    )
    const input = screen.getByPlaceholderText(
      'Type new task name',
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'New Task' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(input.value).toBe('')
  })
})
