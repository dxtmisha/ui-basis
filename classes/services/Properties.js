const PropertiesStructure = require('./PropertiesStructure')

module.exports = class Properties {
  constructor (designs) {
    this.structure = new PropertiesStructure(designs)

    console.log('structure.getFullPath', this.structure.getFullPath())
    console.log('structure.getComponentsName', this.structure.getComponentsName())
  }

  getScss () {
    return ''
  }
}
