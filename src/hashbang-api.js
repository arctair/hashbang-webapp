import { useEffect } from 'react'
import { useState } from 'react'

function useNamedTagLists() {
  const [namedTagLists, setNamedTagLists] = useState([])
  useEffect(() => {
    fetch('https://hashbang.arctair.com/namedTagLists')
      .then((response) => response.json())
      .then((ntls) => setNamedTagLists(ntls))
  }, [])
  return namedTagLists
}

export { useNamedTagLists }
