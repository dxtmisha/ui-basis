import { strFill } from '../../../../functions/data'

describe('functions/data/strFill', () => {
  it('string', () => {
    expect(strFill(1, 3)).toEqual('111')
    expect(strFill(1, 6)).toEqual('111111')
    expect(strFill('a', 3)).toEqual('aaa')
  })
})
