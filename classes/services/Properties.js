const PropertiesItems = require('./PropertiesItems')
const PropertiesRead = require('./PropertiesRead')

module.exports = class Properties {
  constructor (designs) {
    const read = new PropertiesRead(designs)

    this.items = new PropertiesItems(read.get())
    this.items.toFullValueFix()

    this.items.toFullValue()
    this.items.toFullValueByDesign()

    console.log('getDesigns', this.items.getDesigns())

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
