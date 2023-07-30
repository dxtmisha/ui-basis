const Cache = require('./properties/PropertiesCache')
const Loader = require('./properties/PropertiesLoader')
const Tool = require('./properties/PropertiesTool')

const EXP_VUE = /(new \w*Design *(<[^>]*>|) *\([^)]*\))/
const EXP_STYLE = /(@include *\w*Design(?! *\())/

const FILE_VUE = 'script'
const FILE_STYLE = 'style'

/**
 * Class for managing content in the code
 *
 * Класс для управления содержимым в коде
 */
module.exports = class DesignLoader {
  /**
   * Constructor
   * @param {string} path filename / имя файла
   * @param {string} source content in file  / содержимое в файле
   */
  constructor (
    path,
    source
  ) {
    this.loader = new Loader(path)
    this.source = source
  }

  /**
   * Starting code processing
   *
   * Начало обработки кода
   * @return {string}
   */
  to () {
    if (this.__isComponent()) {
      if (this.__isVue()) {
        return this.__toVue()
      } else if (this.__isStyle()) {
        return this.__toStyle()
      }
    }

    return this.source
  }

  /**
   * Checks whether this component is a design component
   *
   * Проверяет, является ли этот компонент дизайн-компонентом
   * @return {boolean}
   * @private
   */
  __isComponent () {
    return Tool.getDesignsByEnv().indexOf(this.loader.getDesign()) !== -1
  }

  /**
   * Checking if this is a part of the style
   *
   * Проверка, является ли это частью стиля
   * @return {boolean}
   * @private
   */
  __isVue () {
    return !!this.source.match(EXP_VUE)
  }

  /**
   * Checking if this is a part of the code
   *
   * Проверка, является ли это частью кода
   * @return {boolean}
   * @private
   */
  __isStyle () {
    return !!this.source.match(EXP_STYLE)
  }

  /**
   * Adding label of name and properties to the code
   *
   * Добавление метки имени и свойств к коду
   * @return {string}
   * @private
   */
  __toVue () {
    const name = this.loader.getName()
    const properties = this.loader.getJson()
    const source = this.source
      .replace(/(export default|defineOptions ?\()/, `const __PROPERTIES_LIST = ${properties};\r\n\r\n$1`)
      .replace(EXP_VUE, `$1.setName('${name}').setSubClasses(subClasses).setProperties(__PROPERTIES_LIST)`)

    Cache.create(
      [name],
      FILE_VUE,
      source,
      'ts'
    )

    return source
  }

  /**
   * Adding a label to styles to indicate the component name
   *
   * Добавление метки к стилям для обозначения названия компонента
   * @return {string}
   * @private
   */
  __toStyle () {
    const name = this.loader.getNameForStyle()
    const source = this.source
      .replace(EXP_STYLE, `$1('${name}')`)

    Cache.create(
      [this.loader.getName()],
      FILE_STYLE,
      source,
      'scss'
    )

    return source
  }
}
