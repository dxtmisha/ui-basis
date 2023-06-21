const { To } = require('../To')

const SYMBOL_AVAILABLE = '[\\w-&?{}()., ]+'

const KEY_NAME = '_name'
const KEY_CATEGORY = '_category'
const KEY_PROPS = '_props'
const KEY_STYLE = '_style'
const KEY_DEFAULT = '_default'
const KEY_IMPORTANT = '_important'
const KEY_RENAME = '_rename'
const KEY_VARIABLE = '_variable'
const KEY_CSS = '_css'
const KEY_FULL = '_fullName'
const KEY_FULL_VALUE = '_fullValue'
const KEY_PATH = '_path'

const KEYS_SPECIAL = [
  'value',
  'type',
  KEY_NAME,
  KEY_CATEGORY,
  KEY_PROPS,
  KEY_STYLE,
  KEY_DEFAULT,
  KEY_IMPORTANT,
  KEY_RENAME,
  KEY_VARIABLE,
  KEY_CSS,
  KEY_FULL,
  KEY_FULL_VALUE,
  KEY_PATH
]

module.exports = class PropertiesTool {
  /**
   * Checks if the variable is a special value
   *
   * Проверяет, является ли переменная специальным значением
   * @param {string} name key name / название ключа
   * @return {boolean}
   */
  static isSpecial (name) {
    return KEYS_SPECIAL.indexOf(name) !== -1
  }

  /**
   * Checks whether a value is a reference
   *
   * Проверяет, является ли значение ссылкой
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @return {boolean}
   */
  static isLink (value) {
    return typeof value === 'string' && !!value.match(/^{[^{}]+}$/)
  }

  /**
   * Checks whether the name is complete
   *
   * Проверяет, является ли название полным
   * @param {string} name key name / название ключа
   * @return {boolean}
   */
  static isFull (name) {
    return !!name.match(/^=|\|=/)
  }

  /**
   * Returns the property name, discarding its prefix
   *
   * Возвращает имя свойства, отбрасывая его префикс
   * @param {string} name key name / название ключа
   * @return {*}
   */
  static getName (name) {
    return To.kebabCase(
      name.replace(new RegExp(`^(.*?)(${SYMBOL_AVAILABLE})$`), '$2')
    )
  }

  /**
   * Returns similar values by its name
   *
   * Возвращает похожие значения по его имени
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @param {string} name name of the name / название имени
   * @param {{name:string,item:Object<string,*>}[]} parents array of all ancestor properties
   * along the tree from the top level / массив со всеми свойствами предков по дереву от верхнего уровня
   * @return {Object<string,*>}
   */
  static getSimilarParent (
    item,
    name,
    parents = undefined
  ) {
    const keyRename = this.getKeyRename()
    const keyVariable = this.getKeyVariable()
    const list = [...parents].reverse()
    let data

    if (!item?.[keyRename]) {
      list.shift()
      list.forEach(parent => {
        if (data === undefined) {
          if (
            [
              'class',
              'subclass'
            ].indexOf(parent.item?.[keyVariable]) !== -1
          ) {
            data = false
          } else if (
            item?.[keyVariable] === parent.item?.value?.[name]?.[keyVariable] &&
            parent.item?.value?.[name]?.[keyRename]
          ) {
            data = parent.item?.value?.[name]
          }
        }
      })
    }

    return data || undefined
  }

  /**
   * Returns the variable type name from the property name
   *
   * Возвращает название типа переменной из названия свойства
   * @param {string} name key name / название ключа
   * @return {*}
   */
  static getVariableInName (name) {
    return To.kebabCase(
      name.replace(new RegExp(`^(.*?)([|].*?$|${SYMBOL_AVAILABLE}$)`), '$1')
    )
  }

  /**
   * Returns a key for the property name
   *
   * Возвращает ключ для названия свойства
   * @return {string}
   */
  static getKeyName () {
    return KEY_NAME
  }

  /**
   * Returns a key for the category
   *
   * Возвращает ключ для категории
   * @return {string}
   */
  static getKeyCategory () {
    return KEY_CATEGORY
  }

  /**
   * Returns the key for write control in props
   *
   * Возвращает ключ для контроля записи в props
   * @return {string}
   */
  static getKeyProps () {
    return KEY_PROPS
  }

  /**
   * Returns the key to determine if the property is available for setting values in styles
   *
   * Возвращает ключ для определения, доступно ли свойство для установки значений в стилях
   * @return {string}
   */
  static getKeyStyle () {
    return KEY_STYLE
  }

  /**
   * Returns the key for the default property
   *
   * Возвращает ключ для свойства по умолчанию
   * @return {string}
   */
  static getKeyDefault () {
    return KEY_DEFAULT
  }

  /**
   * Returns the key for the 'important' property
   *
   * Возвращает ключ для свойства important
   * @return {string}
   */
  static getKeyImportant () {
    return KEY_IMPORTANT
  }

  /**
   * Returns a key for renaming a value
   *
   * Возвращает ключ для переименования значения
   * @return {string}
   */
  static getKeyRename () {
    return KEY_RENAME
  }

  /**
   * Returns a key for storing the property type
   *
   * Возвращает ключ для хранения типа свойства
   * @return {string}
   */
  static getKeyVariable () {
    return KEY_VARIABLE
  }

  /**
   * Returns a key for the CSS value
   *
   * Возвращает ключ для значения CSS
   * @return {string}
   */
  static getKeyCss () {
    return KEY_CSS
  }

  /**
   * Returns a key to determine if the name is full
   *
   * Возвращает ключ для определения, является ли имя полным
   * @return {string}
   */
  static getKeyFull () {
    return KEY_FULL
  }

  /**
   * Returns a key that determines if the value is fixed
   *
   * Возвращает ключ, который определяет, является ли значение фиксированным
   * @return {string}
   */
  static getKeyFullValue () {
    return KEY_FULL_VALUE
  }

  /**
   * Returns the key by which the path to the file is stored
   *
   * Возвращает ключ, по которому хранится путь к файлу
   * @return {string}
   */
  static getKeyPath () {
    return KEY_PATH
  }

  /**
   * Returns a list of link values
   *
   * Возвращает список значений ссылок
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @return {string[]}
   */
  static getLinkByValue (value) {
    return value.match(/{[^{}]+}/ig)
  }

  /**
   * Replaces labels with design and component names
   *
   * Заменяет метки на названия дизайна и компонента
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @param {string} design design name / название дизайна
   * @param {string} component component name / название компонента
   * @param {string[]} designs list of design names / список названий дизайнов
   * @return {string}
   */
  static toFull (value, design, component, designs) {
    if (value.match(/(?<=\{)\?/)) {
      return value
        .replace(/(?<=\{)\?\?/g, `${design}.${component}.`)
        .replace(/(?<=\{)\?/g, `${design}.`)
    } else {
      return this.toFullByDesigns(value, design, designs)
    }
  }

  /**
   * Replaces labels with design and component names
   *
   * Заменяет метки на названия дизайна и компонента
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @param {string} design design name / название дизайна
   * @param {string} component component name / название компонента
   * @return {string}
   */
  static toFullForName (value, design, component) {
    if (value.match(/\?/)) {
      return value
        .replace(/\?\?/g, `${design}-${component}-`)
        .replace(/\?/g, `${design}-`)
    } else {
      return value
    }
  }

  /**
   * Adds the name of the design at the beginning if it is missing
   *
   * Добавляет название дизайна в начало, если его нет
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @param {string} design design name / название дизайна
   * @param {string[]} designs list of design names / список названий дизайнов
   * @returns {string}
   */
  static toFullByDesigns (value, design, designs) {
    return value?.replace(/(?<=\{)[^.{}]+/g, name => {
      if (designs.indexOf(name) === -1) {
        return `${design}.${name}`
      } else {
        return name
      }
    })
  }
}
