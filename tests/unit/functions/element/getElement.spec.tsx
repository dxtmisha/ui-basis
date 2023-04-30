import { getElement } from '../../../../functions/element'

describe('functions/element/getElement', () => {
  const element = document.createElement('div')

  it('undefined', () => {
    expect(getElement()).toBeUndefined()
    expect(getElement(undefined)).toBeUndefined()
  })

  it('string', () => {
    jest.spyOn(document, 'querySelector').mockReturnValue(element)
    expect(getElement('#test')).toBe(element)

    jest.spyOn(document, 'querySelector').mockReturnValue(null)
    expect(getElement('#none')).toBeUndefined()
  })

  it('element', () => {
    expect(getElement(element)).toBe(element)
  })
})
