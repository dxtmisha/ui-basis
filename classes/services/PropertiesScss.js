const { forEach } = require('../../functions/data')

const PropertiesTool = require('./PropertiesTool')

const FILE_CACHE_SCSS = 'properties-style'

/**
 * Class for working with SCSS
 *
 * Класс для работы с SCSS
 */
module.exports = class PropertiesScss {
  /**
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Returns a formatted string for SCSS
   *
   * Возвращает отформатированную строку для SCSS
   * @return {string}
   */
  get () {
    return this.items.getCache(
      FILE_CACHE_SCSS,
      () => {
        let data = ''

        console.info('PropertiesScss: init')

        data += `${this.getRoot()}\r\n`
        data += `${this.getMedia()}\r\n`
        data += `${this.getDesigns()}\r\n`
        data += `${this.getClasses()}\r\n`
        data += `${this.getProperties()}\r\n`

        return data
      },
      'scss'
    )
  }

  /**
   * Returns a list of properties
   *
   * Возвращает список свойств
   * @return {string}
   */
  getRoot () {
    return `$designsRoot: (${this.__getByCategory('root')});`
  }

  /**
   * Returns a list of properties
   *
   * Возвращает список свойств
   * @return {string}
   */
  getDesigns () {
    const designs = forEach(this.items.getDesigns(), design => `\r\n  '${design}',`)
    return `$designsDesigns: (${designs.join('')});`
  }

  /**
   * Returns a list of properties
   *
   * Возвращает список свойств
   * @return {string}
   */
  getClasses () {
    return `$designsClasses: (${this.__getByCategory('class')});`
  }

  /**
   * Returns a list of properties
   *
   * Возвращает список свойств
   * @return {string}
   */
  getMedia () {
    return `$designsMedia: (${this.__toMedia()});`
  }

  /**
   * Returns a list of properties
   *
   * Возвращает список свойств
   * @return {string}
   */
  getProperties () {
    return `$designsProperties: (${this.__toGo(this.items.get())});`
  }

  /**
   * Returns the property index to form the path of the class name
   *
   * Возвращает индекс свойства для формирования пути имени класса
   * @param {string} name Name of the property / Название свойства
   * @return {string}
   * @private
   */
  __getIndex (name) {
    return `index: '${name}',`
  }

  /**
   * Returns the name of the property
   *
   * Возвращает название свойства
   * @param {Object<string,*>} property property value / значение свойства
   * @param {string} name Name of the property / Название свойства
   * @return {string}
   * @private
   */
  __getName (property, name) {
    const keyName = PropertiesTool.getKeyName()

    return `name: '${property?.[keyName] || name}',`
  }

  /**
   * Returns the type of property
   *
   * Возвращает тип свойства
   * @param {Object<string,*>} property property value / значение свойства
   * @return {string}
   * @private
   */
  __getType (property) {
    return `type: '${property?.[PropertiesTool.getKeyVariable()]}',`
  }

  /**
   * Returns a list of all records with the selected type
   *
   * Возвращает список всех записей с выбранным типом
   * @param {string} category Category names / Названия категорий
   * @return {string}
   * @private
   */
  __getByCategory (category) {
    const data = []

    this.items.findCategory(category)
      .forEach(property => {
        data.push(`\r\n  '${property.index}',`)
      })

    return data.join('')
  }

  /**
   * Returns the property value
   *
   * Возвращает значение свойства
   * @param {Object<string,*>} property property value / значение свойства
   * @param {string} space пробелы
   * @return {string}
   * @private
   */
  __getValue (property, space) {
    const keyVariable = PropertiesTool.getKeyVariable()

    if (
      property?.value &&
      property?.[keyVariable] !== 'none' &&
      property?.[keyVariable] !== 'mixin'
    ) {
      if (typeof property.value === 'object') {
        return `value: (${this.__toGo(property.value, `${space}    `)}\r\n${space}  ),`
      } else {
        return `value: ${this.__getValueItem(property)},`
      }
    } else {
      return 'value: null,'
    }
  }

  /**
   * Возвращает значение свойства
   * @param {Object<string,*>} property property value / значение свойства
   * @return {string}
   * @private
   */
  __getValueItem (property) {
    /**
     * @type {string}
     */
    const value = property?.[PropertiesTool.getKeyCss()] || property.value

    if (
      value.match(/^#[a-zA-Z0-9]+$/) ||
      value.match(/^([0-9]+|([0-9]+\.[0-9]+))(px|em|rem|vw|vh|%|)$/)
    ) {
      return `${value}`
    } else {
      return `'${value}'`
    }
  }

  /**
   * Returns a list of information about media file list
   *
   * Возвращает список информации о списках медиафайлов
   * @return {Object<string,Object<string,*>>}
   * @private
   */
  __getMediaList () {
    const data = {}

    this.items.findCategory('media')
      .forEach(property => {
        if (typeof property.item?.value === 'object') {
          Object.assign(data, property.item.value)
        }
      })

    return data
  }

  /**
   * Method for iterating over all properties and converting them to a SCSS structure
   *
   * Метод для обхода всех свойств и преобразования их в структуру SCSS
   * @param {Object<string,*>} properties list of properties / свойств
   * @param space пробелы
   * @return {string}
   * @private
   */
  __toGo (properties, space = '  ') {
    let data = ''

    forEach(properties, (property, name) => {
      data += `\r\n${space}'${name}':(`
      data += `\r\n${space}  ${this.__getIndex(name)}`
      data += `\r\n${space}  ${this.__getName(property, name)}`
      data += `\r\n${space}  ${this.__getType(property)}`
      data += `\r\n${space}  ${this.__getValue(property, space)}`
      data += `\r\n${space}),`
    })

    return data
  }

  /**
   * Method for converting data for media
   *
   * Метод преобразования данных для медиа
   * @return {string}
   * @private
   */
  __toMedia () {
    let data = ''

    forEach(this.__getMediaList(), (item, name) => {
      data += `\r\n  ${name}:${this.__getValueItem(item)},`
    })

    return data
  }
}
