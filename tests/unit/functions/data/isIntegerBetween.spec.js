'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const data_1 = require('../../../../functions/data')
describe('functions/data/isIntegerBetween', () => {
  const value = 5
  it('between', () => {
    expect((0, data_1.isIntegerBetween)(value, 5.0)).toBe(true)
    expect((0, data_1.isIntegerBetween)(value, 5.001)).toBe(true)
    expect((0, data_1.isIntegerBetween)(value, 5.1)).toBe(true)
    expect((0, data_1.isIntegerBetween)(value, 5.5)).toBe(true)
    expect((0, data_1.isIntegerBetween)(value, 5.9)).toBe(true)
    expect((0, data_1.isIntegerBetween)(value, 5.999)).toBe(true)
  })
  it('lesser', () => {
    expect((0, data_1.isIntegerBetween)(value, 1.0)).toBe(false)
    expect((0, data_1.isIntegerBetween)(value, 3.0)).toBe(false)
    expect((0, data_1.isIntegerBetween)(value, 4.9)).toBe(false)
    expect((0, data_1.isIntegerBetween)(value, 4.999)).toBe(false)
  })
  it('more', () => {
    expect((0, data_1.isIntegerBetween)(value, 6.0)).toBe(false)
    expect((0, data_1.isIntegerBetween)(value, 6.001)).toBe(false)
    expect((0, data_1.isIntegerBetween)(value, 6.1)).toBe(false)
    expect((0, data_1.isIntegerBetween)(value, 6.9)).toBe(false)
    expect((0, data_1.isIntegerBetween)(value, 8)).toBe(false)
    expect((0, data_1.isIntegerBetween)(value, 9)).toBe(false)
  })
})
// # sourceMappingURL=isIntegerBetween.spec.js.map
