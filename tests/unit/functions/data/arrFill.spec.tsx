import { arrFill } from '../../../../functions/data'

describe('functions/data/arrFill', () => {
  it('array', () => {
    expect(arrFill(1, 3)).toEqual([1, 1, 1])
    expect(arrFill('string', 3)).toEqual(['string', 'string', 'string'])
  })
})
