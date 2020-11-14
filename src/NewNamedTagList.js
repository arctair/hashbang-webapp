import { useState } from 'react'
import { createNamedTagList } from './hashbang-api'
import './NamedTagList.css'

function NewNamedTagList() {
  const [name, setName] = useState('')
  const [tags, setTags] = useState([])
  return (
    <div className="namedTagList" data-testid="newNamedTagList">
      <input
        className="name"
        data-testid="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="tags"
        data-testid="tags"
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