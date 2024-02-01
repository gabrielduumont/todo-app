import { ReactNode, createContext, useCallback, useContext, useState } from 'react'
import { Todo } from 'types/Todo'

type TodoListContextStates = {
  todoTasks: Todo[]
}
type TodoListContextModifiers = {
  addTodoTask: (task: Todo) => void
  removeTodoTask: (taskId: string) => void
}

type TodoListContextType = {
  states: TodoListContextStates
  modifiers: TodoListContextModifiers
}

export const TodoListContext = createContext<TodoListContextType>({
  states: {
    todoTasks: []
  },
  modifiers: {
    addTodoTask: () => {},
    removeTodoTask: () => {},
  },
})

export const useTodoListContext = () => {
  const { states, modifiers } = useContext(TodoListContext)

  return [states, modifiers] as const
}

const TodoListContextContainer = ({ children }: { children: ReactNode }) => {
  const [todoTasks, setTodoTasks] = useState<Todo[]>([])

  const addTodoTask = useCallback((task: Todo) => {
    const updatedTasks = [...todoTasks];
    updatedTasks.push(task);
    setTodoTasks(updatedTasks)
  }, [todoTasks])

  const removeTodoTask = useCallback((taskId: string) => {
    const updatedTasks = [...todoTasks].filter(task => task.id !== taskId);
    setTodoTasks(updatedTasks)
  }, [todoTasks])

  const states: TodoListContextStates = {
    todoTasks
  }

  const modifiers: TodoListContextModifiers = {
    addTodoTask,
    removeTodoTask
  }

  const contextValue: TodoListContextType = {
    states,
    modifiers,
  }

  return (
    <TodoListContext.Provider value={contextValue}>
      <>{children}</>
    </TodoListContext.Provider>
  )
}

export default TodoListContextContainer
