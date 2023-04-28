import { forEach } from '../../../../functions/data'

describe('functions/data/forEach', () => {
  const callback = jest.fn(value => value)

  it('object', () => {
    const data = {
      a: 1,
      b: 2,
      c: 3
    }
    const result = forEach(data, callback)

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith(1, 'a', data)
    expect(callback).toHaveBeenCalledWith(2, 'b', data)
    expect(callback).toHaveBeenCalledWith(3, 'c', data)

    expect(result).toEqual([1, 2, 3])
  })

  it('array', () => {
    expect(forEach([1, 2, 3], callback)).toEqual([1, 2, 3])
  })

  it('filterUndefined', () => {
    expect(forEach([1, 2, undefined], callback)).toEqual([1, 2, undefined])
    expect(forEach([1, 2, undefined], callback, true)).toEqual([1, 2])
    expect(forEach([1, undefined, 3], callback, true)).toEqual([1, 3])

    expect(forEach({
      a: 1,
      b: undefined,
      c: 3
    }, callback, true)).toEqual([1, 3])
  })
})
