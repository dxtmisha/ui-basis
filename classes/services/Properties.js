const PropertiesItems = require('./PropertiesItems')
const PropertiesRead = require('./PropertiesRead')

const PropertiesToFull = require('./PropertiesToFull')
const PropertiesToLink = require('./PropertiesToLink')
const PropertiesToMulti = require('./PropertiesToMulti')
const PropertiesToRename = require('./PropertiesToRename')
const PropertiesToSub = require('./PropertiesToSub')
const PropertiesToVar = require('./PropertiesToVar')
const PropertiesToVariable = require('./PropertiesToVariable')

module.exports = class Properties {
  constructor (designs) {
    const read = new PropertiesRead(designs)
    const items = new PropertiesItems(read.get())

    const full = new PropertiesToFull(items)
    const sub = new PropertiesToSub(items)
    const variable = new PropertiesToVariable(items)

    full.toFullValueFix()
    variable.to()
    sub.toByLink()

    new PropertiesToLink(items).to()

    sub.to()
    variable.toByVar()
    full.toFullValue()
    full.toFullValueByDesign()

    new PropertiesToRename(items).to()
    new PropertiesToMulti(items).to()
    new PropertiesToVar(items).to()

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
