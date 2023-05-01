import { createElement } from '../../../../functions/element'

describe('functions/element/createElement', () => {
  let root: HTMLElement

  beforeEach(() => {
    root = document.createElement('div')
    document.body.appendChild(root)
  })

  afterEach(() => {
    document.body.removeChild(root)
  })

  it('default', () => {
    const element = createElement(root)
    expect(element.tagName).toBe('DIV')
    expect(root.firstChild).toBe(element)
  })

  it('span', () => {
    const element = createElement(root, 'span')
    expect(element.tagName).toBe('SPAN')
    expect(root.firstChild).toBe(element)
  })

  it('options', () => {
    const options = {
      className: 'class',
      innerText: 'text',
      style: { fontSize: '16px' }
    }
    const element = createElement(root, 'button', options)

    expect(element.className).toBe('class')
    expect(element.innerText).toBe('text')
    expect(element.style.fontSize).toBe('16px')
    expect(root.firstChild).toBe(element)
  })
})
