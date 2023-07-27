const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')
const Category = require('../PropertiesCategory')

const css = require('../../../../constructors/propertiesListCss.json')
const cssSelector = require('../../../../constructors/propertiesListCssSelector.json')
const cssVirtual = require('../../../../constructors/propertiesListCssVirtual.json')

const FILE_CACHE = '008-variable'

/**
 * Class for performing data type conversions
 *
 * Класс для выполнения преобразования типов данных
 */
module.exports = class PropertiesToVariable {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Determine all properties and their property types in an object
   *
   * Определяем все свойства и их типы свойств в объекте
   */
  to () {
    this.items.each(({
      design,
      component,
      name,
      item,
      parent
    }) => {
      item[Keys.variable] =
        this.__getByVarParent(parent) ||
        this.__getByType(item) ||
        this.__getByCategory(item) ||
        this.__getByMain(design, component, name) ||
        this.__findType(name, item)
    })

    this.items.createStep(FILE_CACHE)
  }

  /**
   * Search for a suitable property by name
   *
   * Поиск подходящего свойства по названию
   * @param {string} name key name / название ключа
   * @param item current property / текущее свойство
   * @return {string}
   * @private
   */
  __findType (name, item) {
    const property = this.items.getItemName(name, item)

    if (typeof item?.value === 'object') {
      return this.__getBySubclass(item) ||
        this.__getBySelector(property) ||
        this.__getByVirtual(property) ||
        Type.state
    } else {
      return this.__getByProperty(property) ||
        Type.var
    }
  }

  /**
   * If there is a value of category, changes the property to the required one
   *
   * Если есть значение категории, изменяет свойство на нужное
   * @param item current property / текущее свойство
   * @return {undefined|string}
   * @private
   */
  __getByCategory (item) {
    switch (item?.[Keys.category]) {
      case Category.root:
        return Type.var
    }

    return undefined
  }

  /**
   * If the name matches the name of the design or component
   *
   * Если название совпадает с названием дизайна или компонента
   * @param {string} design design name / название дизайна
   * @param {string} component component name / название компонента
   * @param {string} name key name / название ключа
   * @return {undefined|string}
   * @private
   */
  __getByMain (
    design,
    component,
    name
  ) {
    if (name === design) {
      return Type.design
    } else if (name === component) {
      return Type.component
    }

    return undefined
  }

  /**
   * If the name of the property matches the name of the style in CSS
   *
   * Если название свойства совпадает с названием стиля в CSS
   * @param {string} name key name / название ключа
   * @return {string|undefined}
   * @private
   */
  __getByProperty (name) {
    return css.indexOf(name) !== -1 ? Type.property : undefined
  }

  /**
   * If the name of the property matches the name of the pseudo-class
   *
   * Если название свойства совпадает с названием псевдо-класса
   * @param {string} name key name / название ключа
   * @return {string|undefined}
   * @private
   */
  __getBySelector (name) {
    return cssSelector.indexOf(name) !== -1 ? Type.selector : undefined
  }

  /**
   * If the element has no properties and values
   *
   * Если у элемента нет ни одного свойства и значения
   * @param item current property / текущее свойство
   * @return {undefined|string}
   * @private
   */
  __getBySubclass (item) {
    if (
      Object.keys(item).length <= 1 &&
      Object.keys(item?.value).length === 0
    ) {
      return Type.subclass
    }

    return undefined
  }

  /**
   * If there are fields of type
   *
   * Если есть поля типа
   * @param item current property / текущее свойство
   * @return {string|undefined}
   * @private
   */
  __getByType (item) {
    if (Keys.type in item) {
      return Type.getNameSymbol(item[Keys.type]) || item[Keys.type]
    }

    return undefined
  }

  /**
   * If the ancestor has type var
   *
   * Если у предка тип var
   * @param {Object<string,*>} parent object of ancestor / объект предка
   * @return {string|undefined}
   * @private
   */
  __getByVarParent (parent) {
    return parent?.[Keys.variable] === Type.var ? Type.var : undefined
  }

  /**
   * If the type is a pseudo-element
   *
   * Если тип псевдо-элемента
   * @param {string} name key name / название ключа
   * @return {string|undefined}
   * @private
   */
  __getByVirtual (name) {
    return cssVirtual.indexOf(name) !== -1 ? Type.virtual : undefined
  }
}
