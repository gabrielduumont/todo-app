type StorageItemKeys = 'todoTasks'

export const getStorageItem = <T>(
  key: StorageItemKeys,
  validator: (value: unknown) => value is T,
) => {
  if (!localStorage) {
    return null
  }

  try {
    const item = localStorage.getItem(key)
    if (!item) {
      return null
    }

    const parsedItem = JSON.parse(item)
    if (!validator(parsedItem)) {
      return null
    }

    return parsedItem
  } catch (error: unknown) {
    console.error('Unknown error', { error })
    return null
  }
}

export const saveStorageItem = <T>(item: T, key: StorageItemKeys) => {
  if (!localStorage) {
    return false
  }

  localStorage.setItem(key, JSON.stringify(item))
  return true;
}
