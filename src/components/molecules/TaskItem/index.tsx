import {
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
  Delete,
  Undo
} from '@mui/icons-material'
import SweetAlert from 'components/atoms/SweetAlert'
import { useTodoListContext } from 'contexts/TodoListContext'
import { Todo } from 'types/Todo'
import { IconContainer, TaskContainer, TaskName } from './styles'

const TaskItem = ({ id, name, completed }: Todo) => {
  const [, { updateTodoStatus, removeTodoTask }] = useTodoListContext()

  const onIconClick = () => {
    if (completed) {
      return
    }

    updateTodoStatus(id)
  }

  const onUndoClick = () => {
    updateTodoStatus(id, !completed)
  }

  const confirmDelete = () => {
    SweetAlert.fire({
      title: 'Are you sure you want to delete this task?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        removeTodoTask(id);
      }
    });
  };

  return (
    <TaskContainer completed={completed}>
      <IconContainer completed={completed} onClick={onIconClick}>
        {completed ? <CheckBoxOutlined /> : <CheckBoxOutlineBlank />}
      </IconContainer>
      <TaskName completed={completed}>{name}</TaskName>
      {completed && (
        <>
          <IconContainer onClick={onUndoClick}>
            <Undo />
          </IconContainer>

          <IconContainer onClick={confirmDelete}>
            <Delete />
          </IconContainer>
        </>
      )}
    </TaskContainer>
  )
}

export default TaskItem
