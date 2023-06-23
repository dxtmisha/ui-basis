'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DesignProperties = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
class DesignProperties {
  item = (0, vue_1.ref)([])
  get () {
    return this.item.value
  }

  getItem () {
    return this.item
  }

  getByName (name) {
    return this.item.value.find(item => item.name === name)
  }

  set (properties) {
    if (Array.isArray(properties)) {
      this.item.value = properties
    }
    return this
  }

  isValue (name, value) {
    const item = this.getByName(name)
    return !!(item &&
            (0, data_1.isFilled)(value) &&
            item?.value?.indexOf(value) !== -1)
  }

  isStyle (name, value) {
    const item = this.getByName(name)
    return !!(item &&
            (0, data_1.isFilled)(value) &&
            item?.style &&
            item?.value?.indexOf(true) !== -1)
  }

  isBool (name) {
    return this.isValue(name, true)
  }
}
exports.DesignProperties = DesignProperties
// # sourceMappingURL=DesignProperties.js.map
