import { fireEvent, render } from '@testing-library/react'
import NewNamedTagList from './NewNamedTagList'
import { useNamedTagLists } from 'hook/hashbang'
import context from 'context'

jest.mock('hook/hashbang', () => ({
  useNamedTagLists: jest.fn(),
}))

jest.mock('context', () => ({ fake: 'context' }))

afterEach(() => {
  expect(useNamedTagLists).toHaveBeenCalledWith(context)
})

test('create new named tag list', async () => {
  const createNamedTagList = jest.fn()
  createNamedTagList.mockResolvedValue({ id: 'deadbeef' })
  useNamedTagLists.mockReturnValue({ createNamedTagList })

  const utils = render(<NewNamedTagList />)

  fireEvent.change(utils.getByTestId('name'), {
    target: { value: 'minnesota' },
  })
  fireEvent.change(utils.getByTestId('tags'), {
    target: { value: '#cold #windy' },
  })
  utils.getByTestId('create').click()

  expect(createNamedTagList).toHaveBeenCalledWith({
    name: 'minnesota',
    tags: ['#cold', '#windy'],
  })
})
