import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import Bucket from './Bucket'
import useBucket from 'hook/useBucket'

jest.mock('hook/useBucket', () => jest.fn())

test('print bucket', () => {
  useBucket.mockReturnValue({ bucket: 'the bucket' })

  const utils = render(<Bucket />)

  expect(utils.container.querySelector('[data-testid=bucket]').value).toBe(
    'the bucket',
  )
})

test('set bucket', async () => {
  const setBucket = jest.fn()
  useBucket.mockReturnValue({ setBucket })

  const utils = render(<Bucket />)
  await user.type(await utils.findByTestId('bucket'), 'updated bucket')

  expect(setBucket).toHaveBeenCalledWith('updated bucket')
})
