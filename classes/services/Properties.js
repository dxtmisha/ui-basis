const PropertiesItems = require('./PropertiesItems')
const PropertiesRead = require('./PropertiesRead')

const PropertiesToFull = require('./PropertiesToFull')
const PropertiesToLink = require('./PropertiesToLink')
const PropertiesToMulti = require('./PropertiesToMulti')
const PropertiesToRename = require('./PropertiesToRename')
const PropertiesToSub = require('./PropertiesToSub')
const PropertiesToVar = require('./PropertiesToVar')
const PropertiesToVariable = require('./PropertiesToVariable')

const PropertiesScss = require('./PropertiesScss')

const FILE_CACHE = 'properties'

module.exports = class Properties {
  constructor (designs) {
    const read = new PropertiesRead(designs)
    const items = new PropertiesItems(read.get())

    const full = new PropertiesToFull(items)
    const rename = new PropertiesToRename(items)
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

    rename.to()
    new PropertiesToMulti(items).to()

    rename.toByVar()
    new PropertiesToVar(items).to()

    this.items = items
    this.items.cache(FILE_CACHE)
  }

  getScss () {
    return new PropertiesScss(this.items).get()
  }

  __init () {
    // Close
  }

  __initItems () {
    // Close
  }
}
