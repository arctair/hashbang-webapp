import { useEffect } from 'react'
import { useState } from 'react'

function createNamedTagList(namedTagList) {
  return fetch('https://hashbang.arctair.com/namedTagLists', {
    method: 'POST',
    body: JSON.stringify(namedTagList),
  }).then((response) => response.json())
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

export { createNamedTagList, useNamedTagLists }
