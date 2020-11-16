import NamedTagList from './NamedTagList'
import { useNamedTagLists } from './hashbang'
import NewNamedTagList from './NewNamedTagList'

function NamedTagLists() {
  return (
    <>
      {useNamedTagLists().map(({ id, name, tags }, key) => (
        <NamedTagList id={id} name={name} tags={tags} key={key} />
      ))}
      <NewNamedTagList />
    </>
  )
}

export default NamedTagLists
