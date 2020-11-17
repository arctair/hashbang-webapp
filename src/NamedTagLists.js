import NamedTagList from './NamedTagList'
import { useNamedTagLists } from './hashbang'
import NewNamedTagList from './NewNamedTagList'
import context from './context'

function NamedTagLists() {
  const { namedTagLists } = useNamedTagLists(context)
  return (
    <>
      {namedTagLists.map(({ id, name, tags }, key) => (
        <NamedTagList id={id} name={name} tags={tags} key={key} />
      ))}
      <NewNamedTagList />
    </>
  )
}

export default NamedTagLists
