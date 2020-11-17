import React from 'react'
import { fireEvent, render } from '@testing-library/react'
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
    replaceNamedTagList: () => {},
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
    ).value,
  ).toBe('minnesota')
  expect(
    container.querySelector(
      '[data-testid=namedTagList] > [data-testid=tags]',
    ).value,
  ).toBe('#cold #craftbeer')
})

test('delete', async () => {
  const deleteNamedTagLists = jest.fn()
  deleteNamedTagLists.mockResolvedValue()
  useNamedTagLists.mockReturnValue({ deleteNamedTagLists })

  const { container } = render(
    <NamedTagList id={'deadbeef'} name={''} tags={[]} />,
  )

  container
    .querySelector('[data-testid=namedTagList] > [data-testid=delete]')
    .click()

  expect(deleteNamedTagLists).toHaveBeenCalledWith(['deadbeef'])
})

test('updating name', async () => {
  const replaceNamedTagList = jest.fn()
  replaceNamedTagList.mockResolvedValue()
  useNamedTagLists.mockReturnValue({ replaceNamedTagList })

  const utils = render(
    <NamedTagList id={'deadbeef'} name={''} tags={['#tags']} />,
  )

  fireEvent.change(utils.getByTestId('name'), {
    target: { value: 'beef stew' },
  })

  expect(replaceNamedTagList).toHaveBeenCalledWith({
    id: 'deadbeef',
    name: 'beef stew',
    tags: ['#tags'],
  })
})

test('updating tags', async () => {
  const replaceNamedTagList = jest.fn()
  replaceNamedTagList.mockResolvedValue()
  useNamedTagLists.mockReturnValue({ replaceNamedTagList })

  const utils = render(
    <NamedTagList id={'deadbeef'} name={'name'} tags={[]} />,
  )

  fireEvent.change(utils.getByTestId('tags'), {
    target: { value: '#beef #stew' },
  })

  expect(replaceNamedTagList).toHaveBeenCalledWith({
    id: 'deadbeef',
    name: 'name',
    tags: ['#beef', '#stew'],
  })
})
