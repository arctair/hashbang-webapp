import NamedTagList from './NamedTagList'
import { useNamedTagLists } from './hashbang-api'

function NamedTagLists() {
  return useNamedTagLists().map(({ name, tags }, key) => (
    <NamedTagList name={name} tags={tags} key={key} />
  ))
}

export default NamedTagLists
