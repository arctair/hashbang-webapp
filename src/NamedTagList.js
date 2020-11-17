import { useState } from 'react'
import { useNamedTagLists } from './hashbang'
import './NamedTagList.css'
import context from './context'

function NamedTagList({ id, name: _name, tags: _tags }) {
  const { deleteNamedTagLists, replaceNamedTagList } = useNamedTagLists(
    context,
  )
  const [name, setName] = useState(_name)
  const [tags, setTags] = useState(_tags)
  return (
    <div className="namedTagList" data-testid="namedTagList">
      <div className="id" data-testid="id">
        {id}
      </div>
      <input
        className="name"
        data-testid="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          replaceNamedTagList({
            id,
            name: e.target.value,
            tags,
          })
        }}
      />
      <button
        onClick={() => deleteNamedTagLists([id])}
        className="delete"
        data-testid="delete"
      />
      <input
        className="tags"
        data-testid="tags"
        value={tags.join(' ')}
        onChange={(e) => {
          const next = e.target.value.split(' ')
          setTags(next)
          replaceNamedTagList({
            id,
            name,
            tags: next,
          })
        }}
      />
    </div>
  )
}

export default NamedTagList
