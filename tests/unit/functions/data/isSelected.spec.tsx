import { isSelected } from '../../../../functions/data'

describe('functions/data/isSelected', () => {
  it('null/undefined', () => {
    expect(isSelected(null, 'string')).toBe(false)
    expect(isSelected(null, null)).toBe(false)
    expect(isSelected(null, [null])).toBe(false)

    expect(isSelected(undefined, 'string')).toBe(false)
    expect(isSelected(undefined, undefined)).toBe(false)
    expect(isSelected(undefined, [undefined])).toBe(false)
  })

  it('number', () => {
    const value = 2

    expect(isSelected(value, 1)).toBe(false)
    expect(isSelected(value, 2)).toBe(true)
  })

  it('string', () => {
    const value = 'string2'

    expect(isSelected(value, 'string1')).toBe(false)
    expect(isSelected(value, 'string2')).toBe(true)
  })

  it('array', () => {
    const number = 2
    const string = 'string2'

    expect(isSelected(number, [1, 3, 4])).toBe(false)
    expect(isSelected(number, [1, 2, 3])).toBe(true)

    expect(isSelected(string, ['string1', 'string3', 'string4'])).toBe(false)
    expect(isSelected(string, ['string1', 'string2', 'string3'])).toBe(true)
  })
})
