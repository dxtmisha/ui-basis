const PropertiesStructure = require('./PropertiesStructure')

module.exports = class Properties {
  constructor (designs) {
    this.structure = new PropertiesStructure(designs)

    console.log('structure.getComponentsProperties', this.structure.getComponentsProperties())
    console.log('structure.getMainAll', this.structure.getMainAll())
  }

  getScss () {
    return ''
  }
}
