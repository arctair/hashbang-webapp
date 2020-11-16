function createNamedTagList(namedTagList) {
  return fetch('https://hashbang.arctair.com/namedTagLists', {
    method: 'POST',
    body: JSON.stringify(namedTagList),
  }).then((response) => response.json())
}

function deleteNamedTagLists(ids) {
  const path = `/namedTagLists?id=${ids.join(',')}`
  return fetch(`https://hashbang.arctair.com${path}`, {
    method: 'DELETE',
  }).then((response) => {
    if (response.status !== 204) {
      throw Error(
        `Got status code ${response.status} trying to delete ${path}`,
      )
    }
  })
}

function getNamedTagLists() {
  return fetch(
    'https://hashbang.arctair.com/namedTagLists',
  ).then((response) => response.json())
}

export { createNamedTagList, deleteNamedTagLists, getNamedTagLists }
