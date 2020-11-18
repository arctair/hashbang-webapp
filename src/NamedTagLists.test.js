import { render } from '@testing-library/react'
import NamedTagLists from './NamedTagLists'
import { useNamedTagLists } from './hashbang'
import context from './context'

jest.mock('./hashbang', () => ({
  useNamedTagLists: jest.fn(),
}))

jest.mock('./context', () => ({ fake: 'context' }))

beforeEach(() => {
  useNamedTagLists.mockReturnValue({
    namedTagLists: [],
  })
})

afterEach(() => {
  expect(useNamedTagLists).toHaveBeenCalledWith(context)
})

function FakeNamedTagList({ id, name, tags }) {
  return (
    <div data-testid="fakeNamedTagList">
      <div data-testid="id">{id}</div>
      <div data-testid="name">{name}</div>
      <div data-testid="tags">{tags}</div>
    </div>
  )
}

test('renders no named tag lists', async () => {
  const { container } = render(
    <NamedTagLists Component={FakeNamedTagList} />,
  )

  expect(
    container.querySelector('[data-testid=fakeNamedTagList]'),
  ).toBeNull()
})

test('renders named tag lists', async () => {
  useNamedTagLists.mockReturnValue({
    namedTagLists: [
      {
        tags: [],
      },
    ],
  })

  const { container } = render(
    <NamedTagLists Component={FakeNamedTagList} />,
  )

  expect(
    container.querySelectorAll('[data-testid=fakeNamedTagList]'),
  ).toHaveLength(1)
})
