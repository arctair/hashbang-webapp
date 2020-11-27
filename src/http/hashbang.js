const url = (path, params = {}) => {
  const url = new URL(path, 'https://hashbang.arctair.com')
  url.search = new URLSearchParams(params)
  return url
}

function createNamedTagList(namedTagList, bucket = 'default') {
  return fetch(url('/namedTagLists', { bucket }), {
    method: 'POST',
    body: JSON.stringify(namedTagList),
  }).then((response) => response.json())
}

function deleteNamedTagLists(ids) {
  const path = url('/namedTagLists', { id: ids.join(',') })
  return fetch(path, {
    method: 'DELETE',
  }).then((response) => {
    if (response.status !== 204) {
      throw Error(
        `Got status code ${response.status} trying to delete ${path}`,
      )
    }
  })
}

function getNamedTagLists(bucket = 'default') {
  return fetch(url('/namedTagLists', { bucket })).then((response) =>
    response.json(),
  )
}

function replaceNamedTagList({ id, ...namedTagList }) {
  const path = url('/namedTagLists', { id })
  return fetch(path, {
    method: 'PUT',
    body: JSON.stringify(namedTagList),
  }).then((response) => {
    if (response.status !== 204) {
      throw Error(
        `Got status code ${response.status} trying to put ${path}`,
      )
    }
  })
}

export {
  createNamedTagList,
  deleteNamedTagLists,
  getNamedTagLists,
  replaceNamedTagList,
}
