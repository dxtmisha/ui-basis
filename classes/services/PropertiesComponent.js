const { forEach } = require('../../functions/data')

const Properties = require('./Properties')
const PropertiesTool = require('./PropertiesTool')
const { To } = require('../To')

/**
 * List available for addition to props
 *
 * Список доступный для добавления в props
 * @type {string[]}
 */
const LIST_PROPS = [
  'disabled',
  'focus',
  'read-only'
]

/**
 * Class for preparing data for components
 *
 * Класс для подготовки данных для компонентов
 */
module.exports = class PropertiesComponent {
  /**
   * Constructor
   * @param {string} name component name / названия компонента
   */
  constructor (name) {
    this.name = name
    this.properties = new Properties()
  }

  /**
   * Returns all properties of this component
   *
   * Возвращает все свойства этого компонента
   * @return {Object<string, *>}
   */
  get () {
    return this.properties.get().getItemByIndex(this.name) || {}
  }

  /**
   * Returns the property available for props
   *
   * Возвращает свойство, доступное для props
   * @return {{value:(string|boolean)[], name:string, style:boolean, default:boolean}}
   */
  getByProps () {
    const keyDefault = PropertiesTool.getKeyDefault()
    const properties = {}

    forEach(this.get()?.value, (item, name) => {
      if (this.__isProps(item)) {
        const value = this.__toValue(item?.value)

        properties[name] = {
          value,
          name: this.__toName(item, name),
          style: this.__isStyle(item, value),
          default: item?.[keyDefault]
        }
      }
    })

    return properties
  }

  /**
   * Returns the name of the design
   *
   * Возвращает название дизайна
   * @return {string}
   */
  getDesign () {
    return To.kebabCase(this.name.match(/^[^.]+/)?.[0] || 'd')
  }

  /**
   * Returns the name of the component
   *
   * Возвращает название компонента
   * @return {string}
   */
  getComponent () {
    return To.camelCaseFirst(
      this.name.replace(/^([^.]+\.)(.*?)$/, '$2') || 'component'
    )
  }

  /**
   * Returns the full name of the component
   *
   * Возвращает полное название компонента
   * @return {string}
   */
  getName () {
    return To.camelCaseFirst(`${this.getDesign()}${this.getComponent()}`)
  }

  /**
   * Checks if the property is available for addition to props
   *
   * Проверяет, доступно ли свойство для добавления в props
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @return {boolean}
   * @private
   */
  __isProps (item) {
    const isProps = item?.[PropertiesTool.getKeyProps()]
    return isProps !== false && (
      isProps === true ||
      item?.[PropertiesTool.getKeyVariable()] === 'state' ||
      LIST_PROPS.indexOf(item?.[PropertiesTool.getKeyName()]) !== -1
    )
  }

  /**
   * Checks if the property is available for addition to style
   *
   * Проверяет, доступно ли свойство для добавления в style
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @param {(string|boolean)[]} value available property / доступное свойство
   * @return {boolean}
   * @private
   */
  __isStyle (item, value) {
    return item?.[PropertiesTool.getKeyStyle()] !== false && value?.[0] !== true
  }

  /**
   * Returns a formatted string with the property name
   *
   * Возвращает отформатированную строку с названием свойства
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @param {string} name name of the name / название имени
   * @return {string}
   * @private
   */
  __toName (item, name) {
    return To.camelCase(
      item?.[PropertiesTool.getKeyPropsName()] || name
    )
  }

  /**
   * Returns all available values
   *
   * Возвращает все доступные значения
   * @param {Object<string,*>} properties array with all property records / массив со всеми записями свойств
   * @return {(string|boolean)[]}
   * @private
   */
  __toValue (properties) {
    const keyVariable = PropertiesTool.getKeyVariable()
    const value = []
    let isTrue = false

    forEach(properties, (property, name) => {
      if (property?.[keyVariable] === 'state') {
        value.push(name)
      } else {
        isTrue = true
      }
    })

    if (isTrue) {
      value.push(true)
    }

    return value
  }
}
