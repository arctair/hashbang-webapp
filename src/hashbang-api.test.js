import api from './hashbang-api'
import nock from 'nock'

const cors = {
  'access-control-allow-origin': '*',
  'access-control-allow-credentials': 'true',
}

test('get named tag lists', async () => {
  const scope = nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .get('/namedTagLists')
    .reply(200, [{ name: 'minnesota', tags: ['#cold', '#craftbeer'] }])

  const gotNamedTagLists = await api.getNamedTagLists()
  const wantNamedTagLists = [
    { name: 'minnesota', tags: ['#cold', '#craftbeer'] },
  ]

  expect(gotNamedTagLists).toEqual(wantNamedTagLists)
})

test('get named tag lists is empty', async () => {
  const scope = nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .get('/namedTagLists')
    .reply(200, [])

  const gotNamedTagLists = await api.getNamedTagLists()
  const wantNamedTagLists = []

  expect(gotNamedTagLists).toEqual(wantNamedTagLists)
})
