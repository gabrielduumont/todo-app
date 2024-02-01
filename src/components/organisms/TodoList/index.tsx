import NewTaskForm from '@project/components/molecules/NewTaskForm'
import TodoListContextContainer from '@project/contexts/TodoListContext'
import TaskList from '../TaskList'

const TodoList = () => {
  return (
    <TodoListContextContainer>
      <NewTaskForm />
      <TaskList />
    </TodoListContextContainer>
  )
}

export default TodoList
