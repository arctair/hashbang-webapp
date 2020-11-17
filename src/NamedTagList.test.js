import React from 'react'
import { render } from '@testing-library/react'
import NamedTagList from './NamedTagList'

import { useNamedTagListsOps } from './hashbang'

jest.mock('./hashbang', () => ({
  useNamedTagListsOps: jest.fn(),
}))

beforeEach(() => {
  useNamedTagListsOps.mockReturnValue({
    deleteNamedTagLists: () => {},
  })
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
  useNamedTagListsOps.mockReturnValue({ deleteNamedTagLists })

  const { container } = render(<NamedTagList id={'deadbeef'} tags={[]} />)

  container
    .querySelector('[data-testid=namedTagList] > [data-testid=delete]')
    .click()

  expect(deleteNamedTagLists).toHaveBeenCalledWith(['deadbeef'])
})
