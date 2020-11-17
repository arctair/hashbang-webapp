import { useEffect, useState } from 'react'
import {
  createNamedTagList,
  deleteNamedTagLists,
  getNamedTagLists,
} from './hashbang.http'

function useNamedTagLists() {
  const [namedTagLists, setNamedTagLists] = useState([])
  useEffect(() => {
    getNamedTagLists().then((ntls) => setNamedTagLists(ntls))
  }, [])
  return namedTagLists
}

function useNamedTagListsOps() {
  return {
    createNamedTagList,
    deleteNamedTagLists,
  }
}

export { useNamedTagLists, useNamedTagListsOps }
