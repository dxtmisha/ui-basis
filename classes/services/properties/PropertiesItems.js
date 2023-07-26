module.exports = class PropertiesItems {
  /**
   * Constructor
   * @param {Object<string,*>} properties array with all property records / массив со всеми записями свойств
   */
  constructor (properties) {
    this.properties = properties
    this.designs = Object.keys(properties)
  }
}
