'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.SessionItem = void 0
const StorageItemAbstract_1 = require('./StorageItemAbstract')
/**
 * Class for working with sessionStorage
 *
 * Класс для работы с sessionStorage
 */
class SessionItem extends StorageItemAbstract_1.StorageItemAbstract {
  constructor (key, defaultValue) {
    super('session', key, defaultValue, window?.sessionStorage)
  }
}
exports.SessionItem = SessionItem
// # sourceMappingURL=SessionItem.js.map
