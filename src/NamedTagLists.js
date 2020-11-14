import NamedTagList from './NamedTagList'
import { useNamedTagLists } from './hashbang-api'
import NewNamedTagList from './NewNamedTagList'

function NamedTagLists() {
  return (
    <>
      {useNamedTagLists().map(({ name, tags }, key) => (
        <NamedTagList name={name} tags={tags} key={key} />
      ))}
      <NewNamedTagList />
    </>
  )
}

export default NamedTagLists
