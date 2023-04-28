import { getExp } from '../../../../functions/data'

describe('functions/data/getExp', () => {
  const pattern = '(test|:value)'

  it('string', () => {
    expect(getExp('hello', 'i', pattern)).toEqual(/(test|hello)/i)
    expect(getExp('hel[lo', 'i', pattern)).toEqual(/(test|hel\[lo)/i)
    expect(getExp('h.el[lo', 'i', pattern)).toEqual(/(test|h\.el\[lo)/i)
  })
})
