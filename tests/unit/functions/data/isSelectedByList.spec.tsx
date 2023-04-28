import { isSelectedByList } from '../../../../functions/data'

describe('functions/data/isSelectedByList', () => {
  const selected = [1, 2, 'string']

  it('number', () => {
    expect(isSelectedByList(1, selected)).toBe(true)
    expect(isSelectedByList([1, 2], selected)).toBe(true)
    expect(isSelectedByList([1, 3], selected)).toBe(false)
  })

  it('string', () => {
    expect(isSelectedByList('string', selected)).toBe(true)
    expect(isSelectedByList(['string', 2], selected)).toBe(true)
    expect(isSelectedByList(['string', 3], selected)).toBe(false)
  })
})
