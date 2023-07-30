/**
 * Key with all special keys for token processing
 *
 * Ключ со всеми специальными ключами для обработки токенов
 */
module.exports = class PropertiesKeys {
  /**
   * The parameter determines the type of property (for the user) / Параметр определяет
   * тип свойства (для пользователя)
   * @type {string}
   */
  static type = '_type'

  /**
   * Category of property / Категория свойства
   * @type {string}
   */
  static category = '_category'

  /**
   * Rename the names of properties / Переименовывать названия свойств
   * @type {string}
   */
  static rename = '_rename'

  /**
   * Default values / Значения по умолчанию
   * @type {string}
   */
  static default = '_default'

  /**
   * Key for determining whether the property is available as a value for a custom style attribute
   *
   * Ключ для определения, доступно ли свойство в качестве значения пользовательского атрибута стиля
   * @type {string}
   */
  static style = '_style'

  /**
   * The key determines that the name of the property is the final version and does not require further processing
   *
   * Ключ определяет, что имя свойства является финальной версией и не требует дополнительной обработки
   * @type {string}
   */
  static fullName = '_full-name'

  /**
   * The key determines that the property value is the final version and does not require further processing.
   *
   * Ключ определяет, что значение свойства является финальной версией и не требует дополнительной обработки.
   * @type {string}
   */
  static fullValue = '_full-value'

  /**
   * @type {string}
   */
  static important = '_important'

  /**
   * The key for storing the value indicating whether to add a custom property
   *
   * Ключ для хранения значения, указывающего, добавлять ли пользовательское свойство
   * @type {string}
   */
  static varKey = '_var'

  /**
   * Determines whether values need to be converted
   *
   * Определяет, надо ли преобразовывать значения
   * @type {string}
   */
  static modification = '_modification'

  /**
   * It indicates that you need to transform the values of the properties
   *
   * Указывает, что надо преобразовывать значения свойств
   * @type {string}
   */
  static replace = '_replace'

  /**
   * The key for determining whether to add the property as a variable of the component or not
   *
   * Ключ для определения, нужно ли добавлять свойство как переменную компонента или нет
   * @type {string}
   */
  static props = '_props'

  /**
   * Key for determining whether to add this property as a parameter to the component or not
   *
   * Ключ для определения, нужно ли добавлять это свойство в качестве параметра у компонента или нет
   * @type {string}
   */
  static propsValue = '_props-value'

  /**
   * Indicates which components need to be used
   *
   * Указывает, какие компоненты надо использовать
   * @type {string}
   */
  static components = '_components'

  /**
   * The key for storing the final name of the property after all processing
   *
   * Ключ для хранения конечного названия свойства после всех обработок
   * @type {string}
   */
  static name = '__n'

  /**
   * The parameter determines the type of property / Параметр определяет тип свойства
   * @type {string}
   */
  static variable = '__v'

  /**
   * @type {string}
   */
  static css = '__c'

  /**
   * Ключ для хранения список источник данный для этого записи
   * @type {string}
   */
  static files = '__files'

  /**
   * The label, by which we determine that this is a part of a grouped name and it needs to
   * be optimized according to the data
   *
   * Метка, по которой определяем, что это часть группированного имени и его надо
   * оптимизировать по данным
   * @type {string}
   */
  static wrap = '__wrap'

  /**
   * The separator in the names into tokens for grouped names, by which we split the names into parts
   *
   * Разделитель в названиях на токены для сгруппированных имен, по которым разделяем названия на части
   * @type {string}
   */
  static SEPARATOR = '/'

  /**
   * Checks if the variable is a special value
   *
   * Проверяет, является ли переменная специальным значением
   * @param {string} key key name / название ключа
   * @return {boolean}
   */
  static isSpecial (key) {
    return this.__special.indexOf(key) !== -1
  }

  static __special = [
    'type',
    this.type,
    this.category,
    this.rename,
    this.default,
    this.style,
    this.fullName,
    this.fullValue,
    this.important,
    this.varKey,
    this.modification,
    this.replace,
    this.props,
    this.propsValue,
    this.name,
    this.components,
    this.variable,
    this.css,
    this.files,
    this.wrap
  ]
}
