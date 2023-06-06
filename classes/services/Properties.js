const PropertiesStructure = require('./PropertiesStructure')

module.exports = class Properties {
  constructor (designs) {
    this.structure = new PropertiesStructure(designs)

    console.log('structure.get', this.structure.get())
  }

  getScss () {
    return ''
  }
}
