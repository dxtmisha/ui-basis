import { GeoIntlStatic } from '../../../classes/GeoIntlStatic'
import { Geo } from '../../../classes/Geo'

describe('classes/GeoIntlStatic', () => {
  const item = new GeoIntlStatic()

  it('displayStatic/countryNameStatic/languageStatic', () => {
    expect(item.displayStatic('RU', 'region')).toBe('Russia')
    expect(item.displayStatic('ru', 'language')).toBe('Russian')

    expect(item.countryNameStatic('RU')).toBe('Russia')
    expect(item.languageStatic('ru')).toBe('Russian')
  })

  it('numberStatic/numberDecimalStatic', () => {
    expect(item.numberStatic('123456789')).toBe('123,456,789')
    expect(item.numberStatic('1234567.89')).toBe('1,234,567.89')
    expect(item.numberDecimalStatic()).toBe('.')
  })

  it('currencyStatic', () => {
    Geo.set('RU')
    expect(item.currencyStatic('123456789', 'RUB')).toBe('123 456 789,00 ₽')

    Geo.set('VN')
    expect(item.currencyStatic('123456789', 'RUB')).toBe('123.456.789,00 RUB')
  })

  it('unitStatic', () => {
    Geo.set('RU')
    expect(item.unitStatic('123456789', 'centimeter')).toBe('123 456 789 см')

    Geo.set('VN')
    expect(item.unitStatic('123456789', 'centimeter')).toBe('123.456.789 cm')

    Geo.set('ru-VN')
    expect(item.unitStatic('123456789', 'centimeter')).toBe('123 456 789 см')
  })

  it('percentStatic/percentStaticBy100', () => {
    expect(item.percentStatic(0.05)).toBe('5%')
    expect(item.percentStatic(0.5)).toBe('50%')
    expect(item.percentStatic(1)).toBe('100%')

    expect(item.percentStaticBy100(5)).toBe('5%')
    expect(item.percentStaticBy100(50)).toBe('50%')
    expect(item.percentStaticBy100(100)).toBe('100%')
  })

  it('relativeStatic', () => {
    const today = new Date('2010-09-10T09:20:30')

    expect(item.relativeStatic('2010-09-10T09:20:20', undefined, today)).toBe('10 seconds ago')
    expect(item.relativeStatic('2010-09-10T09:10:30', undefined, today)).toBe('10 minutes ago')
    expect(item.relativeStatic('2010-09-10T06:20:30', undefined, today)).toBe('3 hours ago')
    expect(item.relativeStatic('2010-09-05T09:20:30', undefined, today)).toBe('5 days ago')
    expect(item.relativeStatic('2010-05-10T09:20:30', undefined, today)).toBe('4 months ago')
    expect(item.relativeStatic('2007-09-10T09:20:30', undefined, today)).toBe('3 years ago')
    expect(item.relativeStatic('2013-09-10T09:20:30', undefined, today)).toBe('in 3 years')
  })

  it('dateStatic', () => {
    const date = '2010-09-10T09:20:30'

    expect(item.dateStatic(date)).toBe('Sep 10, 2010')
    expect(item.dateStatic(date, 'datetime')).toBe('Sep 10, 2010, 09:20 AM')
    expect(item.dateStatic(date, 'month')).toBe('Sep 2010')
    expect(item.dateStatic(date, 'time')).toBe('09:20 AM')
    expect(item.dateStatic(date, 'second')).toBe('09:20:30 AM')

    expect(item.timeStatic(date)).toBe('09:20 AM')
  })

  it('monthStatic', () => {
    expect(item.monthStatic('2010-01-10')).toBe('January')
    expect(item.monthStatic('2010-09-10')).toBe('September')
  })

  it('monthsStatic', () => {
    expect(item.monthsStatic()?.[1].text).toBe('January')
    expect(item.monthsStatic()?.[9].text).toBe('September')
  })

  it('weekdayStatic', () => {
    expect(item.weekdayStatic('2010-01-10')).toBe('Sunday')
    expect(item.weekdayStatic('2010-09-10')).toBe('Friday')
  })

  it('weekdaysStatic', () => {
    expect(item.weekdaysStatic()?.[1].text).toBe('Saturday')
    expect(item.weekdaysStatic()?.[3].text).toBe('Monday')
  })
})
