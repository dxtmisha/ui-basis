import { To } from '../../../classes/To'

describe('classes/To', () => {
  it('array', () => {
    expect(To.array([1, 2, 3])).toEqual([1, 2, 3])

    expect(To.array(1)).toEqual([1])
    expect(To.array(2)).toEqual([2])
    expect(To.array(3)).toEqual([3])
  })

  it('date', () => {
    const year = 2010
    const month = 5
    const day = 3
    const hour = 12
    const minute = 30
    const second = 10

    const date = new Date(`${year}-0${month + 1}-0${day}T${hour}:${minute}:${second}+07:00`)

    const stringDateTime = `${year}-0${month + 1}-0${day}T${hour}:${minute}:${second}`
    const stringDateMinutes = `${year}-0${month + 1}-0${day}T${hour}:${minute}`
    const stringDate = `${year}-0${month + 1}-0${day}`
    const stringMonth = `${year}-0${month + 1}`
    const stringYear = `${year}`
    const stringMinute = `${hour}:${minute}`
    const stringSecond = `${hour}:${minute}:${second}`

    expect(date).toBe(date)

    expect(To.date(stringDateTime).getFullYear()).toBe(year)
    expect(To.date(stringDateTime).getMonth()).toBe(month)
    expect(To.date(stringDateTime).getDate()).toBe(day)
    expect(To.date(stringDateTime).getHours()).toBe(hour)
    expect(To.date(stringDateTime).getMinutes()).toBe(minute)
    expect(To.date(stringDateTime).getSeconds()).toBe(second)

    expect(To.date(stringDateMinutes).getFullYear()).toBe(year)
    expect(To.date(stringDateMinutes).getMonth()).toBe(month)
    expect(To.date(stringDateMinutes).getDate()).toBe(day)
    expect(To.date(stringDateMinutes).getHours()).toBe(hour)
    expect(To.date(stringDateMinutes).getMinutes()).toBe(minute)
    expect(To.date(stringDateMinutes).getSeconds()).toBe(0)

    expect(To.date(stringDate).getFullYear()).toBe(year)
    expect(To.date(stringDate).getMonth()).toBe(month)
    expect(To.date(stringDate).getDate()).toBe(day)
    expect(To.date(stringDate).getHours()).toBe(0)
    expect(To.date(stringDate).getMinutes()).toBe(0)
    expect(To.date(stringDate).getSeconds()).toBe(0)

    expect(To.date(stringMonth).getFullYear()).toBe(year)
    expect(To.date(stringMonth).getMonth()).toBe(month)
    expect(To.date(stringMonth).getDate()).toBe(1)
    expect(To.date(stringMonth).getHours()).toBe(0)
    expect(To.date(stringMonth).getMinutes()).toBe(0)
    expect(To.date(stringMonth).getSeconds()).toBe(0)

    expect(To.date(stringYear).getFullYear()).toBe(year)
    expect(To.date(stringYear).getMonth()).toBe(0)
    expect(To.date(stringYear).getDate()).toBe(1)
    expect(To.date(stringYear).getHours()).toBe(0)
    expect(To.date(stringYear).getMinutes()).toBe(0)
    expect(To.date(stringYear).getSeconds()).toBe(0)

    expect(To.date(stringMinute).getFullYear()).toBe(2000)
    expect(To.date(stringMinute).getMonth()).toBe(0)
    expect(To.date(stringMinute).getDate()).toBe(1)
    expect(To.date(stringMinute).getHours()).toBe(12)
    expect(To.date(stringMinute).getMinutes()).toBe(30)
    expect(To.date(stringMinute).getSeconds()).toBe(0)

    expect(To.date(stringSecond).getFullYear()).toBe(2000)
    expect(To.date(stringSecond).getMonth()).toBe(0)
    expect(To.date(stringSecond).getDate()).toBe(1)
    expect(To.date(stringSecond).getHours()).toBe(12)
    expect(To.date(stringSecond).getMinutes()).toBe(30)
    expect(To.date(stringSecond).getSeconds()).toBe(10)
  })

  it('number', () => {
    expect(To.number('123456789')).toBe(123456789)

    expect(To.number('1234567.89')).toBe(1234567.89)
    expect(To.number('1234567,89')).toBe(1234567.89)

    expect(To.number('1 234 567.89')).toBe(1234567.89)
    expect(To.number('1,234,567.89')).toBe(1234567.89)
    expect(To.number('1 234 567,89')).toBe(1234567.89)
    expect(To.number('1.234.567,89')).toBe(1234567.89)

    expect(To.number('56.789')).toBe(56.789)
    expect(To.number('56,789')).toBe(56.789)
  })

  it('camelCase', () => {
    expect(To.camelCase('camelCase')).toBe('camelCase')
    expect(To.camelCase('camel-case')).toBe('camelCase')
    expect(To.camelCase('Camel-Case')).toBe('camelCase')

    expect(To.camelCase('camelCaseCase')).toBe('camelCaseCase')
    expect(To.camelCase('camel-case-case')).toBe('camelCaseCase')
    expect(To.camelCase('Camel-Case-Case')).toBe('camelCaseCase')
  })

  it('kebabCase', () => {
    expect(To.kebabCase('kebabCase')).toBe('kebab-case')
    expect(To.kebabCase('KebabCase')).toBe('kebab-case')
    expect(To.kebabCase('kebab-case')).toBe('kebab-case')
    expect(To.kebabCase('Kebab-Case')).toBe('kebab-case')

    expect(To.kebabCase('kebabCaseCase')).toBe('kebab-case-case')
    expect(To.kebabCase('KebabCaseCase')).toBe('kebab-case-case')
    expect(To.kebabCase('kebab-case-case')).toBe('kebab-case-case')
    expect(To.kebabCase('Kebab-Case-Case')).toBe('kebab-case-case')
  })

  it('replaceTemplate', () => {
    expect(To.replaceTemplate('is [template]!', { template: 'text' })).toBe('is text!')
    expect(To.replaceTemplate('is [template]/[template], [t1] and [t2]!', {
      template: 'text',
      t1: 'text1',
      t2: 'text2'
    })).toBe('is text/text, text1 and text2!')
  })
})
