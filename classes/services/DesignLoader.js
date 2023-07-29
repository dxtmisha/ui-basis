const { To } = require('../To')

const PropertiesCache = require('./properties/PropertiesCache')
const Files = require('./properties/PropertiesFiles')
const Tool = require('./properties/PropertiesTool')
const PropertiesTool = require('./PropertiesTool')

const PropertiesComponent = require('./PropertiesComponent')

const EXP_VUE = /(new \w*Design *(<[^>]*>|) *\([^)]*\))/
const EXP_STYLE = /(@include *\w*Design(?! *\())/

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
    const dirs = Files.splitForDir(path)

    this.path = path
    this.source = source

    this.design = To.kebabCase(dirs[dirs.length - 2])
    this.component = To.kebabCase(dirs[dirs.length - 1])
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
    return Tool.getDesignsByEnv().indexOf(this.design) !== -1
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
   * Returns the full name of the component
   *
   * Возвращает полное имя компонента
   * @return {string}
   * @private
   */
  __getName () {
    return `${this.design}.${this.component}`
  }

  /**
   * Adding label of name and properties to the code
   *
   * Добавление метки имени и свойств к коду
   * @return {string}
   * @private
   */
  __toVue () {
    const component = new PropertiesComponent(this.__getName())

    const name = component.getNameLower()
    const properties = component.getPropsJson()
    const source = this.source
      .replace(/(export default|defineOptions ?\()/, `const __PROPERTIES_LIST = ${properties};\r\n\r\n$1`)
      .replace(EXP_VUE, `$1.setName('${name}').setSubClasses(subClasses).setProperties(__PROPERTIES_LIST)`)

    PropertiesCache.create(
      [name],
      'vue',
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
    const component = new PropertiesComponent(this.__getName())

    const name = component.getNameForStyle()
    const source = this.source
      .replace(EXP_STYLE, `$1('${name}')`)

    PropertiesCache.create(
      [component.getNameLower()],
      'style',
      source,
      'scss'
    )

    return source
  }
}
