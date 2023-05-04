import { HashCollect } from '../../../classes/HashCollect'

describe('classes/HashCollect', () => {
  HashCollect.set('key1', 'value1')

  it('get', () => {
    expect(HashCollect.get('key1')?.value).toBe('value1')
    expect(location.hash).toBe('#key1=value1')
  })

  it('set', () => {
    HashCollect.set('key2', 'value2')

    expect(HashCollect.get('key1')?.value).toBe('value1')
    expect(HashCollect.get('key2')?.value).toBe('value2')
    expect(location.hash).toBe('#key1=value1;key2=value2')
  })

  it('remove', () => {
    HashCollect.remove('key2')

    expect(HashCollect.get('key1')?.value).toBe('value1')
    expect(HashCollect.get('key2')?.value).toBe(undefined)
    expect(location.hash).toBe('#key1=value1')
  })
})
