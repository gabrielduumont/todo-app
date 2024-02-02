import NewTaskForm from 'components/molecules/NewTaskForm'
import TaskList from 'components/organisms/TaskList'
import TodoListContextContainer from 'contexts/TodoListContext'
import { TodoListContainer } from './styles'

const TodoList = ({ testRun }: { testRun?: boolean }) => {
  return (
    <TodoListContextContainer testRun={testRun}>
      <TodoListContainer>
        <NewTaskForm />
        <TaskList />
      </TodoListContainer>
    </TodoListContextContainer>
  )
}

export default TodoList
