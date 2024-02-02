import { getStorageItem, saveStorageItem } from './localStorageAdapter'

jest.spyOn(console, 'error').mockImplementation(() => {})

describe('getStorageItem', () => {
  it('returns null for invalid JSON', () => {
    // Mocking localStorage.getItem to return an invalid JSON string
    const invalidJSON = 'invalid JSON'
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(invalidJSON)

    const validator = jest.fn().mockReturnValue(true)
    // @ts-ignore
    const result = getStorageItem('todoTasks', validator)

    expect(result).toBeNull()
    expect(validator).not.toHaveBeenCalled()
  })

  it('returns null for non-existent key', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null)

    const validator = jest.fn().mockReturnValue(true)
    // @ts-ignore
    const result = getStorageItem('nonExistentKey' as 'todoTasks', validator)

    expect(result).toBeNull()
    expect(validator).not.toHaveBeenCalled()
  })

  it('returns null for valid JSON that fails validation', () => {
    const validJSON = JSON.stringify({ someKey: 'someValue' })
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(validJSON)

    const validator = jest.fn().mockReturnValue(false)
    // @ts-ignore
    const result = getStorageItem('todoTasks', validator)

    expect(result).toBeNull()
    expect(validator).toHaveBeenCalledWith({ someKey: 'someValue' })
  })

  it('returns parsed item for valid JSON that passes validation', () => {
    const validJSON = JSON.stringify({ someKey: 'someValue' })
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(validJSON)

    const validator = jest.fn().mockReturnValue(true)
    // @ts-ignore
    const result = getStorageItem('todoTasks', validator)

    expect(result).toEqual({ someKey: 'someValue' })
    expect(validator).toHaveBeenCalledWith({ someKey: 'someValue' })
  })
})

describe('saveStorageItem', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('saves an item to localStorage', () => {
    const item = { someKey: 'someValue' }
    expect(saveStorageItem(item, 'todoTasks')).toBe(true)
    expect(window.localStorage.getItem('todoTasks')).toEqual(
      JSON.stringify(item),
    )
  })
})
