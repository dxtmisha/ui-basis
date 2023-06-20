'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Hash = void 0
const StorageAbstract_1 = require('./StorageAbstract')
const HashCollect_1 = require('./HashCollect')
/**
 * Working with data stored in hash
 *
 * Работа с данными сохраненными в хеш
 */
class Hash extends StorageAbstract_1.StorageAbstract {
  /**
     * Constructor
     * @param key key name / названия ключа
     * @param defaultValue default values / значения по умолчанию
     */
  constructor (key, defaultValue) {
    if (objects.has(key)) {
      return objects.get(key)
    }
    super(key, HashCollect_1.HashCollect.get(key), defaultValue)
    objects.set(key, this)
  }
}
exports.Hash = Hash
const objects = new Map()
// # sourceMappingURL=Hash.js.map
