import NamedTagList from './NamedTagList'
import { useNamedTagLists } from './hashbang'
import NewNamedTagList from './NewNamedTagList'
import context from './context'

function NamedTagLists() {
  return (
    <>
      {useNamedTagLists(context).map(({ id, name, tags }, key) => (
        <NamedTagList id={id} name={name} tags={tags} key={key} />
      ))}
      <NewNamedTagList />
    </>
  )
}

export default NamedTagLists
