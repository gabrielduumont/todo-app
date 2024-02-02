import { fireEvent, render, screen } from '@testing-library/react'
import { useTodoListContext } from 'contexts/TodoListContext'
import TaskItem from './'

const mockIncompleteTask = {
  id: '1',
  name: 'Test Task',
  completed: false,
}
const mockCompleteTask = {
  id: '2',
  name: 'Test Task 2',
  completed: true,
}

describe('TaskItem', () => {
  it('renders correctly if not completed', () => {
    render(<TaskItem {...mockIncompleteTask} />)

    const taskName = screen.queryByTestId('task-name')
    const input = screen.queryByPlaceholderText('Edit task name')
    const checkboxBlank = screen.queryByTestId('checkbox-blank')
    const checkboxMarked = screen.queryByTestId('checkbox-marked')
    const undoButton = screen.queryByTestId('undo-button')
    const deleteButton = screen.queryByTestId('delete-button')
    const editButton = screen.queryByTestId('edit-button')
    const cancelEditButton = screen.queryByTestId('cancel-edit-button')
    const saveEditButton = screen.queryByTestId('save-edit-button')

    expect(taskName).toBeInTheDocument()
    expect(input).not.toBeInTheDocument()

    expect(checkboxBlank).toBeInTheDocument()
    expect(checkboxMarked).not.toBeInTheDocument()

    expect(undoButton).not.toBeInTheDocument()
    expect(deleteButton).not.toBeInTheDocument()

    expect(editButton).toBeInTheDocument()
    expect(cancelEditButton).not.toBeInTheDocument()
    expect(saveEditButton).not.toBeInTheDocument()
  })

  it('renders correctly if completed', () => {
    render(<TaskItem {...mockCompleteTask} />)

    const taskName = screen.queryByTestId('task-name')
    const input = screen.queryByPlaceholderText('Edit task name')
    const checkboxBlank = screen.queryByTestId('checkbox-blank')
    const checkboxMarked = screen.queryByTestId('checkbox-marked')
    const undoButton = screen.queryByTestId('undo-button')
    const deleteButton = screen.queryByTestId('delete-button')
    const editButton = screen.queryByTestId('edit-button')
    const cancelEditButton = screen.queryByTestId('cancel-edit-button')
    const saveEditButton = screen.queryByTestId('save-edit-button')

    expect(taskName).toBeInTheDocument()
    expect(input).not.toBeInTheDocument()

    expect(checkboxBlank).not.toBeInTheDocument()
    expect(checkboxMarked).toBeInTheDocument()

    expect(undoButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()

    expect(editButton).not.toBeInTheDocument()
    expect(cancelEditButton).not.toBeInTheDocument()
    expect(saveEditButton).not.toBeInTheDocument()
  })

  describe('Not completed task item actions tests', () => {
    it('on checkbox click should call context to mark as completed', () => {
      const updateTodoStatus = jest.fn()

      ;(useTodoListContext as any) = jest.fn().mockReturnValue([
        undefined,
        {
          updateTodoStatus: updateTodoStatus,
          removeTodoTask: jest.fn(),
          updateTodoName: jest.fn(),
        },
      ])

      render(<TaskItem {...mockIncompleteTask} />)

      const checkbox = screen.getByTestId('checkbox')

      fireEvent.click(checkbox)
      expect(updateTodoStatus).toHaveBeenCalledWith(mockIncompleteTask.id)
    })

    it('on edit click should change component state to edit mode', () => {
      ;(useTodoListContext as any) = jest.fn().mockReturnValue([
        undefined,
        {
          updateTodoStatus: jest.fn(),
          removeTodoTask: jest.fn(),
          updateTodoName: jest.fn(),
        },
      ])

      render(<TaskItem {...mockIncompleteTask} />)

      const editButton = screen.getByTestId('edit-button')

      fireEvent.click(editButton)
      const cancelEditButton = screen.queryByTestId('cancel-edit-button')
      const saveEditButton = screen.queryByTestId('save-edit-button')
      const taskName = screen.queryByTestId('task-name')
      const input = screen.queryByPlaceholderText('Edit task name')

      expect(input).toBeInTheDocument()
      expect(cancelEditButton).toBeInTheDocument()
      expect(saveEditButton).toBeInTheDocument()
      expect(editButton).not.toBeInTheDocument()
      expect(taskName).not.toBeInTheDocument()
    })

    it('on edit click should change component state to edit mode, change name, then cancel changes', () => {
      ;(useTodoListContext as any) = jest.fn().mockReturnValue([
        undefined,
        {
          updateTodoStatus: jest.fn(),
          removeTodoTask: jest.fn(),
          updateTodoName: jest.fn(),
        },
      ])

      render(<TaskItem {...mockIncompleteTask} />)

      const editButton = screen.getByTestId('edit-button')

      fireEvent.click(editButton)

      const cancelEditButton = screen.getByTestId('cancel-edit-button')
      const input = screen.getByPlaceholderText(
        'Edit task name',
      ) as HTMLInputElement
      expect(input?.value).toEqual(mockIncompleteTask.name)
      fireEvent.change(input, { target: { value: 'new text' } })
      expect(input?.value).toEqual('new text')

      fireEvent.click(cancelEditButton)

      const taskName = screen.queryByTestId('task-name')
      expect(taskName).toBeInTheDocument()
      expect(taskName?.innerHTML).toEqual(mockIncompleteTask.name)
    })

    it('on edit click should change component state to edit mode, change name, then save changes', () => {
      const updateTodoName = jest.fn()

      ;(useTodoListContext as any) = jest.fn().mockReturnValue([
        undefined,
        {
          updateTodoStatus: jest.fn(),
          removeTodoTask: jest.fn(),
          updateTodoName: updateTodoName,
        },
      ])

      render(<TaskItem {...mockIncompleteTask} />)

      const editButton = screen.getByTestId('edit-button')

      fireEvent.click(editButton)

      const saveEditButton = screen.getByTestId('save-edit-button')
      const input = screen.getByPlaceholderText(
        'Edit task name',
      ) as HTMLInputElement
      expect(input?.value).toEqual(mockIncompleteTask.name)
      fireEvent.change(input, { target: { value: 'new text' } })
      expect(input?.value).toEqual('new text')

      fireEvent.click(saveEditButton)

      expect(updateTodoName).toHaveBeenCalledWith(
        mockIncompleteTask.id,
        'new text',
      )
    })
  })

  describe('Completed task item actions tests', () => {
    it('on undo click should call context to mark as not completed', () => {
      const updateTodoStatus = jest.fn()
      ;(useTodoListContext as any) = jest.fn().mockReturnValue([
        undefined,
        {
          updateTodoStatus: updateTodoStatus,
          removeTodoTask: jest.fn(),
          updateTodoName: jest.fn(),
        },
      ])

      render(<TaskItem {...mockCompleteTask} />)

      const undoButton = screen.getByTestId('undo-button')

      fireEvent.click(undoButton)
      expect(updateTodoStatus).toHaveBeenCalledWith(mockCompleteTask.id, false)
    })

  })
})
