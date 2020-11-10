import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

import { useNamedTagLists } from './hashbang-api'

jest.mock('./hashbang-api', () => ({
  useNamedTagLists: jest.fn(),
}))

beforeEach(() => {
  useNamedTagLists.mockClear()
})

test('renders no named tag lists', async () => {
  useNamedTagLists.mockReturnValue([])

  const { container } = render(<App />)

  expect(container.firstChild).toBeNull()
})

test('renders named tag lists', async () => {
  useNamedTagLists.mockReturnValue([
    {
      name: 'minnesota',
      tags: ['#cold', '#craftbeer'],
    },
  ])

  const { container } = render(<App />)

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
