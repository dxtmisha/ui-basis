'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.frame = exports.createElement = exports.setItemElementByIndex = exports.getItemElementByIndex = exports.getIdElement = exports.ids = exports.getAttributes = exports.getElement = void 0
const data_1 = require('./data')
/**
 * Returns the first Element in the document that matches the specified selector or the element
 *
 * Возвращает первый Element документа, который соответствует указанному селектору или саму element
 * @param element selectors for matching or an Element / селекторов для сопоставления или Element
 */
function getElement (element) {
  return typeof element === 'string' ? (document.querySelector(element) || undefined) : element
}
exports.getElement = getElement
/**
 * Получает список атрибуты у элемента
 * @param element
 */
function getAttributes (element) {
  const attributes = {}
  for (const attribute of element.attributes) {
    attributes[attribute.name] = attribute?.value || attribute?.textContent
  }
  return attributes
}
exports.getAttributes = getAttributes
/**
 * Counter generator of ID number of element
 *
 * Счетчик генератор номера ID элемента
 */
exports.ids = (0, data_1.random)(100000, 900000)
/**
 * Returns the identifier (ID) of the element or creates it if the element has no ID
 *
 * Возвращает идентификатор (ID) элемента или создает его, если у элемента нет ID
 * @param element element from which you obtain an ID / элемент, с которого получаете ID
 * @param selector selectors for matching / селекторов для сопоставления
 */
function getIdElement (element, selector) {
  if (element) {
    if (!(0, data_1.isFilled)(element.id)) {
      element.setAttribute('id', `id-${exports.ids++}`)
    }
    return selector ? `#${element.id}${selector}`.trim() : element.id
  } else {
    return (exports.ids++).toString()
  }
}
exports.getIdElement = getIdElement
/**
 * Returns the value of an element by its key
 *
 * Возвращает значение элемента по его ключу
 * @param element checked element / проверяемый элемент
 * @param index index at which we retrieve values / индекс, по которому получаем значения
 * @param defaultValue returns this parameter if the value is missing / возвращает этот параметр,
 * если значение отсутствует
 */
function getItemElementByIndex (element, index, defaultValue) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return element?.[index] || defaultValue
}
exports.getItemElementByIndex = getItemElementByIndex
/**
 * Modifies the value of an element identified by its key
 *
 * Изменяет значение элемента, определенного ключом
 * @param element checked element / проверяемый элемент
 * @param index index at which we retrieve values / индекс, по которому получаем значения
 * @param value new value / новое значение
 */
function setItemElementByIndex (element, index, value) {
  const data = getItemElementByIndex(element, index)
  if (data &&
        typeof data === 'object' &&
        typeof value === 'object') {
    (0, data_1.forEach)(value, (item, key) => {
      data[key] = (0, data_1.executeFunction)(item)
    })
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element[index] = (0, data_1.executeFunction)(value)
  }
}
exports.setItemElementByIndex = setItemElementByIndex
/**
 * In an HTML document
 *
 * В HTML-документах создаёт элемент c тем тегом, что указан в аргументе
 * @param parentElement the DOM node's parent Element / родитель для нового элемента
 * @param tagName A string that specifies the type of element to be created / строка,
 * указывающая элемент какого типа должен быть создан
 * @param options an object with attributes or a function for processing an element / объект
 * с атрибутами или функция для обработки элемента
 * @param referenceElement the node before which newNode is inserted / элемент, перед
 * которым будет вставлен newElement
 */
function createElement (parentElement, tagName = 'div', options, referenceElement) {
  const element = document.createElement(tagName)
  if (typeof options === 'function') {
    options(element)
  } else if (typeof options === 'object') {
    (0, data_1.forEach)(options, (value, key) => {
      setItemElementByIndex(element, key, value)
    })
  }
  parentElement?.insertBefore(element, referenceElement || null)
  return element
}
exports.createElement = createElement
/**
 * Cyclically calls requestAnimationFrame until next returns true
 * The window.requestAnimationFrame() method tells the browser that you wish to perform
 * an animation and requests that the browser calls a specified function to update an
 * animation right before the next repaint
 *
 * Циклически вызывает requestAnimationFrame, пока next возвращает true
 * window.requestAnimationFrame указывает браузеру на то, что вы хотите произвести
 * анимацию, и просит его запланировать перерисовку на следующем кадре анимации
 * @param callback the function to call when it's time to update your animation for
 * the next repaint / функция, которая будет вызвана, когда придёт время обновить
 * вашу анимацию на следующей перерисовке
 * @param next function that determines repetition / функция, которая определяет повторность
 * @param end function that is executed if the animation stops / функция, которая
 * выполняется, если останавливается анимация
 */
function frame (callback, next = () => false, end) {
  requestAnimationFrame(() => {
    callback()
    if (next()) {
      frame(callback, next, end)
    } else if (end) {
      end()
    }
  })
}
exports.frame = frame
// # sourceMappingURL=element.js.map
