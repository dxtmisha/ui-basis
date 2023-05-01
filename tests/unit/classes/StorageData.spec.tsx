import { StorageData } from '../../../classes/StorageData'

describe('classes/StorageData', () => {
  it('get', () => {
    const item = new StorageData('name', 'key')

    expect(item.get()).toBeUndefined()
  })

  it('set', () => {
    const item = new StorageData('name', 'key')

    item.set('value')

    expect(item.get()).toBe('value')
  })

  it('return', () => {
    const item = new StorageData('name', 'key')

    item.set('value')

    expect(new StorageData('name', 'key')).toBe(item)
    expect(new StorageData('name', 'key').get()).toBe('value')
  })
})
