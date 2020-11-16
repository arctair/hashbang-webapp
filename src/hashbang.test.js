import { renderHook } from '@testing-library/react-hooks'
import { createNamedTagList, getNamedTagLists } from './hashbang.http'
import { useNamedTagLists, useNamedTagListsOps } from './hashbang'
import { createContext } from 'react'

jest.mock('./hashbang.http', () => ({
  getNamedTagLists: jest.fn(),
  createNamedTagList: jest.fn(),
}))

test('get named tag lists', async () => {
  getNamedTagLists.mockResolvedValue([
    { name: 'minnesota', tags: ['#cold', '#craftbeer'] },
  ])

  const { result, waitForNextUpdate } = renderHook(() =>
    useNamedTagLists(),
  )
  await waitForNextUpdate()

  const gotNamedTagLists = result.current
  const wantNamedTagLists = [
    { name: 'minnesota', tags: ['#cold', '#craftbeer'] },
  ]

  expect(gotNamedTagLists).toEqual(wantNamedTagLists)
})

test('create named tag list', async () => {
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

  const hook = renderHook(() => useNamedTagListsOps())
  const { createNamedTagList: hookFn } = hook.result.current

  const gotNamedTagList = await hookFn(request)
  const wantNamedTagList = response
  expect(gotNamedTagList).toEqual(wantNamedTagList)

  expect(createNamedTagList).toHaveBeenCalledWith(request)
})
