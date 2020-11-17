import { act, renderHook } from '@testing-library/react-hooks'
import {
  createNamedTagList as httpCreateNamedTagList,
  deleteNamedTagLists as httpDeleteNamedTagLists,
  getNamedTagLists,
} from './hashbang.http'
import { useNamedTagLists, Provider } from './hashbang'
import { createContext } from 'react'

jest.mock('./hashbang.http', () => ({
  createNamedTagList: jest.fn(),
  deleteNamedTagLists: jest.fn(),
  getNamedTagLists: jest.fn(),
}))

test('get named tag lists', async () => {
  getNamedTagLists.mockResolvedValue([
    { name: 'minnesota', tags: ['#cold', '#craftbeer'] },
  ])

  const context = createContext()
  const { result, waitForNextUpdate } = renderHook(
    () => useNamedTagLists(context),
    {
      wrapper: ({ children }) => (
        <Provider context={context} children={children} />
      ),
    },
  )
  await waitForNextUpdate()

  const gotNamedTagLists = result.current.namedTagLists
  const wantNamedTagLists = [
    { name: 'minnesota', tags: ['#cold', '#craftbeer'] },
  ]

  expect(gotNamedTagLists).toEqual(wantNamedTagLists)
})

test('create named tag list', async () => {
  getNamedTagLists.mockResolvedValue([])

  const request = {
    name: 'notreal',
    tags: ['#fake'],
  }

  const response = {
    id: 'deadbeef',
    name: 'fake',
    tags: ['#notreal'],
  }

  httpCreateNamedTagList.mockResolvedValue(response)

  const context = createContext()
  const hook = renderHook(() => useNamedTagLists(context), {
    wrapper: ({ children }) => (
      <Provider context={context} children={children} />
    ),
  })
  const { createNamedTagList } = hook.result.current

  await act(async () => {
    const gotNamedTagList = await createNamedTagList(request)
    const wantNamedTagList = response
    expect(gotNamedTagList).toEqual(wantNamedTagList)
  })

  expect(httpCreateNamedTagList).toHaveBeenCalledWith(request)

  const gotNamedTagLists = hook.result.current.namedTagLists
  const wantNamedTagLists = [response]

  expect(gotNamedTagLists).toEqual(wantNamedTagLists)
})

test('delete named tag lists', async () => {
  const context = createContext()

  getNamedTagLists.mockResolvedValue([
    { id: 'deadbeef' },
    { id: 'beefdead' },
    { id: 'dont delete me' },
  ])
  const hook = renderHook(() => useNamedTagLists(context), {
    wrapper: ({ children }) => (
      <Provider context={context} children={children} />
    ),
  })
  const { deleteNamedTagLists } = hook.result.current

  httpDeleteNamedTagLists.mockResolvedValue()
  await act(async () => {
    await deleteNamedTagLists(['deadbeef', 'beefdead'])
  })

  expect(httpDeleteNamedTagLists).toHaveBeenCalledWith([
    'deadbeef',
    'beefdead',
  ])

  const gotNamedTagLists = hook.result.current.namedTagLists
  const wantNamedTagLists = [{ id: 'dont delete me' }]

  expect(gotNamedTagLists).toEqual(wantNamedTagLists)
})
