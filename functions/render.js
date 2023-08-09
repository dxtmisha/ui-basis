'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.render = exports.getBind = exports.getIndex = exports.getClassName = void 0
const vue_1 = require('vue')
const ref_1 = require('./ref')
/**
 * Returns the name of the class from the property
 *
 * Возвращает название класса из свойства
 * @param props property of the component / свойство компонента
 * @private
 */
function getClassName (props) {
  return props && 'class' in props && typeof props.class === 'string' ? props.class : undefined
}
exports.getClassName = getClassName
/**
 * Returns or generates a new element
 *
 * Возвращает или генерирует новый элемент
 * @param name name of the component / названия компонента
 * @param props property of the component / свойство компонента
 * @param index the name of the key / названия ключа
 * @private
 */
function getIndex (name, props, index) {
  const className = getClassName(props)
  if (index && className) {
    return `${index}.${className}`
  } else if (index) {
    return index
  } else if (className) {
    return className
  } else {
    return name
  }
}
exports.getIndex = getIndex
/**
 * A method for generating properties for a subcomponent
 *
 * Метод для генерации свойств для под компонента
 * @param value input value. Can be an object if you need to pass multiple
 * properties / входное значение. Может быть объектом, если надо передать
 * несколько свойств
 * @param nameExtra additional parameter or property name / дополнительный параметр или имя свойства
 * @param name property name / имя свойства
 */
function getBind (value, nameExtra = {}, name = 'value') {
  return (0, vue_1.computed)(() => {
    const isName = typeof nameExtra === 'string'
    const index = isName ? nameExtra : name
    const extra = isName ? {} : (0, ref_1.getRef)(nameExtra)
    if (value) {
      if (value.value &&
                typeof value.value === 'object' &&
                index in value.value) {
        return {
          ...extra,
          ...value.value
        }
      } else {
        return {
          ...extra,
          [index]: value.value
        }
      }
    } else {
      return {}
    }
  })
}
exports.getBind = getBind
/**
 * Getting cached, immutable data
 *
 * Получение кешированных, неизменяемых данных
 * @param name name of the component / названия компонента
 * @param props property of the component / свойство компонента
 * @param children sub-elements of the component / под элементы компонента
 * @param index the name of the key / названия ключа
 */
function render (name, props, children, index) {
  const code = getIndex(name, props, index)
  return (0, vue_1.h)(name, { key: code, ...props }, children)
}
exports.render = render
// # sourceMappingURL=render.js.map
