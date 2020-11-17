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
    createNamedTagList: () => {},
    deleteNamedTagLists: () => {},
    namedTagLists: [],
  })
})

afterEach(() => {
  expect(useNamedTagLists).toHaveBeenCalledWith(context)
})

test('renders no named tag lists', async () => {
  const { container } = render(<NamedTagLists />)

  expect(container.querySelector('[data-testid=namedTagList]')).toBeNull()
  expect(
    container.querySelectorAll('[data-testid=newNamedTagList]'),
  ).toHaveLength(1)
})

test('renders named tag lists', async () => {
  useNamedTagLists.mockReturnValue({
    namedTagLists: [
      {
        tags: [],
      },
    ],
  })

  const { container } = render(<NamedTagLists />)

  expect(
    container.querySelector('[data-testid=namedTagList]'),
  ).toHaveLength(1)
})
