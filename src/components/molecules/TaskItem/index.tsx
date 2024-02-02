import {
  Cancel,
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
  Delete,
  Edit,
  Save,
  Undo,
} from '@mui/icons-material'
import Input from 'components/atoms/Input'
import SweetAlert from 'components/atoms/SweetAlert'
import { useTodoListContext } from 'contexts/TodoListContext'
import { useState } from 'react'
import { Todo } from 'types/Todo'
import { IconContainer, TaskContainer, TaskName } from './styles'

const parseBooleanValidHtmlAttribute = (value?: boolean) => {
  if (!value) {
    return undefined
  }

  return `${value}`
}

const TaskItem = ({ id, name, completed }: Todo) => {
  const [editedTaskName, setEditedTaskName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [, { updateTodoStatus, removeTodoTask, updateTodoName }] =
    useTodoListContext()

  const onCheckClick = () => {
    if (completed) {
      return
    }

    updateTodoStatus(id)
  }

  const onUndoClick = () => {
    if (!completed) {
      return
    }

    updateTodoStatus(id, !completed)
  }

  const confirmDelete = () => {
    if (!completed) {
      return
    }

    SweetAlert.fire({
      title: 'Are you sure you want to delete this task?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        removeTodoTask(id)
      }
    })
  }

  const onEditClick = () => {
    if (completed || isEditing) {
      return
    }

    setEditedTaskName(name)
    setIsEditing(true)
  }

  const closeEditingMode = () => {
    setEditedTaskName('')
    setIsEditing(false)
  }

  const onCancelEditing = () => {
    if (completed || !isEditing) {
      return
    }

    closeEditingMode()
  }

  const onSaveEditing = () => {
    if (completed || !isEditing || !editedTaskName) {
      return
    }

    updateTodoName(id, editedTaskName)
    closeEditingMode()
  }

  return (
    <TaskContainer completed={parseBooleanValidHtmlAttribute(completed)}>
      {isEditing ? (
        <Input
          placeholder="Edit task name"
          value={editedTaskName}
          onValueChange={setEditedTaskName}
          onEnterPress={onSaveEditing}
        />
      ) : (
        <>
          <IconContainer
            completed={parseBooleanValidHtmlAttribute(completed)}
            onClick={onCheckClick}
            data-testid="checkbox"
          >
            {completed ? (
              <CheckBoxOutlined data-testid="checkbox-marked" />
            ) : (
              <CheckBoxOutlineBlank data-testid="checkbox-blank" />
            )}
          </IconContainer>
          <TaskName
            completed={parseBooleanValidHtmlAttribute(completed)}
            data-testid="task-name"
          >
            {name}
          </TaskName>
        </>
      )}
      {completed ? (
        <>
          <IconContainer onClick={onUndoClick}>
            <Undo data-testid="undo-button" />
          </IconContainer>

          <IconContainer onClick={confirmDelete}>
            <Delete data-testid="delete-button" />
          </IconContainer>
        </>
      ) : (
        <>
          {isEditing ? (
            <>
              <IconContainer onClick={onCancelEditing}>
                <Cancel data-testid="cancel-edit-button" />
              </IconContainer>
              <IconContainer onClick={onSaveEditing}>
                <Save data-testid="save-edit-button" />
              </IconContainer>
            </>
          ) : (
            <IconContainer onClick={onEditClick}>
              <Edit data-testid="edit-button" />
            </IconContainer>
          )}
        </>
      )}
    </TaskContainer>
  )
}

export default TaskItem
