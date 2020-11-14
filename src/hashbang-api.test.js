import { renderHook } from '@testing-library/react-hooks'
import { useNamedTagLists } from './hashbang-api'
import nock from 'nock'

const cors = {
  'access-control-allow-origin': '*',
  'access-control-allow-credentials': 'true',
}

test('get named tag lists', async () => {
  nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .get('/namedTagLists')
    .reply(200, [{ name: 'minnesota', tags: ['#cold', '#craftbeer'] }])

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
  nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .get('/namedTagLists')
    .reply(200, [])

  const { result } = renderHook(() => useNamedTagLists())

  const gotNamedTagLists = result.current
  const wantNamedTagLists = []

  expect(gotNamedTagLists).toEqual(wantNamedTagLists)
})
