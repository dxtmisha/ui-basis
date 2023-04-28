import { maxListLength } from '../../../../functions/data'

describe('functions/data/maxListLength', () => {
  it('array', () => {
    expect(maxListLength(['one', 'two', 'tree'])).toEqual(4)
  })

  it('object', () => {
    expect(maxListLength({
      a: 'one',
      b: 'two',
      c: 'tree'
    })).toEqual(4)
  })
})
