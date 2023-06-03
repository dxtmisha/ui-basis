const PropertiesStructure = require('./PropertiesStructure')

module.exports = class Properties {
  constructor (designs) {
    this.structure = new PropertiesStructure(designs)

    console.log('structure.getFullPath', this.structure.getFullPath())
    console.log('structure.getMain', this.structure.getMain())
    console.log('structure.getComponentsName', this.structure.getComponentsInfo())
    console.log('structure.getComponentsProperties', this.structure.getComponentsProperties())
  }

  getScss () {
    return ''
  }
}
