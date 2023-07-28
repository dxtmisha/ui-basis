const Category = require('../PropertiesCategory')
const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

const {
  forEach,
  isFilled,
  isObject
} = require('../../../../functions/data')

const KEY_CLASS_NAME = 'palette'
const KEY_CATEGORY = 'color'
const THEME_BASIC = 'basic'

const FILE_CACHE = '002-palette'

/**
 * Class for working with colors
 *
 * Класс для работы с цветами
 */
module.exports = class PropertiesToPalette {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
    this.palette = this.items.findCategory(Category.palette)
  }

  /**
   * Adding a class for working with colors
   *
   * Добавление класса для работы со цветами
   * @return {this}
   */
  to () {
    this.__to()
    this.items.findCategory(Category.theme)
      .forEach(({
        name,
        item
      }) => item?.value && this.__to(item.value, name))

    this.items.createStep(FILE_CACHE)
  }

  /**
   * Adding a color property by the name of the theme
   *
   * Добавление свойства цвета по названию темы
   * @param {Object<string, *>} root the property object, by which it will be added / объект свойства, по которому будет добавлять
   * @param {string} theme the name of the theme / название темы
   */
  __to (
    root = undefined,
    theme = THEME_BASIC
  ) {
    this.palette.forEach(palette => {
      const {
        item,
        parents
      } = palette

      const list = this.__getParent(
        root || parents?.[0]?.item?.value,
        root ? 'colors' : Category.classCategory
      )

      if (list) {
        forEach(item?.value, (shade, name) => {
          const parent = this.__getClass(list, name)

          this.__addItem(
            parent,
            `${palette.index}.${name}`,
            theme,
            shade?.value
          )

          this.__addDefault(parent, theme, item)
        })
      }
    })
  }

  /**
   * Adding a group of properties based on the design name
   *
   * Добавление группы свойств по названию дизайна
   * @param {Object<string, *>} parent the property object, by which it will be added / объект свойства, по которому будет добавлять
   * @param {string} category category names / названия категорий
   * @return {Object<string, *>}
   * @private
   */
  __getParent (parent, category) {
    if (parent) {
      parent[KEY_CLASS_NAME] = {
        value: {},
        [Keys.type]: Type.classType,
        [Keys.category]: category
      }
    }

    return parent?.[KEY_CLASS_NAME]?.value
  }

  /**
   * Adding a new class with the name of the color
   *
   * Добавление нового класса по имени цвета
   * @param {Object<string,*>} item list of classes / список классов
   * @param name class name / название класса
   * @return {Object<string,*>}
   * @private
   */
  __getClass (item, name) {
    if (!(name in item)) {
      item[name] = {
        value: {},
        [Keys.type]: Type.state
      }
    }

    return item[name].value
  }

  /**
   * Adding a saturation property
   *
   * Добавление свойства насыщенности
   * @param parent list of available values for the class / список доступных значений у класса
   * @param link list of classes / список классов
   * @param {string} theme the name of the theme / название темы
   * @param {Object<string, *>} palette the list of saturation / список насыщенности
   * @private
   */
  __addItem (
    parent,
    link,
    theme,
    palette
  ) {
    if (palette) {
      forEach(palette, (item, name) => {
        parent[this.__getName(theme, name)] = {
          value: this.__getNameValue(link, name),
          [Keys.type]: Type.var,
          [Keys.category]: KEY_CATEGORY
        }
      })
    }
  }

  /**
   * Returns names for light
   *
   * Возвращает названия для света
   * @param {string} theme the name of the theme / название темы
   * @param {string} name names of colors / названия цвета
   * @return {string}
   * @private
   */
  __getName (theme, name) {
    return `${theme}-${name}`
  }

  /**
   * Returns values for color
   *
   * Возвращает значения для цвета
   * @param {string} link base link / базовая ссылка
   * @param {string} name names of colors / названия цвета
   * @return {string}
   * @private
   */
  __getNameValue (link, name) {
    return `{${link}.${name}}`
  }

  /**
   * Adding a default value
   *
   * Добавление значения по умолчанию
   * @param parent list of available values for the class / список доступных значений у класса
   * @param {string} theme the name of the theme / название темы
   * @param palette list of classes / список классов
   * @private
   */
  __addDefault (parent, theme, palette) {
    const defaultValue = this.__getDefaultValue(palette, theme)
    const name = this.__getName(theme, defaultValue)

    if (name in parent) {
      parent['sys-palette'] = {
        ...parent[name],
        [Keys.fullName]: true
      }
    }
  }

  /**
   * Checking the default value
   *
   * Проверка значения по умолчанию
   * @param {Object<string,string>|string} item the value to be checked / проверяемое значение
   * @param {string} theme the name of the theme / название темы
   * @return {string|undefined}
   * @private
   */
  __getDefaultValue (item, theme) {
    const value = item?.[Keys.default]

    if (isFilled(value)) {
      return isObject(value) ? value?.[theme] : value
    }

    return 'default'
  }
}
