import { fireEvent, render } from '@testing-library/react'
import NewNamedTagList from './NewNamedTagList'

import { createNamedTagList, useNamedTagLists } from './hashbang-api'

jest.mock('./hashbang-api', () => ({
  createNamedTagList: jest.fn(),
}))

beforeEach(() => {
  createNamedTagList.mockClear()
})

test('create new named tag list', async () => {
  createNamedTagList.mockResolvedValue({ id: 'deadbeef' })

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
