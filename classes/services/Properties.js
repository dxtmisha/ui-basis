const PropertiesRead = require('./PropertiesRead')

module.exports = class Properties {
  /**
   * @type {Object.<string, PropertiesItem>}
   */
  items = {}

  constructor (designs) {
    this.read = new PropertiesRead(designs)

    this.read.get()

    this.__init()
  }

  getScss () {
    return ''
  }

  __init () {
    // Close
  }

  __initItems () {
    // Close
  }
}
