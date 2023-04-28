import { isNull } from '../../../../functions/data'

describe('functions/data/isNull', () => {
  it('null/undefined', () => {
    expect(isNull(null)).toBe(true)
    expect(isNull(undefined)).toBe(true)
  })

  it('number', () => {
    expect(isNull(12345678)).toBe(false)
  })

  it('string', () => {
    expect(isNull('string')).toBe(false)
  })
})
