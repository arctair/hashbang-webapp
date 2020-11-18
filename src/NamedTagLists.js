import { useNamedTagLists } from './hashbang'
import context from './context'

function NamedTagLists({ Component }) {
  const { namedTagLists } = useNamedTagLists(context)
  return namedTagLists.map(({ id, name, tags }, key) => (
    <Component id={id} name={name} tags={tags} key={key} />
  ))
}

export default NamedTagLists
