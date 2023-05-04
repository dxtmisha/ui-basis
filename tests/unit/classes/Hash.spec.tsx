import { Hash } from '../../../classes/Hash'
import { HashCollect } from '../../../classes/HashCollect'

describe('classes/Hash', () => {
  beforeEach(() => {
    location.hash = '#key1=value1'
    HashCollect.init()
  })

  it('get', () => {
    expect(new Hash('key0').getStatic()).toBe('')
    expect(new Hash('key1').getStatic()).toBe('value1')
  })

  it('set', () => {
    new Hash('key0').set('value0')

    expect(new Hash('key0').getStatic()).toBe('value0')
    expect(new Hash('key1').getStatic()).toBe('value1')
  })
})
