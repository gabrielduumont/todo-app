import TaskItem from 'components/molecules/TaskItem'
import { useTodoListContext } from 'contexts/TodoListContext'
import { NoItemsMessage } from './styles'

const TaskList = () => {
  const [{ todoTasks }] = useTodoListContext()

  if (!todoTasks.length) {
    return <NoItemsMessage>No tasks yet</NoItemsMessage>
  }

  return (
    <>
      {todoTasks.map((task) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </>
  )
}

export default TaskList
