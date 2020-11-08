import { useEffect, useState } from 'react'
import './App.css'
import api from './hashbang-api'

function App() {
  const [namedTagLists, setNamedTagLists] = useState([])
  useEffect(() => {
    api.getNamedTagLists().then((ntls) => setNamedTagLists(ntls))
  }, [])
  return namedTagLists.map(({ name, tags }, key) => (
    <div data-testid="namedTagList" key={key}>
      <div data-testid="name">{name}</div>
      <div data-testid="tags">{tags.join(' ')}</div>
    </div>
  ))
}

export default App
