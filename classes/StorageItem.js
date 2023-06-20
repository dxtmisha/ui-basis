'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.StorageItem = void 0
const StorageItemAbstract_1 = require('./StorageItemAbstract')
/**
 * Class for working with localStorage
 *
 * Класс для работы с localStorage
 */
class StorageItem extends StorageItemAbstract_1.StorageItemAbstract {
  constructor (key, defaultValue) {
    super('local', key, defaultValue, window?.localStorage)
  }
}
exports.StorageItem = StorageItem
// # sourceMappingURL=StorageItem.js.map
