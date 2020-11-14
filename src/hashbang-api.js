import { useEffect } from 'react'
import { useState } from 'react'

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
    if (response.status != 204) {
      throw Error(
        `Got status code ${response.status} trying to delete ${path}`,
      )
    }
  })
}

function useNamedTagLists() {
  const [namedTagLists, setNamedTagLists] = useState([])
  useEffect(() => {
    fetch('https://hashbang.arctair.com/namedTagLists')
      .then((response) => response.json())
      .then((ntls) => setNamedTagLists(ntls))
  }, [])
  return namedTagLists
}

export { createNamedTagList, deleteNamedTagLists, useNamedTagLists }
