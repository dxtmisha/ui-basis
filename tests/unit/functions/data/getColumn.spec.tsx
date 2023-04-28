import { getColumn } from '../../../../functions/data'

describe('functions/data/getColumn', () => {
  const data = [
    {
      a: 'a1',
      b: 'b1'
    },
    {
      a: 'a2',
      b: 'b2'
    },
    {
      a: 'a3',
      b: 'b3'
    }
  ]

  it('object', () => {
    expect(getColumn(data, 'a')).toEqual(['a1', 'a2', 'a3'])
    expect(getColumn(data, 'b')).toEqual(['b1', 'b2', 'b3'])
    expect(getColumn(data, 'c')).toEqual([undefined, undefined, undefined])
  })
})
