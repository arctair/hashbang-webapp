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
        createNamedTagList: async (namedTagList) => {
          const next = await createNamedTagList(namedTagList)
          setNamedTagLists((namedTagLists) => namedTagLists.concat(next))
          return next
        },
      }}
    >
      {children}
    </context.Provider>
  )
}

function useNamedTagLists(context) {
  return useContext(context)
}

export { Provider, useNamedTagLists }
