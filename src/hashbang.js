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
    <context.Provider
      value={{
        namedTagLists,
        deleteNamedTagLists: (ids) => {
          deleteNamedTagLists(ids).then(() => {
            setNamedTagLists((namedTagLists) =>
              namedTagLists.filter(({ id }) => ids.indexOf(id) < 0),
            )
          })
        },
      }}
    >
      {children}
    </context.Provider>
  )
}

function useNamedTagLists(context) {
  const { namedTagLists, deleteNamedTagLists } = useContext(context)
  return {
    namedTagLists,
    createNamedTagList,
    deleteNamedTagLists,
  }
}

export { Provider, useNamedTagLists }
