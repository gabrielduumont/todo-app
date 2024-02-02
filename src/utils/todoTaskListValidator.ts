import { Todo } from 'types/Todo'

const isValidTodo = (value: unknown): value is Todo => {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'id' in value &&
      typeof value.id === 'string' &&
      'name' in value &&
      typeof value.name === 'string' &&
      'completed' in value &&
      typeof value.completed === 'boolean',
  )
}

export const todoTaskListValidator = (value: unknown): value is Todo[] => {
  if (
    value &&
    Array.isArray(value) &&
    value.length &&
    value.every((item) => isValidTodo(item))
  ) {
    return true
  }

  return false
}
