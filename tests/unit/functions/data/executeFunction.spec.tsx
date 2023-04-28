import { executeFunction } from '../../../../functions/data'

describe('functions/data/executeFunction', () => {
  const data = 'string'

  it('null/undefined', () => {
    expect(executeFunction(null)).toEqual(null)
    expect(executeFunction(undefined)).toEqual(undefined)
  })

  it('data', () => {
    expect(executeFunction(data)).toEqual(data)
    expect(executeFunction(12345)).toEqual(12345)
  })

  it('function', () => {
    expect(executeFunction(() => data)).toEqual(data)
  })
})
