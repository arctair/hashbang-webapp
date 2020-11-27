import { useNamedTagLists } from 'hook/hashbang'
import context from 'context'

function NamedTagLists({ Component }) {
  const { namedTagLists } = useNamedTagLists(context)
  return namedTagLists.map(({ id, name, tags }) => (
    <Component id={id} name={name} tags={tags} key={id} />
  ))
}

export default NamedTagLists
