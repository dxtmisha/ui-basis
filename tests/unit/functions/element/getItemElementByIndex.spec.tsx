import { getItemElementByIndex } from '../../../../functions/element'

describe('functions/element/getItemElementByIndex', () => {
  const element = document.createElement('div')

  it('undefined', () => {
    expect(getItemElementByIndex(element, 'index')).toBe(undefined)
    expect(getItemElementByIndex(element, 'index', 'default')).toBe('default')
  })

  it('tagName', () => {
    expect(getItemElementByIndex(element, 'tagName')).toBe(element.tagName)
    expect(getItemElementByIndex(element, 'tagName', 'default')).toBe(element.tagName)
  })
})
