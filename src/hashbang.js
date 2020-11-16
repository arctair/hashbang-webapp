import { useEffect, useState } from 'react'
import { getNamedTagLists } from './hashbang.http'

function useNamedTagLists() {
  const [namedTagLists, setNamedTagLists] = useState([])
  useEffect(() => {
    getNamedTagLists().then((ntls) => setNamedTagLists(ntls))
  }, [])
  return namedTagLists
}

export { useNamedTagLists }
