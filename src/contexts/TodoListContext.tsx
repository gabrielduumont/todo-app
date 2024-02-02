import LoadingSpinner from 'components/atoms/InlineLoading'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Todo } from 'types/Todo'
import { getStorageItem, saveStorageItem } from 'utils/localStorageAdapter'
import { todoTaskListValidator } from 'utils/todoTaskListValidator'

type TodoListContextStates = {
  todoTasks: Todo[]
}
type TodoListContextModifiers = {
  addTodoTask: (task: Todo) => void
  removeTodoTask: (taskId: string) => void
  updateTodoStatus: (taskId: string, completed?: boolean) => void
  updateTodoName: (taskId: string, name: string) => void
}

type TodoListContextType = {
  states: TodoListContextStates
  modifiers: TodoListContextModifiers
}

const FAKE_REQUEST_TIMEOUT_IN_MILISECONDS = 1500

export const TodoListContext = createContext<TodoListContextType>({
  states: {
    todoTasks: [],
  },
  modifiers: {
    addTodoTask: () => {},
    updateTodoStatus: () => {},
    removeTodoTask: () => {},
    updateTodoName: () => {},
  },
})

export const useTodoListContext = () => {
  const { states, modifiers } = useContext(TodoListContext)

  return [states, modifiers] as const
}

const TodoListContextContainer = ({
  children,
  testRun,
}: {
  children: ReactNode
  testRun?: boolean
}) => {
  const [todoTasks, setTodoTasks] = useState<Todo[]>([])
  const [started, setStarted] = useState<boolean>(testRun ?? false)

  const addTodoTask = useCallback(
    (task: Todo) => {
      const updatedTasks = [...todoTasks]
      updatedTasks.push(task)
      setTodoTasks(updatedTasks)
    },
    [todoTasks],
  )

  const removeTodoTask = useCallback(
    (taskId: string) => {
      const updatedTasks = [...todoTasks].filter((task) => task.id !== taskId)
      setTodoTasks(updatedTasks)
    },
    [todoTasks],
  )

  const updateTodoStatus = useCallback(
    (taskId: string, completed?: boolean) => {
      const updatedTasks = [...todoTasks].map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: completed !== undefined ? completed : true,
          }
        }

        return task
      })
      setTodoTasks(updatedTasks)
    },
    [todoTasks],
  )

  const updateTodoName = useCallback(
    (taskId: string, name: string) => {
      const updatedTasks = [...todoTasks].map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            name,
          }
        }

        return task
      })
      setTodoTasks(updatedTasks)
    },
    [todoTasks],
  )

  const states: TodoListContextStates = {
    todoTasks,
  }

  const modifiers: TodoListContextModifiers = {
    addTodoTask,
    removeTodoTask,
    updateTodoStatus,
    updateTodoName,
  }

  const contextValue: TodoListContextType = {
    states,
    modifiers,
  }

  useEffect(() => {
    const onMountContext = () => {
      const tasksSavedOnStorage = getStorageItem(
        'todoTasks',
        todoTaskListValidator,
      )
      if (!tasksSavedOnStorage) {
        return
      }

      setTodoTasks(tasksSavedOnStorage)
    }
    if (!started) {
      onMountContext()
      // adding timeout just for us to be able to see the loading state, so that the app behaves like it would be calling an API and taking some time
      setTimeout(() => {
        setStarted(true)
      }, FAKE_REQUEST_TIMEOUT_IN_MILISECONDS)
    }
  }, [started])

  useEffect(() => {
    saveStorageItem(todoTasks, 'todoTasks')
  }, [todoTasks])

  return (
    <TodoListContext.Provider value={contextValue}>
      {started ? (
        <>{children}</>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '12px',
          }}
        >
          <LoadingSpinner isLoading />
        </div>
      )}
    </TodoListContext.Provider>
  )
}

export default TodoListContextContainer
