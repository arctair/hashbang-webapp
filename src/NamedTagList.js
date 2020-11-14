function NamedTagList({ name, tags }) {
  return (
    <div className="namedTagList" data-testid="namedTagList">
      <div className="name" data-testid="name">
        {name}
      </div>
      <div className="tags" data-testid="tags">
        {tags.join(' ')}
      </div>
    </div>
  )
}

export default NamedTagList
