import { act, renderHook } from '@testing-library/react-hooks'
import { createContext } from 'react'
import useBucket, { Provider } from './useBucket'

test('default bucket', () => {
  const context = createContext()
  const wrapper = ({ children }) => (
    <Provider context={context} children={children} />
  )

  const utils = renderHook(() => useBucket(context), { wrapper })

  expect(utils.result.current.bucket).toBe('default')
})

test('set bucket', async () => {
  const context = createContext()
  const provider = <Provider context={context} />
  const wrapper = ({ children }) => (
    <Provider context={context} children={children} />
  )

  let utils = renderHook(() => useBucket(context), { wrapper })
  await act(async () => utils.result.current.setBucket('updated'))

  utils = renderHook(() => useBucket(context), { wrapper })
  expect(utils.result.current.bucket).toBe('updated')
})
