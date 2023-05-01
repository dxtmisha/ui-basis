import { setItemElementByIndex } from '../../../../functions/element'
import { AssociativeType } from '../../../../constructors/types'

describe('functions/element/setItemElementByIndex', () => {
  const element = document.createElement('div') as HTMLDivElement & AssociativeType

  it('new', () => {
    setItemElementByIndex(element, 'new1', 'value1')
    setItemElementByIndex(element, 'new2', 'value2')
    expect(element?.new1).toBe('value1')
    expect(element?.new2).toBe('value2')
  })

  it('class', () => {
    setItemElementByIndex(element, 'class', 'class')
    expect(element.class).toBe('class')
  })

  it('style', () => {
    setItemElementByIndex(element, 'style', { top: '16px' })
    expect(element.style.top).toBe('16px')
  })
})
