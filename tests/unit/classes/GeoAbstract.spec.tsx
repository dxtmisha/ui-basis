import { GeoAbstract } from '../../../classes/GeoAbstract'
import { Geo } from '../../../classes/Geo'

describe('classes/GeoAbstract', () => {
  class GeoItem extends GeoAbstract {
  }

  it('geo', () => {
    const item = new GeoItem()

    expect(item.data.value?.language).toBe('en')
    expect(item.data.value?.country).toBe('US')

    Geo.set('ru-RU')
    expect(item.data.value?.language).toBe('ru')
    expect(item.data.value?.country).toBe('RU')

    Geo.set('vi-VN')
    expect(item.data.value?.language).toBe('vi')
    expect(item.data.value?.country).toBe('VN')

    expect(item.lang.value).toBe('vi')
    expect(item.country.value).toBe('VN')
  })

  it('data', () => {
    const item = new GeoItem('ru-RU')
    expect(item.data.value?.language).toBe('ru')
    expect(item.data.value?.country).toBe('RU')

    Geo.set('vi-VN')
    expect(item.data.value?.language).toBe('ru')
    expect(item.data.value?.country).toBe('RU')
  })
})
