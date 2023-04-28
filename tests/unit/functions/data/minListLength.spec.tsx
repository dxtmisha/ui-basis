import { minListLength } from '../../../../functions/data'

describe('functions/data/minListLength', () => {
  it('array', () => {
    expect(minListLength(['one', 'two', 'tree'])).toEqual(3)
  })

  it('object', () => {
    expect(minListLength({
      a: 'one',
      b: 'two',
      c: 'tree'
    })).toEqual(3)
  })
})
