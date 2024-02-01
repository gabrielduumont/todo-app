import NewTaskForm from 'components/molecules/NewTaskForm'
import TaskList from 'components/organisms/TaskList'
import TodoListContextContainer from 'contexts/TodoListContext'

const TodoList = () => {
  return (
    <TodoListContextContainer>
      <NewTaskForm />
      <TaskList />
    </TodoListContextContainer>
  )
}

export default TodoList
