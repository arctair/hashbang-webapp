import { fireEvent, render } from '@testing-library/react'
import NewNamedTagList from './NewNamedTagList'

import { useNamedTagListsOps } from './hashbang'

jest.mock('./hashbang', () => ({
  useNamedTagListsOps: jest.fn(),
}))

test('create new named tag list', async () => {
  const createNamedTagList = jest.fn()
  createNamedTagList.mockResolvedValue({ id: 'deadbeef' })
  useNamedTagListsOps.mockReturnValue({ createNamedTagList })

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
