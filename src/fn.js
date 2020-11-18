import { useEffect, useState } from 'react'

function classNames(...strings) {
  return strings.filter((string) => !!string).join(' ')
}

function eq(a1, a2) {
  if (a1.length !== a2.length) {
    return false
  }
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false
    }
  }
  return true
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize())
  useEffect(() => {
    function onResize() {
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })
  return windowSize
}

function getWindowSize() {
  return {
    height: window.innerHeight,
    width: window.innerWidth,
  }
}

export { classNames, eq, useWindowSize }
