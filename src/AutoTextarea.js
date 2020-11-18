import { useEffect, useRef, useState } from 'react'
import { classNames, useWindowSize } from './fn'
import './AutoTextarea.css'

function AutoTextarea({ value, className, ...props }) {
  const [height, setHeight] = useState(0)
  const windowSize = useWindowSize()

  const dummyRef = useRef(null)
  useEffect(() => {
    setHeight(dummyRef.current.scrollHeight)
  }, [value, windowSize])
  return (
    <>
      <textarea
        className={classNames('autotextarea', className)}
        {...props}
        value={value}
        style={{ height }}
      />
      <textarea
        className={classNames('autotextarea', 'dummy', className)}
        ref={dummyRef}
        value={value}
        onChange={() => {}}
      />
    </>
  )
}

export default AutoTextarea
