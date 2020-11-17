import { useState } from 'react'
import { useNamedTagLists } from './hashbang'
import context from './context'
import './NamedTagList.css'

function NewNamedTagList() {
  const [name, setName] = useState('')
  const [tags, setTags] = useState([])
  const { createNamedTagList } = useNamedTagLists(context)
  return (
    <div className="namedTagList" data-testid="newNamedTagList">
      <input
        className="name"
        data-testid="name"
        placeholder="autumn"
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="tags"
        data-testid="tags"
        placeholder="#craftbeer #leaves"
        onChange={(e) => setTags(e.target.value.split(' '))}
      />
      <button
        className="create"
        data-testid="create"
        onClick={() => createNamedTagList({ name, tags })}
      />
    </div>
  )
}

export default NewNamedTagList
