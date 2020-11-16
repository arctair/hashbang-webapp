import { render } from '@testing-library/react'
import NamedTagLists from './NamedTagLists'

import { useNamedTagLists, useNamedTagListsOps } from './hashbang'

jest.mock('./hashbang', () => ({
  useNamedTagLists: jest.fn(),
  useNamedTagListsOps: jest.fn(),
}))

beforeEach(() => {
  useNamedTagListsOps.mockReturnValue({
    createNamedTagList: () => {},
  })
})

test('renders no named tag lists', async () => {
  useNamedTagLists.mockReturnValue([])

  const { container } = render(<NamedTagLists />)

  expect(container.querySelector('[data-testid=namedTagList]')).toBeNull()
  expect(
    container.querySelectorAll('[data-testid=newNamedTagList]'),
  ).toHaveLength(1)
})

test('renders named tag lists', async () => {
  useNamedTagLists.mockReturnValue([
    {
      id: 'deadbeef',
      name: 'minnesota',
      tags: ['#cold', '#craftbeer'],
    },
  ])

  const { container } = render(<NamedTagLists />)

  expect(
    container.querySelector(
      '[data-testid=namedTagList] > [data-testid=id]',
    ).textContent,
  ).toBe('deadbeef')
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
