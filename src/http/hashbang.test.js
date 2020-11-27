import {
  createNamedTagList,
  deleteNamedTagLists,
  getNamedTagLists,
  replaceNamedTagList,
} from './hashbang'
import nock from 'nock'
import { eq } from 'fn'

const cors = {
  'access-control-allow-origin': '*',
  'access-control-allow-credentials': 'true',
}

beforeEach(() => {
  nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .options(() => true)
    .reply(200)
})

test('get named tag lists', async () => {
  nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .get('/namedTagLists?bucket=default')
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
    .get('/namedTagLists?bucket=default')
    .reply(200, [])

  const gotNamedTagLists = await getNamedTagLists()
  const wantNamedTagLists = []

  expect(gotNamedTagLists).toEqual(wantNamedTagLists)
})

test('create named tag list', async () => {
  nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .post('/namedTagLists?bucket=default', {
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
    .delete('/namedTagLists?id=deadbeef')
    .reply(204)

  await deleteNamedTagLists(['deadbeef'])
})

test('delete named tag list when error', async () => {
  nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .delete('/namedTagLists?id=deadbeef')
    .reply(504)

  await expect(deleteNamedTagLists(['deadbeef'])).rejects.toEqual(
    Error(
      'Got status code 504 trying to delete https://hashbang.arctair.com/namedTagLists?id=deadbeef',
    ),
  )
})

test('replace named tag list', async () => {
  nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .put('/namedTagLists?id=deadbeef')
    .reply((_, body) => {
      const namedTagList = JSON.parse(body)
      if (
        namedTagList.name === 'deadbeef' &&
        eq(namedTagList.tags, ['#deadbeef'])
      ) {
        return [204]
      } else {
        console.log(
          `Unexpected mock arguments name=${namedTagList.name} tags=${namedTagList.tags}`,
        )
        return [
          400,
          `Unexpected mock arguments name=${namedTagList.name} tags=${namedTagList.tags}`,
        ]
      }
    })

  await replaceNamedTagList({
    id: 'deadbeef',
    name: 'deadbeef',
    tags: ['#deadbeef'],
  })
})

test('replace named tag list when error', async () => {
  nock('https://hashbang.arctair.com')
    .defaultReplyHeaders(cors)
    .put('/namedTagLists?id=deadbeef')
    .reply(504)

  await expect(
    replaceNamedTagList({
      id: 'deadbeef',
      name: 'deadbeef',
      tags: ['#deadbeef'],
    }),
  ).rejects.toEqual(
    Error(
      'Got status code 504 trying to put https://hashbang.arctair.com/namedTagLists?id=deadbeef',
    ),
  )
})
