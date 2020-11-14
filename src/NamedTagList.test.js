import React from 'react'
import { render } from '@testing-library/react'
import NamedTagList from './NamedTagList'

test('render', async () => {
  const { container } = render(
    <NamedTagList name={'minnesota'} tags={['#cold', '#craftbeer']} />,
  )

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
