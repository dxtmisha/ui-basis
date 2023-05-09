import { Geo } from '../../../classes/Geo'

describe('classes/Geo', () => {
  it('data', () => {
    expect(Geo.data.value).toEqual({
      country: 'US',
      countryAlternative: [
        'EN'
      ],
      firstDay: 'Su',
      language: 'en',
      languageAlternative: [
        'us'
      ],
      phone: '1',
      phoneMask: '+1-***-***-****',
      zone: 'America/New_York'
    })
  })

  it('lang', () => {
    expect(Geo.lang.value).toBe('en')
  })

  it('country', () => {
    expect(Geo.country.value).toBe('US')
  })

  it('code/set', () => {
    Geo.set('US')
    expect(Geo.code.value).toBe('en-US')

    Geo.set('RU')
    expect(Geo.code.value).toBe('ru-RU')

    Geo.set('en-RU')
    expect(Geo.code.value).toBe('en-RU')

    Geo.set('vi')
    expect(Geo.code.value).toBe('vi-VN')
  })

  it('firstDay', () => {
    Geo.set('US')
    expect(Geo.firstDay.value).toBe('Su')

    Geo.set('RU')
    expect(Geo.firstDay.value).toBe('Mo')
  })

  it('getData', () => {
    expect(Geo.getData('en-GB')?.country).toBe('GB')
    expect(Geo.getData('en-US')?.country).toBe('US')
    expect(Geo.getData('vi-VN')?.country).toBe('VN')
  })

  it('getDataByLanguage', () => {
    expect(Geo.getDataByLanguage('en')?.country).toBe('US')
    expect(Geo.getDataByLanguage('us')?.country).toBe('US')
    expect(Geo.getDataByLanguage('ru')?.country).toBe('RU')
    expect(Geo.getDataByLanguage('vi')?.country).toBe('VN')
  })

  it('getDataByCountry', () => {
    expect(Geo.getDataByCountry('GB')?.country).toBe('GB')
    expect(Geo.getDataByCountry('US')?.country).toBe('US')
    expect(Geo.getDataByCountry('RU')?.country).toBe('RU')
    expect(Geo.getDataByCountry('VN')?.country).toBe('VN')
  })

  it('getDataByCode', () => {
    expect(Geo.getDataByCode('en-GB')?.country).toBe('GB')
    expect(Geo.getDataByCode('en-US')?.country).toBe('US')

    expect(Geo.getDataByCode('US')?.country).toBe('US')
    expect(Geo.getDataByCode('RU')?.country).toBe('RU')
    expect(Geo.getDataByCode('VN')?.country).toBe('VN')

    expect(Geo.getDataByCode('us')?.country).toBe('US')
  })

  it('toLanguage', () => {
    expect(Geo.toLanguage('en-GB')).toBe('en')
    expect(Geo.toLanguage('en-US')).toBe('en')

    expect(Geo.toLanguage('us')).toBe('us')
    expect(Geo.toLanguage('US')).toBe('')
  })

  it('toCountry', () => {
    expect(Geo.toCountry('en-GB')).toBe('GB')
    expect(Geo.toCountry('en-US')).toBe('US')

    expect(Geo.toCountry('us')).toBe('')
    expect(Geo.toCountry('US')).toBe('US')
  })

  it('toCode', () => {
    expect(Geo.toCode(Geo.getData('en-GB'))).toBe('en-GB')
    expect(Geo.toCode(Geo.getData('en-US'))).toBe('en-US')
  })

  it('setLanguage', () => {
    Geo.set('US')

    Geo.setLanguage('en')
    expect(Geo.code.value).toBe('en-US')

    Geo.setLanguage('ru')
    expect(Geo.code.value).toBe('ru-US')

    Geo.setLanguage('vi')
    expect(Geo.code.value).toBe('vi-US')
  })

  it('setCountry', () => {
    Geo.set('US')

    Geo.setCountry('GB')
    expect(Geo.code.value).toBe('en-GB')

    Geo.setCountry('RU')
    expect(Geo.code.value).toBe('en-RU')

    Geo.setCountry('VN')
    expect(Geo.code.value).toBe('en-VN')
  })
})
