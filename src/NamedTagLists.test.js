import { render } from '@testing-library/react'
import NamedTagLists from './NamedTagLists'

import { useNamedTagLists } from './hashbang-api'

jest.mock('./hashbang-api', () => ({
  useNamedTagLists: jest.fn(),
}))

beforeEach(() => {
  useNamedTagLists.mockClear()
})

test('renders no named tag lists', async () => {
  useNamedTagLists.mockReturnValue([])

  const { container } = render(<NamedTagLists />)

  expect(container.querySelector('[data-testid=namedTagList]')).toBeNull()
})

test('renders named tag lists', async () => {
  useNamedTagLists.mockReturnValue([
    {
      name: 'minnesota',
      tags: ['#cold', '#craftbeer'],
    },
  ])

  const { container } = render(<NamedTagLists />)

  expect(
    container.querySelector(
      '[data-testid=namedTagList] > [data-testid=name]',
    ).textContent,
  ).toBe('minnesota')
  expect(
    container.querySelector(
      '[data-testid=namedTagList] > [data-testid=tags]',
    ).textContent,
  ).toBe('#cold #craftbeer')
})
