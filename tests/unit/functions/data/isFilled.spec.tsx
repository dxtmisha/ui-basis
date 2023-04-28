import { isFilled } from '../../../../functions/data'

describe('functions/data/isFilled', () => {
  it('bool', () => {
    expect(isFilled(true)).toBe(true)
    expect(isFilled(false)).toBe(false)
  })

  it('number', () => {
    expect(isFilled(0)).toBe(false)
    expect(isFilled(123)).toBe(true)
    expect(isFilled(123.456)).toBe(true)
  })

  it('string', () => {
    expect(isFilled('')).toBe(false)
    expect(isFilled('undefined')).toBe(false)
    expect(isFilled('string')).toBe(true)
  })

  it('array', () => {
    expect(isFilled([])).toBe(false)
    expect(isFilled([1, 2, 3])).toBe(true)
  })

  it('object', () => {
    expect(isFilled({})).toBe(false)
    expect(isFilled({
      a: 1,
      b: 2
    })).toBe(true)
  })

  it('function', () => {
    expect(isFilled(() => true)).toBe(true)
    expect(isFilled(() => false)).toBe(true)

    expect(isFilled(() => '')).toBe(true)
    expect(isFilled(() => 'string')).toBe(true)

    expect(isFilled(() => 0)).toBe(true)
    expect(isFilled(() => 123)).toBe(true)
  })

  it('symbol', () => {
    expect(isFilled(Symbol(undefined))).toBe(true)
    expect(isFilled(Symbol('string'))).toBe(true)
    expect(isFilled(Symbol(123))).toBe(true)
  })
})
