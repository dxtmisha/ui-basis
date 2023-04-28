import { isIntegerBetween } from '../../../../functions/data'

describe('functions/data/isIntegerBetween', () => {
  const value = 5

  it('between', () => {
    expect(isIntegerBetween(value, 5.0)).toBe(true)
    expect(isIntegerBetween(value, 5.001)).toBe(true)
    expect(isIntegerBetween(value, 5.1)).toBe(true)
    expect(isIntegerBetween(value, 5.5)).toBe(true)
    expect(isIntegerBetween(value, 5.9)).toBe(true)
    expect(isIntegerBetween(value, 5.999)).toBe(true)
  })

  it('lesser', () => {
    expect(isIntegerBetween(value, 1.0)).toBe(false)
    expect(isIntegerBetween(value, 3.0)).toBe(false)
    expect(isIntegerBetween(value, 4.9)).toBe(false)
    expect(isIntegerBetween(value, 4.999)).toBe(false)
  })

  it('more', () => {
    expect(isIntegerBetween(value, 6.0)).toBe(false)
    expect(isIntegerBetween(value, 6.001)).toBe(false)
    expect(isIntegerBetween(value, 6.1)).toBe(false)
    expect(isIntegerBetween(value, 6.9)).toBe(false)
    expect(isIntegerBetween(value, 8)).toBe(false)
    expect(isIntegerBetween(value, 9)).toBe(false)
  })
})
