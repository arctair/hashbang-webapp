import './App.css'
import { useNamedTagLists } from './hashbang-api'

function App() {
  return useNamedTagLists().map(({ name, tags }, key) => (
    <div data-testid="namedTagList" key={key}>
      <div data-testid="name">{name}</div>
      <div data-testid="tags">{tags.join(' ')}</div>
    </div>
  ))
}

export default App
