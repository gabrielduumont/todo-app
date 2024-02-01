import NewTaskForm from 'components/molecules/NewTaskForm'
import TaskList from 'components/organisms/TaskList'
import TodoListContextContainer from 'contexts/TodoListContext'
import { TodoListContainer } from './styles'

const TodoList = () => {
  return (
    <TodoListContextContainer>
      <TodoListContainer>
        <NewTaskForm />
        <TaskList />
      </TodoListContainer>
    </TodoListContextContainer>
  )
}

export default TodoList
