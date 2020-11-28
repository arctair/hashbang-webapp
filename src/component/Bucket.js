import useBucket from 'hook/useBucket'

function Bucket() {
  const { bucket, setBucket } = useBucket()
  return (
    <input
      data-testid="bucket"
      value={bucket}
      onChange={(e) => setBucket(e.target.value)}
    />
  )
}

export default Bucket
