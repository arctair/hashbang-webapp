import React from 'react'
import { render, waitFor } from '@testing-library/react'
import App from './App'

import api from './hashbang-api'

jest.mock('./hashbang-api', () => ({
  getNamedTagLists: jest.fn(),
}))

beforeEach(() => {
  api.getNamedTagLists.mockClear()
})

test('renders no named tag lists', async () => {
  api.getNamedTagLists.mockResolvedValue([])

  const { container } = render(<App />)

  await waitFor(() => expect(api.getNamedTagLists).toHaveBeenCalled())

  expect(container.firstChild).toBeNull()
})

test('renders named tag lists', async () => {
  api.getNamedTagLists.mockResolvedValue([
    {
      name: 'minnesota',
      tags: ['#cold', '#craftbeer'],
    },
  ])

  const { container } = render(<App />)

  await waitFor(() => expect(api.getNamedTagLists).toHaveBeenCalled())

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
