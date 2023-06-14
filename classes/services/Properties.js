const PropertiesCache = require('./PropertiesCache')
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
    this.items = new PropertiesItems(this.__init(designs))
  }

  getScss () {
    return new PropertiesScss(this.items).get()
  }

  __init (designs) {
    return PropertiesCache.get([], FILE_CACHE, () => {
      console.info('Properties: init')

      const read = new PropertiesRead(designs)
      const items = new PropertiesItems(read.get())

      const full = new PropertiesToFull(items)
      const rename = new PropertiesToRename(items)
      const sub = new PropertiesToSub(items)
      const variable = new PropertiesToVariable(items)

      full.toFullValueFix()
      variable.to()
      variable.toByLink()
      sub.toByLink()

      new PropertiesToLink(items).to()

      full.toFullValue()
      full.toFullValueByDesign()
      variable.toByVar()
      sub.to()

      rename.to()
      new PropertiesToMulti(items).to()

      rename.toByVar()
      new PropertiesToVar(items).to()

      return items.get()
    })
  }
}
