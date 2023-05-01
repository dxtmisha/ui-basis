import { Ref, ref } from 'vue'
import { StorageAbstract } from '../../../classes/StorageAbstract'

import { AnyOrUndefinedType } from '../../../constructors/types'

describe('classes/StorageAbstract', () => {
  class StorageItem<T> extends StorageAbstract<T> {
    // eslint-disable-next-line no-useless-constructor
    constructor (
      value: Ref<AnyOrUndefinedType<T>>
    ) {
      super(value)
    }
  }

  it('get', () => {
    const item = new StorageItem(ref<any>())

    expect(item.getStatic()).toBe(undefined)
    expect(item.getStatic('default')).toBe('default')
    expect(item.getStatic(ref('default'))).toBe('default')

    expect(item.getStatic(() => 'default')).toBe('default')
    expect(item.getStatic()).toBe('default')
    expect(item.get().value).toBe('default')

    expect(new StorageItem(ref('value')).getStatic()).toBe('value')
    expect(new StorageItem(ref('value')).get().value).toBe('value')
  })

  it('get/value', () => {
    const item = new StorageItem(ref<any>())

    expect(item.getStatic(() => 'default')).toBe('default')
    expect(item.getStatic()).toBe('default')

    expect(item.getStatic('new')).toBe('default')
  })

  it('getItem', () => {
    const item = ref()
    expect((new StorageItem(item)).getItem()).toBe(item)
  })

  it('getAsync', async () => {
    const item = new StorageItem(ref<any>())

    expect(
      (await item.getAsync(() => new Promise(resolve => resolve('value')))).value
    ).toBe('value')
  })

  it('set', async () => {
    const item = new StorageItem(ref<any>())

    item.set('value')
    expect(item.getStatic()).toBe('value')
  })

  it('remove', async () => {
    const item = new StorageItem(ref('value'))

    item.remove()
    expect(item.getStatic()).toBe(undefined)
  })
})
