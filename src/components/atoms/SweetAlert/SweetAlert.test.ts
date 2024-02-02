import SweetAlert from './'

jest.mock('sweetalert2', () => {
  const originalModule = jest.requireActual('sweetalert2')

  return {
    ...originalModule,
    fire: jest.fn().mockImplementation(() => Promise.resolve()),
  }
})

jest.mock('sweetalert2-react-content', () => {
  return jest.fn().mockImplementation(() => ({
    fire: jest.fn().mockImplementation(() => Promise.resolve()),
  }))
})

describe('SweetAlert', () => {
  it('can be called and returns a promise', async () => {
    const result = SweetAlert.fire({
      title: 'Test',
      text: 'This is a test alert',
    })

    expect(result).toBeInstanceOf(Promise)
    await expect(result).resolves.toBeUndefined()
  })
})
