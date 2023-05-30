'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const data_1 = require('../../../../functions/data')
describe('functions/data/isFunction', () => {
  it('null/undefined', () => {
    expect((0, data_1.isFunction)(undefined)).toBe(false)
    expect((0, data_1.isFunction)(null)).toBe(false)
  })
  it('number', () => {
    expect((0, data_1.isFunction)(0)).toBe(false)
    expect((0, data_1.isFunction)(123456789)).toBe(false)
  })
  it('string', () => {
    expect((0, data_1.isFunction)('string')).toBe(false)
  })
  it('function', () => {
    expect((0, data_1.isFunction)(() => null)).toBe(true)
    expect((0, data_1.isFunction)(() => undefined)).toBe(true)
    expect((0, data_1.isFunction)(() => 123)).toBe(true)
    expect((0, data_1.isFunction)(() => 'string')).toBe(true)
  })
})
// # sourceMappingURL=isFunction.spec.js.map
