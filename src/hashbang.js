import { useContext, useEffect, useState } from 'react'
import {
  createNamedTagList,
  deleteNamedTagLists,
  getNamedTagLists,
} from './hashbang.http'

function Provider({ children, context }) {
  const [namedTagLists, setNamedTagLists] = useState([])
  useEffect(() => {
    getNamedTagLists().then((ntls) => setNamedTagLists(ntls))
  }, [])
  return (
    <context.Provider value={{ namedTagLists }}>
      {children}
    </context.Provider>
  )
}

function useNamedTagLists(context) {
  const { namedTagLists } = useContext(context)
  return namedTagLists
}

function useNamedTagListsOps() {
  return {
    createNamedTagList,
    deleteNamedTagLists,
  }
}

export { Provider, useNamedTagLists, useNamedTagListsOps }
