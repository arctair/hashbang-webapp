import { useNamedTagListsOps } from './hashbang'
import './NamedTagList.css'

function NamedTagList({ id, name, tags }) {
  const { deleteNamedTagLists } = useNamedTagListsOps()
  return (
    <div className="namedTagList" data-testid="namedTagList">
      <div className="id" data-testid="id">
        {id}
      </div>
      <div className="name" data-testid="name">
        {name}
      </div>
      <button
        onClick={() => deleteNamedTagLists([id])}
        className="delete"
        data-testid="delete"
      />
      <div className="tags" data-testid="tags">
        {tags.join(' ')}
      </div>
    </div>
  )
}

export default NamedTagList
