import { StorageItemAbstract } from '../../../classes/StorageItemAbstract'

describe('classes/StorageItemAbstract', () => {
  class StorageItem<T> extends StorageItemAbstract<T> {
    // eslint-disable-next-line no-useless-constructor
    constructor (
      name: string,
      key: string,
      method?: Storage
    ) {
      super(name, key, undefined, method)
    }
  }

  it('get', () => {
    const item = new StorageItem('name', 'key')

    expect(item.getStatic()).toBeUndefined()
    expect(item.get().value).toBeUndefined()
  })

  it('set', () => {
    const item = new StorageItem('name', 'key')

    item.set('value')

    expect(item.getStatic()).toBe('value')
    expect(item.get().value).toBe('value')
  })

  it('cache', async () => {
    const item = new StorageItem('name', 'key')
    await item.cache(() => 'value')

    expect(item.getStatic()).toBe('value')
    expect(item.get().value).toBe('value')

    await item.cache(() => 'old')
    expect(item.getStatic()).toBe('value')

    await item.cache(() => 'new', 0)
    expect(item.getStatic()).toBe('value')
  })
})
