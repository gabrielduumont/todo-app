import { Add } from '@mui/icons-material'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import { useTodoListContext } from 'contexts/TodoListContext'
import { useState } from 'react'
import { Todo } from 'types/Todo'
import { NewTaskFormContainer } from './styles'

const NewTaskForm = () => {
  const [taskName, setTaskName] = useState('')
  const [, { addTodoTask }] = useTodoListContext()

  const onAddNewTask = () => {
    if (!taskName) {
      return
    }

    const newTask: Todo = {
      id: crypto.randomUUID(),
      name: taskName,
      completed: false,
    }

    addTodoTask(newTask)
    setTaskName('')
  }

  return (
    <NewTaskFormContainer>
      <Input
        placeholder="Type new task name"
        value={taskName}
        onValueChange={setTaskName}
        onEnterPress={onAddNewTask}
      />
      <Button
        icon={<Add fontSize="small" />}
        onClick={onAddNewTask}
        disabled={!taskName}
      />
    </NewTaskFormContainer>
  )
}

export default NewTaskForm
