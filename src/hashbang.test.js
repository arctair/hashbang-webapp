import { renderHook } from '@testing-library/react-hooks'
import { getNamedTagLists } from './hashbang.http'
import { useNamedTagLists } from './hashbang'

jest.mock('./hashbang.http', () => ({
  getNamedTagLists: jest.fn(),
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

test('get named tag lists is empty', async () => {
  getNamedTagLists.mockResolvedValue([])

  const { result, waitForNextUpdate } = renderHook(() =>
    useNamedTagLists(),
  )
  await waitForNextUpdate()

  const gotNamedTagLists = result.current
  const wantNamedTagLists = []

  expect(gotNamedTagLists).toEqual(wantNamedTagLists)
})
