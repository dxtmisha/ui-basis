const PropertiesItems = require('./PropertiesItems')
const PropertiesRead = require('./PropertiesRead')
const PropertiesVariable = require('./PropertiesVariable')

module.exports = class Properties {
  constructor (designs) {
    const read = new PropertiesRead(designs)

    this.items = new PropertiesItems(read.get())
    this.items.toFullValueFix()

    this.variable = new PropertiesVariable(this.items)
    this.variable.to()

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
