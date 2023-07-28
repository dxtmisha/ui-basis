/**
 * Class with a list of available types
 *
 * Класс со списком доступных типов
 */
module.exports = class PropertiesType {
  /**
   * @type {string}
   */
  static design = 'design'

  /**
   * @type {string}
   */
  static component = 'component'

  /**
   * Type of user property
   *
   * Тип пользовательского свойства
   * @type {string}
   */
  static var = 'var'

  /**
   * Type of style property
   *
   * Тип свойства стиля
   * @type {string}
   */
  static property = 'property'

  /**
   * Pseudo-classes
   * @type {string}
   */
  static selector = 'selector'

  /**
   * Pseudo-elements
   * @type {string}
   */
  static virtual = 'virtual'

  /**
   * Element state
   *
   * Состояние элемента
   * @type {string}
   */
  static state = 'state'

  /**
   * Child element
   *
   * Дочерний элемент
   * @type {string}
   */
  static subclass = 'subclass'

  /**
   * css / @media(min-width)
   * @type {string}
   */
  static media = 'media'

  /**
   * css / @media(max-width)
   * @type {string}
   */
  static mediaMax = 'media-max'

  /**
   * css / @keyframes
   * @type {string}
   */
  static animate = 'animate'

  /**
   * Link for adding additional data
   *
   * Ссылка для добавления дополнительных данных
   * @type {string}
   */
  static link = 'link'

  /**
   * Link to the object of the class. Such a property does not generate new data, but simply adds it in the form of a class
   *
   * Ссылка к объекту класса. Такое свойство не генерируют новых данных, а просто добавляют в виде класса
   * @type {string}
   */
  static linkClass = 'link-class'

  /**
   * Selector for code in scss
   *
   * Селектор для кода на scss
   * @type {string}
   */
  static scss = 'scss'

  /**
   * @type {string}
   */
  static classType = 'class'

  /**
   * @type {string}
   */
  static theme = 'theme'

  /**
   * scss / @at-root
   * @type {string}
   */
  static root = 'root'

  /**
   * Such types do not participate in the formation of style and exist only for storing the property and value for the reference
   *
   * Такие типы не участвуют в формировании стиля и существуют только для хранения свойства и значения для ссылки
   * @type {string}
   */
  static mixin = 'mixin'

  /**
   * Such records will be deleted from the array
   *
   * Такие записи будут удалены из массива
   * @type {string}
   */
  static none = 'none'

  static symbols = {
    $: 'var',
    ':': 'selector',
    '::': 'virtual',
    '~': 'state',
    '#': 'subclass',
    '@': 'link',
    '@@': 'link-class',
    '&': 'scss',
    '&&': 'root',
    '--': 'none'
  }

  /**
   * Checks if the name is a type
   *
   * Проверяет, является ли название типом
   * @param {string} name Названия типа
   * @return {boolean}
   */
  static isType (name) {
    return this.__types.indexOf(name) !== -1
  }

  /**
   * Returns the name of the property by its symbol
   *
   * Возвращает название свойства по его символу
   * @param {string} name
   */
  static getNameSymbol (name) {
    return this.symbols?.[name]
  }

  static __types = [
    this.design,
    this.component,
    this.var,
    this.property,
    this.selector,
    this.virtual,
    this.state,
    this.subclass,
    this.media,
    this.mediaMax,
    this.animate,
    this.link,
    this.linkClass,
    this.scss,
    this.classType,
    this.theme,
    this.root,
    this.mixin,
    this.none
  ]
}
