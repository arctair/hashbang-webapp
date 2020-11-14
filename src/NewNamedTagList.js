import { useState } from 'react'
import { createNamedTagList } from './hashbang-api'

function NewNamedTagList() {
  const [name, setName] = useState('')
  const [tags, setTags] = useState([])
  return (
    <div data-testid="newNamedTagList">
      <input
        data-testid="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        data-testid="tags"
        onChange={(e) => setTags(e.target.value.split(' '))}
      />
      <button
        data-testid="create"
        onClick={() => createNamedTagList({ name, tags })}
      />
    </div>
  )
}

export default NewNamedTagList
