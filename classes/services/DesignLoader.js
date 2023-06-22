const { To } = require('../To')

const PropertiesCache = require('./PropertiesCache')
const PropertiesFiles = require('./PropertiesFiles')
const PropertiesTool = require('./PropertiesTool')

const PropertiesComponent = require('./PropertiesComponent')

const EXP_VUE = /(new \w*Design ?\([^)]*\))/
const EXP_STYLE = /(@include \w*Design(?! ?\())/

module.exports = class DesignLoader {
  constructor (
    path,
    source
  ) {
    const dirs = PropertiesFiles.splitForDir(path)

    this.path = path
    this.source = source

    this.design = To.kebabCase(dirs[dirs.length - 2])
    this.component = To.kebabCase(dirs[dirs.length - 1])
  }

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
    return PropertiesTool.getDesignsByEnv().indexOf(this.design) !== -1
  }

  __isVue () {
    return !!this.source.match(EXP_VUE)
  }

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

  __toVue () {
    const component = new PropertiesComponent(this.__getName())

    const name = component.getNameLower()
    const properties = JSON.stringify(component.getProps())
    const source = this.source
      .replace(EXP_VUE, `$1.setName('${name}').setProperties(${properties})`)

    PropertiesCache.create(
      [name],
      'vue',
      source,
      'ts'
    )

    return source
  }

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
