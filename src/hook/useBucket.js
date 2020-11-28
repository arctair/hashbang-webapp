import { useContext, useState } from 'react'

function Provider({ children, context }) {
  const [bucket, setBucket] = useState('default')
  return (
    <context.Provider value={{ bucket, setBucket }}>
      {children}
    </context.Provider>
  )
}

function useBucket(context) {
  return useContext(context)
}

export default useBucket
export { Provider }
