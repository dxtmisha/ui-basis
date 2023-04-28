import { isFunction } from '../../../../functions/data'

describe('functions/data/isFunction', () => {
  it('null/undefined', () => {
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction(null)).toBe(false)
  })

  it('number', () => {
    expect(isFunction(0)).toBe(false)
    expect(isFunction(123456789)).toBe(false)
  })

  it('string', () => {
    expect(isFunction('string')).toBe(false)
  })

  it('function', () => {
    expect(isFunction(() => null)).toBe(true)
    expect(isFunction(() => undefined)).toBe(true)
    expect(isFunction(() => 123)).toBe(true)
    expect(isFunction(() => 'string')).toBe(true)
  })
})
