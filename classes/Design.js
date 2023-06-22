'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Design = void 0
class Design {
  props
  context
  name
  properties
  // eslint-disable-next-line no-useless-constructor
  constructor (props, context) {
    this.props = props
    this.context = context
  }

  setName (name) {
    this.name = name
    return this
  }

  setProperties (properties) {
    this.properties = properties
    return this
  }

  setup (dataCallback) {
    // TODO: Close
    console.log('dataCallback', dataCallback)
    return {
      classes: {
        main: 'is-classes-name'
      }
    }
  }
}
exports.Design = Design
// # sourceMappingURL=Design.js.map
