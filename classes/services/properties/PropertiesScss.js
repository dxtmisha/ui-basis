const {
  forEach,
  isObject
} = require('../../../functions/data')

const Category = require('./PropertiesCategory')
const Keys = require('./PropertiesKeys')
const Palette = require('./PropertiesPalette')

const NAME_DESIGNS = '$designsDesigns'
const NAME_ROOT = '$designsRoot'
const NAME_MEDIA = '$designsMedia'
const NAME_PALETTE = '$designsPalette'
const NAME_SHADE = '$designsShade'
const NAME_PROPERTIES = '$designsProperties'

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
    let data = ''

    data += `${this.getDesigns()}\r\n`
    data += `${this.getRoot()}\r\n`
    data += `${this.getMedia()}\r\n`
    data += `${this.getClasses()}\r\n`
    data += `${this.getPalette()}\r\n`
    data += `${this.getShade()}\r\n`
    data += `${this.getProperties()}\r\n`

    return data
  }

  /**
   * Returns a list of connected designs
   *
   * Возвращает список подключенных дизайнов
   * @return {string}
   */
  getDesigns () {
    const designs = forEach(this.items.getDesigns(), design => `\r\n  '${design}',`)
    return `${NAME_DESIGNS}: (${designs.join('')});`
  }

  /**
   * Returns a list of properties for the root
   *
   * Возвращает список свойств для root
   * @return {string}
   */
  getRoot () {
    return `${NAME_ROOT}: (${this.__getByCategory(Category.root)});`
  }

  /**
   * Returns a list of device sizes
   *
   * Возвращает список размеров устройства
   * @return {string}
   */
  getMedia () {
    let data = ''

    forEach(this.items.getItemForMedia(), (
      values,
      design
    ) => {
      if (values && isObject(values)) {
        forEach(values, (
          item,
          name
        ) => {
          data += `\r\n  '${design}-${name}': ${this.__getValueItem(item)},`
        })
      }
    })

    return `${NAME_MEDIA}: (${data});`
  }

  /**
   * Returns a list of all classes for generation
   *
   * Возвращает список всех классов для генерации
   * @return {string}
   */
  getClasses () {
    return `$designsClasses: (${this.__getByCategory(['class', 'theme'])});`
  }

  /**
   * Returns a list of colors
   *
   * Возвращает список цветов
   * @return {string}
   */
  getPalette () {
    let data = ''

    new Palette(this.items)
      .getUsed()
      .forEach(({
        name,
        value
      }) => {
        data += `\r\n  '${name}': ('${value.join('\', \'')}'),`
      })

    return `${NAME_PALETTE}: (${data});`
  }

  /**
   * Returns a list of color saturation codes
   *
   * Возвращает список кодов насыщенности цветов
   * @return {string}
   */
  getShade () {
    let data = ''

    new Palette(this.items).getShade()
      .forEach(({
        design,
        value
      }) => {
        data += `\r\n  '${design}': (${value.join(',')}),`
      })

    return `${NAME_SHADE}: (${data});`
  }

  /**
   * Returns a list of properties
   *
   * Возвращает список свойств
   * @return {string}
   */
  getProperties () {
    return `${NAME_PROPERTIES}: (${this.__to()});`
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
  __to (
    properties = this.items.get(),
    space = '  '
  ) {
    let data = ''

    forEach(properties, (property, name) => {
      if (
        property?.value &&
        property?.[Keys.variable] !== 'none'
      ) {
        data += `\r\n${space}'${name}':(`
        data += `\r\n${space}  index: '${name}',`
        data += `\r\n${space}  name: '${property?.[Keys.name] || name}',`
        data += `\r\n${space}  type: '${property?.[Keys.variable]}',`
        data += `\r\n${space}  ${this.__getValue(property, space)}`

        if (property?.[Keys.modification] === false) {
          data += `\r\n${space}  modification: false,`
        }

        if (property?.[Keys.varKey] === true) {
          data += `\r\n${space}  var: true,`
        }

        data += `\r\n${space}),`
      }
    })

    return data
  }

  /**
   * Returns a list of all records with the selected type
   *
   * Возвращает список всех записей с выбранным типом
   * @param {string|string[]} category category names / названия категорий
   * @return {string}
   * @private
   */
  __getByCategory (category) {
    const data = []

    this.items.findCategory(category)
      .forEach(property => data.push(`\r\n  '${property.index}',`))

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
    if (typeof property.value === 'object') {
      return `value: (${this.__to(property.value, `${space}    `)}\r\n${space}  ),`
    } else {
      return `value: ${this.__getValueItem(property)},`
    }
  }

  /**
   * Возвращает значение свойства
   * @param {Object<string,*>} item property value / значение свойства
   * @return {string}
   * @private
   */
  __getValueItem (item) {
    /**
     * @type {string}
     */
    const value = item?.[Keys.css] || item.value

    if (
      value.match(/^#[a-zA-Z0-9]+$/) ||
      value.match(/^([0-9]+|([0-9]+\.[0-9]+))(px|em|rem|vw|vh|%|)$/)
    ) {
      return `${value}`
    } else {
      return `'${value}'`
    }
  }
}
