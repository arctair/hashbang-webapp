import React from 'react'
import { render } from '@testing-library/react'
import NamedTagList from './NamedTagList'

import { deleteNamedTagLists } from './hashbang.http'

jest.mock('./hashbang.http', () => ({
  deleteNamedTagLists: jest.fn(),
}))

beforeEach(() => {
  deleteNamedTagLists.mockClear()
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
  const { container } = render(<NamedTagList id={'deadbeef'} tags={[]} />)

  container
    .querySelector('[data-testid=namedTagList] > [data-testid=delete]')
    .click()

  expect(deleteNamedTagLists).toHaveBeenCalledWith(['deadbeef'])
})
