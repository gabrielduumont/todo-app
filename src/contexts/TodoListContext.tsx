import { ReactNode, createContext, useContext } from 'react'

type TodoListContextStates = {}
type TodoListContextModifiers = {}

type TodoListContextType = {
  states: TodoListContextStates
  modifiers: TodoListContextModifiers
}

export const TodoListContext = createContext<TodoListContextType>({
  states: {},
  modifiers: {},
})

export const useTodoListContext = () => {
  const { states, modifiers } = useContext(TodoListContext)

  return [states, modifiers] as const
}

const TodoListContextContainer = ({ children }: { children: ReactNode }) => {
  
  const states: TodoListContextStates = {
  }

  const modifiers: TodoListContextModifiers = {
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
