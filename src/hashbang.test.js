import { act, renderHook } from '@testing-library/react-hooks'
import {
  createNamedTagList,
  deleteNamedTagLists,
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

  createNamedTagList.mockResolvedValue(response)

  const context = createContext()
  const hook = renderHook(() => useNamedTagLists(context), {
    wrapper: ({ children }) => (
      <Provider context={context} children={children} />
    ),
  })
  const { createNamedTagList: hookFn } = hook.result.current

  await act(async () => {
    const gotNamedTagList = await hookFn(request)
    const wantNamedTagList = response
    expect(gotNamedTagList).toEqual(wantNamedTagList)
  })

  expect(createNamedTagList).toHaveBeenCalledWith(request)
})

test('delete named tag lists', async () => {
  getNamedTagLists.mockResolvedValue([])
  deleteNamedTagLists.mockResolvedValue()

  const context = createContext()
  const hook = renderHook(() => useNamedTagLists(context), {
    wrapper: ({ children }) => (
      <Provider context={context} children={children} />
    ),
  })
  const { deleteNamedTagLists: hookFn } = hook.result.current

  await act(async () => {
    await hookFn(['deadbeef', 'feedbef'])
  })

  expect(deleteNamedTagLists).toHaveBeenCalledWith(['deadbeef', 'feedbef'])
})
