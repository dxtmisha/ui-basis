const { To } = require('../To')

const SYMBOL_AVAILABLE = '[\\w-&?{}()., ]+'

/**
 * The key for storing the final name of the property after all processing
 *
 * Ключ для хранения конечного названия свойства после всех обработок
 * @type {string}
 */
const KEY_NAME = '_name'

/**
 * Key for storing the original key
 *
 * Ключ для хранения оригинального ключа
 * @type {string}
 */
const KEY_ORIGINAL = '_original'

/**
 * The key for storing the type of category of the property, for example, class, root
 *
 * Ключ для хранения типа категории свойства, например, class, root
 * @type {string}
 */
const KEY_CATEGORY = '_category'

/**
 * The key for determining whether to add the property as a variable of the component or not
 *
 * Ключ для определения, нужно ли добавлять свойство как переменную компонента или нет
 * @type {string}
 */
const KEY_PROPS = '_props'

/**
 * Key for renaming the variable name in the component
 *
 * Ключ для переименования названия переменной в компоненте
 * @type {string}
 */
const KEY_PROPS_NAME = '_props-name'

/**
 * Key for determining whether to add this property as a parameter to the component or not
 *
 * Ключ для определения, нужно ли добавлять это свойство в качестве параметра у компонента или нет
 * @type {string}
 */
const KEY_PROPS_VALUE = '_props-value'

/**
 * Key for determining whether the property is available as a value for a custom style attribute
 *
 * Ключ для определения, доступно ли свойство в качестве значения пользовательского атрибута стиля
 * @type {string}
 */
const KEY_STYLE = '_style'

/**
 * Key for determining the default value of the component parameter
 *
 * Ключ для определения значения по умолчанию параметра компонента
 * @type {string}
 */
const KEY_DEFAULT = '_default'

/**
 * To determine whether to add !important at the end of the value
 *
 * Ключ для определения, добавлять ли !important в конце значения
 * @type {string}
 */
const KEY_IMPORTANT = '_important'

/**
 * Key for renaming the property name
 *
 * Ключ для переименования названия свойства
 * @type {string}
 */
const KEY_RENAME = '_rename'

/**
 * The parameter determines the type of property (for the user)
 *
 * Параметр определяет тип свойства (для пользователя)
 * @type {string}
 */
const KEY_TYPE = '_type'

/**
 * The parameter determines the type of property
 *
 * Параметр определяет тип свойства
 * @type {string}
 */
const KEY_VARIABLE = '_variable'

/**
 * The key for storing a value, formatted for output in a specific style
 *
 * Ключ для хранения значения, отформатированный для вывода в определенный стиль
 * @type {string}
 */
const KEY_CSS = '_css'

/**
 * The key for storing the value indicating whether the property is processed
 *
 * Ключ для хранения значения, указывающего, обрабатывается ли свойство
 * @type {string}
 */
const KEY_MODIFICATION = '_modification'

/**
 * The key for storing the value indicating whether to add a custom property
 *
 * Ключ для хранения значения, указывающего, добавлять ли пользовательское свойство
 * @type {string}
 */
const KEY_VAR = '_var'

/**
 * The key determines that the name of the property is the final version and does not require further processing
 *
 * Ключ определяет, что имя свойства является финальной версией и не требует дополнительной обработки
 * @type {string}
 */
const KEY_FULL = '_full-name'

/**
 * The key determines that the property value is the final version and does not require further processing.
 *
 * Ключ определяет, что значение свойства является финальной версией и не требует дополнительной обработки.
 * @type {string}
 */
const KEY_FULL_VALUE = '_full-value'

/**
 * The key by which the delimiter sign is determined
 *
 * Ключ, по которому определяется знак-разделитель (/)
 * @type {string}
 */
const KEY_SEPARATOR = '_separator'

/**
 * The key for simplifying the nesting type
 *
 * Ключ для упрощения типа nesting (/basic)
 * @type {string}
 */
const KEY_SIMPLIFICATION = '_simplification'

/**
 * Indicates that this property was broken into parts
 *
 * Указывает, что это свойство было разбито на части
 * @type {string}
 */
const KEY_WRAP = '_wrap'

/**
 * It indicates that you need to transform the values of the properties
 *
 * Указывает, что надо преобразовывать значения свойств
 * @type {string}
 */
const KEY_REPLACE = '_replace'

/**
 * Indicates which components need to be used
 *
 * Указывает, какие компоненты надо использовать
 * @type {string}
 */
const KEY_COMPONENTS = '_components'

/**
 * The key for storing the path to the component
 *
 * Ключ для хранения пути к компоненту
 * @type {string}
 */
const KEY_PATH = '_path'

const KEY_CLASS_CUSTOM = 'custom'

const KEYS_SPECIAL = [
  'value',
  'type',
  KEY_NAME,
  KEY_ORIGINAL,
  KEY_CATEGORY,
  KEY_PROPS,
  KEY_PROPS_NAME,
  KEY_PROPS_VALUE,
  KEY_STYLE,
  KEY_DEFAULT,
  KEY_IMPORTANT,
  KEY_RENAME,
  KEY_TYPE,
  KEY_VARIABLE,
  KEY_CSS,
  KEY_MODIFICATION,
  KEY_VAR,
  KEY_FULL,
  KEY_FULL_VALUE,
  KEY_SEPARATOR,
  KEY_SIMPLIFICATION,
  KEY_WRAP,
  KEY_REPLACE,
  KEY_COMPONENTS,
  KEY_PATH
]

const SIMILAR = [
  'var',
  'property'
]

const SIMILAR_EXCEPTION = [
  'class',
  'subclass'
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
    return typeof value === 'string' &&
      !!value.match(/^{[^{}]+}$/) &&
      !value.match(/[{?.]sys/)
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
   * Is the property a SCSS selector
   *
   * Является ли свойство выборки SCSS
   * @param {string} name key name / название ключа
   * @return {boolean}
   */
  static isScss (name) {
    return !!name.match(/^&/)
  }

  /**
   * Checks if there is a label for converting to the full name
   *
   * Проверяет, есть ли метка для преобразования в полное имя
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @return {boolean}
   */
  static isMarkFull (value) {
    return !!value.match(/\?/)
  }

  /**
   * Checks if the property is available for inheritance
   *
   * Проверяет, доступно ли свойство для наследования
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @return {boolean}
   */
  static isSimilar (item) {
    return SIMILAR.indexOf(item?.[this.getKeyVariable()]) !== -1
  }

  /**
   * Checks if inheriting the property is prohibited
   *
   * Проверяет, запрещено ли наследовать свойство
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @return {boolean}
   */
  static isSimilarException (item) {
    return SIMILAR_EXCEPTION.indexOf(item?.[this.getKeyVariable()]) !== -1
  }

  /**
   * This method returns the names of designs from the environment variable (env)
   *
   * Данный метод возвращает названия дизайнов из переменной окружения (env)
   * @return {string[]}
   */
  static getDesignsByEnv () {
    const designs = process.env.VUE_APP_DESIGNS
    return designs?.toString()?.split(',') || []
  }

  /**
   * Returns the property name, discarding its prefix
   *
   * Возвращает имя свойства, отбрасывая его префикс
   * @param {string} name key name / название ключа
   * @return {*}
   */
  static getName (name) {
    if (this.isScss(name)) {
      return name
    } else {
      return To.kebabCase(
        name.replace(new RegExp(`^(.*?)(${SYMBOL_AVAILABLE})$`), '$2')
      )
    }
  }

  /**
   * Returns the standard name
   *
   * Возвращает стандартное имя
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @param {string} name name of the name / название имени
   * @return {string}
   */
  static getNameByItem (item, name) {
    const keyName = this.getKeyName()
    const keyRename = this.getKeyRename()

    if (item?.[keyName]) {
      return item[keyName]
    } else if (item?.[keyRename]) {
      return this.getName(item?.[keyRename])
    } else {
      return this.getName(name)
    }
  }

  /**
   * Returns the variable type name from the property name
   *
   * Возвращает название типа переменной из названия свойства
   * @param {string} name key name / название ключа
   * @return {*}
   */
  static getVariableInName (name) {
    if (this.isScss(name)) {
      return '&'
    } else {
      return To.kebabCase(
        name.replace(new RegExp(`^(.*?)([|].*?$|${SYMBOL_AVAILABLE}$)`), '$1')
      )
    }
  }

  /**
   * Returns the values of the property
   *
   * Возвращает значения свойства
   * @param {Object<string,*>} property An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @return {Object<string,*>}
   */
  static getValue (property) {
    return property?.value || property
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
    const keyType = this.getKeyType()
    const list = [...parents].reverse()
    let data

    if (
      !item?.[keyRename] &&
      !item?.[keyType] &&
      !this.isSimilarException(item) &&
      !this.isSimilarException(list?.[0]?.item)
    ) {
      list.shift()
      list.forEach(parent => {
        if (data === undefined) {
          const similar = parent.item?.value?.[name]

          if (this.isSimilarException(parent.item)) {
            data = false
          } else if (
            similar &&
            this.isSimilar(similar) && (
              similar?.[keyRename] ||
              similar?.[keyType]
            )
          ) {
            data = similar
          }
        }
      })
    }

    return data || undefined
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
   * Returns a key for the property name
   *
   * Возвращает ключ для названия свойства
   * @return {string}
   */
  static getKeyOriginal () {
    return KEY_ORIGINAL
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
   * Returns a key for renaming a property in props
   *
   * Возвращает ключ для переименования свойства в props
   * @return {string}
   */
  static getKeyPropsName () {
    return KEY_PROPS_NAME
  }

  /**
   * Returns the key for a value in props
   *
   * Возвращает ключ для значения в props
   * @return {string}
   */
  static getKeyPropsValue () {
    return KEY_PROPS_VALUE
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
   * Returns a key for storing the property type (for the user)
   *
   * Возвращает ключ для хранения типа свойства (для пользователя)
   * @return {string}
   */
  static getKeyType () {
    return KEY_TYPE
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
   * Returns the key for enabling or disabling the modification
   *
   * Возвращает ключ для включения или отключения модификации
   * @return {string}
   */
  static getKeyModification () {
    return KEY_MODIFICATION
  }

  /**
   * Returns the key for enabling the custom value
   *
   * Возвращает ключ для включения пользовательского значения
   * @return {string}
   */
  static getKeyVar () {
    return KEY_VAR
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
   * Returns the key by which the delimiter sign is determined
   *
   * Возвращает ключ, по которому определяется знак-разделитель
   * @return {string}
   */
  static getKeySeparator () {
    return KEY_SEPARATOR
  }

  /**
   * Returns the key for simplifying the nesting type
   *
   * Возвращает ключ для упрощения типа nesting
   * @return {string}
   */
  static getKeySimplification () {
    return KEY_SIMPLIFICATION
  }

  /**
   * Returns the key, indicating that this property was broken into parts
   *
   * Возвращает ключ, указывая, что это свойство было разбито на части
   * @return {string}
   */
  static getKeyWrap () {
    return KEY_WRAP
  }

  /**
   * Returns the key, indicating that you need to transform the values of the properties
   *
   * Возвращает ключ, указывая, что что надо преобразовывать значения свойств
   * @return {string}
   */
  static getKeyReplace () {
    return KEY_REPLACE
  }

  /**
   * Returns a key indicating the list of available classes
   *
   * Возвращает ключ, указывающий список доступных классов
   * @return {string}
   */
  static getKeyComponents () {
    return KEY_COMPONENTS
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
   * Returns the key name of the property for storing user-defined values
   *
   * Возвращает ключ названия свойства для хранения пользовательских значений
   * @return {string}
   */
  static getKeyClassCustom () {
    return KEY_CLASS_CUSTOM
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
   * Returns an object with updated values, taking into account its location
   *
   * Возвращает объект с обновленными значениями, учитывая его местоположение
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @param value new values for the properties / новые значения для свойств
   * @return {(*&{value})|*}
   */
  static getPropertiesByValue (properties, value) {
    if (properties?.value) {
      return {
        ...properties,
        value
      }
    } else {
      return value
    }
  }

  /**
   * Changes the name so that it is suitable for indication
   *
   * Изменяет имя так, чтобы оно подходило для индикации
   * @param {string} name property name / название свойства
   * @return {string}
   */
  static toIndex (name) {
    return To.kebabCase(name.replace(/(?<!^)_+/g, '-'))
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
        .replace(/(?<=\{)\?\?(?![_-])/g, `${design}.${component}.`)
        .replace(/(?<=\{)\?\?(?=[_-])/g, `${design}.${component}`)
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
    if (this.isMarkFull(value)) {
      return value
        .replace(/\?\?(?![_-])/g, `${design}-${component}-`)
        .replace(/\?\?(?=[_-])/g, `${design}-${component}`)
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

  /**
   * Transformations to a class name
   *
   * Преобразование в имя класса
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @return {string}
   */
  static toClass (value) {
    return To.kebabCase(
      value
        .replace(/[{}]/g, '')
        .replace('.', '-')
        .replaceAll('.', '--')
    )
  }
}
