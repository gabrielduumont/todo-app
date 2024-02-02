import { isValidTodo, todoTaskListValidator } from './todoTaskListValidator'

describe('isValidTodo', () => {
  it('returns false for non-objects', () => {
    expect(isValidTodo(null)).toBe(false)
    expect(isValidTodo(undefined)).toBe(false)
    expect(isValidTodo(42)).toBe(false)
    expect(isValidTodo('string')).toBe(false)
  })

  it('returns false for objects missing required fields', () => {
    expect(isValidTodo({ id: '1', name: 'Task' })).toBe(false) // missing completed
    expect(isValidTodo({ name: 'Task', completed: false })).toBe(false) // missing id
    expect(isValidTodo({ id: '1', completed: false })).toBe(false) // missing name
  })

  it('returns false for objects with incorrect field types', () => {
    expect(isValidTodo({ id: 1, name: 'Task', completed: false })).toBe(false) // id is not a string
    expect(isValidTodo({ id: '1', name: true, completed: false })).toBe(false) // name is not a string
    expect(isValidTodo({ id: '1', name: 'Task', completed: 'false' })).toBe(
      false,
    ) // completed is not a boolean
  })

  it('returns true for valid Todo objects', () => {
    expect(isValidTodo({ id: '1', name: 'Task', completed: false })).toBe(true)
  })
})

describe('todoTaskListValidator', () => {
  it('returns false for non-arrays', () => {
    expect(todoTaskListValidator(null)).toBe(false)
    expect(todoTaskListValidator({})).toBe(false)
  })

  it('returns false for arrays with invalid items', () => {
    expect(todoTaskListValidator([{ id: '1', name: 'Task' }])).toBe(false) // invalid item
    expect(
      todoTaskListValidator([
        { id: '1', name: 'Task', completed: false },
        'invalid',
      ]),
    ).toBe(false) // one invalid item
  })

  it('returns true for arrays with valid Todo items', () => {
    expect(
      todoTaskListValidator([
        { id: '1', name: 'Task 1', completed: false },
        { id: '2', name: 'Task 2', completed: true },
      ]),
    ).toBe(true)
  })

  it('returns false for empty arrays', () => {
    expect(todoTaskListValidator([])).toBe(false)
  })
})
