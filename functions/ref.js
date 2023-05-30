'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getElementRef = exports.getRef = void 0
const vue_1 = require('vue')
const element_1 = require('./element')
/**
 * You return the values of the ref variable or the variable itself if it is not reactive
 *
 * Возвращаешь значения ref переменной или саму переменную, если она не реактивная
 * @param item reactive variable or ordinary value / реактивная переменная или обычное значение
 */
function getRef (item) {
  return (0, vue_1.isRef)(item) ? item.value : item
}
exports.getRef = getRef
/**
 * Returns the first element within the document that matches the specified selector, or the element
 * itself if it is already an element
 *
 * Возвращает первый элемент документа, который соответствует указанному селектору или сам
 * элемент, если он уже является элементом
 * @param element selectors for matching or an Element / селекторов для сопоставления или Element
 */
function getElementRef (element) {
  return (0, element_1.getElement)(getRef(element))
}
exports.getElementRef = getElementRef
// # sourceMappingURL=ref.js.map
