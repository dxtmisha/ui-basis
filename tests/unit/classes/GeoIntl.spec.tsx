import { GeoIntl } from '../../../classes/GeoIntl'
import { Geo } from '../../../classes/Geo'

describe('classes/GeoIntl', () => {
  const item = new GeoIntl()

  it('display/countryName/language', () => {
    expect(item.display('RU', 'region').value).toBe('Russia')
    expect(item.display('ru', 'language').value).toBe('Russian')

    expect(item.countryName('RU').value).toBe('Russia')
    expect(item.language('ru').value).toBe('Russian')
  })

  it('number/numberDecimal', () => {
    expect(item.number('123456789').value).toBe('123,456,789')
    expect(item.number('1234567.89').value).toBe('1,234,567.89')
    expect(item.numberDecimal().value).toBe('.')
  })

  it('currency', () => {
    Geo.set('RU')
    expect(item.currency('123456789', 'RUB').value).toBe('123 456 789,00 ₽')

    Geo.set('VN')
    expect(item.currency('123456789', 'RUB').value).toBe('123.456.789,00 RUB')
  })

  it('unit', () => {
    Geo.set('RU')
    expect(item.unit('123456789', 'centimeter').value).toBe('123 456 789 см')

    Geo.set('VN')
    expect(item.unit('123456789', 'centimeter').value).toBe('123.456.789 cm')

    Geo.set('ru-VN')
    expect(item.unit('123456789', 'centimeter').value).toBe('123 456 789 см')
  })

  it('percent/percentBy100', () => {
    Geo.set('GB')

    expect(item.percent(0.05).value).toBe('5%')
    expect(item.percent(0.5).value).toBe('50%')
    expect(item.percent(1).value).toBe('100%')

    expect(item.percentBy100(5).value).toBe('5%')
    expect(item.percentBy100(50).value).toBe('50%')
    expect(item.percentBy100(100).value).toBe('100%')
  })

  it('relative', () => {
    const today = new Date('2010-09-10T09:20:30')

    expect(item.relative('2010-09-10T09:20:20', today).value).toBe('10 seconds ago')
    expect(item.relative('2010-09-10T09:10:30', today).value).toBe('10 minutes ago')
    expect(item.relative('2010-09-10T06:20:30', today).value).toBe('3 hours ago')
    expect(item.relative('2010-09-05T09:20:30', today).value).toBe('5 days ago')
    expect(item.relative('2010-05-10T09:20:30', today).value).toBe('4 months ago')
    expect(item.relative('2007-09-10T09:20:30', today).value).toBe('3 years ago')
    expect(item.relative('2013-09-10T09:20:30', today).value).toBe('in 3 years')
  })

  it('date', () => {
    const date = '2010-09-10T09:20:30'

    expect(item.date(date).value).toBe('Sep 10, 2010')
    expect(item.date(date, 'datetime').value).toBe('Sep 10, 2010, 09:20 AM')
    expect(item.date(date, 'month').value).toBe('Sep 2010')
    expect(item.date(date, 'time').value).toBe('09:20 AM')
    expect(item.date(date, 'second').value).toBe('09:20:30 AM')

    expect(item.time(date).value).toBe('09:20 AM')
  })

  it('month', () => {
    expect(item.month('2010-01-10').value).toBe('January')
    expect(item.month('2010-09-10').value).toBe('September')
  })

  it('months', () => {
    expect(item.months().value?.[1].text).toBe('January')
    expect(item.months().value?.[9].text).toBe('September')
  })

  it('weekday', () => {
    expect(item.weekday('2010-01-10').value).toBe('Sunday')
    expect(item.weekday('2010-09-10').value).toBe('Friday')
  })

  it('weekdays', () => {
    expect(item.weekdays().value?.[1].text).toBe('Saturday')
    expect(item.weekdays().value?.[3].text).toBe('Monday')
  })
})
