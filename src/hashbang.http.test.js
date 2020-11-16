import {
  createNamedTagList,
  deleteNamedTagLists,
  getNamedTagLists,
} from './hashbang.http'
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

  const gotNamedTagLists = await getNamedTagLists()
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

  const gotNamedTagLists = await getNamedTagLists()
  const wantNamedTagLists = []

  expect(gotNamedTagLists).toEqual(wantNamedTagLists)
})

test('create named tag list', async () => {
  nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .post('/namedTagLists', {
      name: 'sleep',
      tags: ['#when', '#im', '#dead'],
    })
    .reply(200, {
      id: 'deadbeef',
      name: 'nautical',
      tags: ['#kick', '#flip'],
    })

  const gotNamedTagList = await createNamedTagList({
    name: 'sleep',
    tags: ['#when', '#im', '#dead'],
  })

  const wantNamedTagList = {
    id: 'deadbeef',
    name: 'nautical',
    tags: ['#kick', '#flip'],
  }

  expect(gotNamedTagList).toEqual(wantNamedTagList)
})

test('delete named tag list', async () => {
  nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .options('/namedTagLists?id=deadbeef')
    .reply(200)
  nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .delete('/namedTagLists?id=deadbeef')
    .reply(204)

  await deleteNamedTagLists(['deadbeef'])
})

test('delete named tag list when error', async () => {
  nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .options('/namedTagLists?id=deadbeef')
    .reply(200)
  nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .delete('/namedTagLists?id=deadbeef')
    .reply(504)

  await expect(deleteNamedTagLists(['deadbeef'])).rejects.toEqual(
    Error(
      'Got status code 504 trying to delete /namedTagLists?id=deadbeef',
    ),
  )
})
