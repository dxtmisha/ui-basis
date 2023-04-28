import { replaceRecursive } from '../../../../functions/data'

describe('functions/data/replaceRecursive', () => {
  it('array', () => {
    const replacement = [1, 2, 3]

    expect(replaceRecursive({}, replacement)).toEqual({
      0: 1,
      1: 2,
      2: 3
    })

    expect(replaceRecursive({
      a: 1,
      b: 2
    }, replacement)).toEqual({
      a: 1,
      b: 2,
      0: 1,
      1: 2,
      2: 3
    })

    expect(replaceRecursive({
      a: 1,
      b: [2, 3, 4]
    }, {
      b: [5, 6, 7]
    })).toEqual({
      a: 1,
      b: [2, 3, 4, 5, 6, 7]
    })

    expect(replaceRecursive({
      a: 1,
      b: [2, 3, 4]
    }, {
      b: [5, 6, 7]
    }, false)).toEqual({
      a: 1,
      b: {
        0: 5,
        1: 6,
        2: 7
      }
    })
  })

  it('object', () => {
    const replacement = {
      a: 1,
      b: 2,
      c: 3
    }

    expect(replaceRecursive({}, replacement)).toEqual(replacement)

    expect(replaceRecursive({
      a: 1,
      b: 2
    }, replacement)).toEqual(replacement)

    expect(replaceRecursive({
      a: { f: { g: 1 } },
      b: replacement
    }, {
      a: {
        f: { g: 2 },
        i: 3
      },
      b: {
        c: 4,
        d: 5,
        e: 6
      }
    })).toEqual({
      a: {
        f: { g: 2 },
        i: 3
      },
      b: {
        a: 1,
        b: 2,
        c: 4,
        d: 5,
        e: 6
      }
    })
  })
})
