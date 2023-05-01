import { getIdElement, ids } from '../../../../functions/element'

describe('functions/element/getIdElement', () => {
  const element = document.createElement('div')
  const isStart = ids

  it('undefined', () => {
    expect(getIdElement()).toBe(`${isStart}`)
    expect(getIdElement(undefined)).toBe(`${isStart + 1}`)
  })

  it('null', () => {
    expect(getIdElement(element)).toBe(`id-${isStart + 2}`)
    expect(element.id).toBe(`id-${isStart + 2}`)
  })

  it('id', () => {
    element.setAttribute('id', 'id')

    expect(getIdElement(element)).toBe('id')
    expect(element.id).toBe('id')
  })

  it('selector', () => {
    expect(getIdElement(element, ':hover')).toBe('#id:hover')
    expect(getIdElement(element, ' .selector')).toBe('#id .selector')
    expect(getIdElement(element, ':hover .selector')).toBe('#id:hover .selector')
  })
})
