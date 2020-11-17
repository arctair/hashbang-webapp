import React from 'react'
import { render } from '@testing-library/react'
import NamedTagList from './NamedTagList'

import { useNamedTagLists } from './hashbang'
import context from './context'

jest.mock('./hashbang', () => ({
  useNamedTagLists: jest.fn(),
}))

jest.mock('./context', () => ({ fake: 'context' }))

beforeEach(() => {
  useNamedTagLists.mockReturnValue({
    deleteNamedTagLists: () => {},
  })
})

afterEach(() => {
  expect(useNamedTagLists).toHaveBeenCalledWith(context)
})

test('render', async () => {
  const { container } = render(
    <NamedTagList
      id={'deadbeef'}
      name={'minnesota'}
      tags={['#cold', '#craftbeer']}
    />,
  )

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

test('delete', async () => {
  const deleteNamedTagLists = jest.fn()
  deleteNamedTagLists.mockResolvedValue()
  useNamedTagLists.mockReturnValue({ deleteNamedTagLists })

  const { container } = render(<NamedTagList id={'deadbeef'} tags={[]} />)

  container
    .querySelector('[data-testid=namedTagList] > [data-testid=delete]')
    .click()

  expect(deleteNamedTagLists).toHaveBeenCalledWith(['deadbeef'])
})
