const {
  forEach,
  getColumn
} = require('../../functions/data')

const PropertiesTool = require('./PropertiesTool')

const KEY_PALETTE = 'palette'
const KEY_CATEGORY = 'color'

const FILE_CACHE_PALETTE = 'palette'

/**
 * Class for working with colors
 *
 * Класс для работы с цветами
 */
module.exports = class PropertiesPalette {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
    this.palette = this.items.findCategory('palette')
  }

  /**
   * Getting a list of all colors
   *
   * Получение списка всех цветов
   * @return {string[]}
   */
  getListValue () {
    return forEach(
      this.items.findCategory('color'),
      property => property?.item?.value
    )
  }

  /**
   * Returns a list of available saturation levels
   *
   * Возвращает список доступных уровней насыщенности
   * @return {{design: string, value: string[]}[]}
   */
  getListShade () {
    return forEach(
      forEach(
        this.items.findCategory('shade'),
        property => {
          return {
            design: property.design,
            value: property?.item?.value
          }
        }
      ),
      item => {
        return {
          design: item.design,
          value: getColumn(item.value, 'value')
        }
      }
    )
  }

  /**
   * Getting a list of used values
   *
   * Получаем список использованных значений
   * @return {{name:string,value:string[]}[]}
   */
  getListUsed () {
    const keyName = PropertiesTool.getKeyName()
    const keyCategory = PropertiesTool.getKeyCategory()
    const keyVariable = PropertiesTool.getKeyVariable()
    const list = this.getListValue()

    /**
     * @type {{name:string,value:string[]}[]}
     */
    const data = []

    this.items.each(({
      item,
      design,
      parents
    }) => {
      if (
        typeof item?.value === 'string' &&
        item?.[keyCategory] !== KEY_CATEGORY &&
        item?.[keyVariable] === 'var' &&
        list.indexOf(item?.value) !== -1
      ) {
        const name = item?.[keyName]
        const code = data.find(code => code.name === name)
        const theme = parents.find(parent => parent.item[keyCategory] === 'theme')?.name || 'basic'
        const value = `--${design}-palette-${this.__getNameCode(theme, item?.value?.match(/\.([^.{}]+)}/)?.[1])}`

        if (code) {
          if (theme) {
            code.value.push(value)
          } else {
            code.value.unshift(value)
          }
        } else {
          data.push({
            name,
            value: [value]
          })
        }
      }
    })

    return data
  }

  /**
   * Adding a class for working with colors
   *
   * Добавление класса для работы со цветами
   * @return {this}
   */
  to () {
    this.toTheme()
    this.items.findCategory('theme')
      .forEach(item => this.toTheme(item.item?.value, item.name))

    this.items.cache(FILE_CACHE_PALETTE)

    return this
  }

  /**
   * Adding a color property by the name of the theme
   *
   * Добавление свойства цвета по названию темы
   * @param {Object<string, *>} root the property object, by which it will be added / объект свойства, по которому будет добавлять
   * @param {string} theme the name of the theme / название темы
   */
  toTheme (root = undefined, theme = 'basic') {
    this.palette.forEach(palette => {
      const list = root
        ? this.__getByParent(root)
        : this.__getByParent(palette.parents?.[0]?.item?.value, 'class')

      if (list) {
        forEach(palette.item?.value, (items, name) => {
          const classItem = this.__getByClass(list, name)

          this.__addItem(
            `${palette.index}.${name}`,
            classItem,
            theme,
            items
          )

          this.__addDefault(palette, classItem, theme)
        })
      }
    })
  }

  __getNameCode (theme, code) {
    return `${theme}-${code}`
  }

  /**
   * Adding a group of properties based on the design name
   *
   * Добавление группы свойств по названию дизайна
   * @param {Object<string, *>} parent the property object, by which it will be added / объект свойства, по которому будет добавлять
   * @param {string} category base property name / базовое название свойства
   * @return {Object<string, *>}
   * @private
   */
  __getByParent (parent, category = undefined) {
    if (parent) {
      parent[KEY_PALETTE] = {
        value: {},
        [PropertiesTool.getKeyCategory()]: category,
        [PropertiesTool.getKeyVariable()]: category ? 'component' : 'class'
      }
    }

    return parent?.[KEY_PALETTE]?.value
  }

  /**
   * Adding a new class with the name of the color
   *
   * Добавление нового класса по имени цвета
   * @param {Object<string,*>} palettes list of classes / список классов
   * @param className class name / название класса
   * @return {Object<string,*>}
   * @private
   */
  __getByClass (palettes, className) {
    if (!(className in palettes)) {
      palettes[className] = {
        value: {},
        [PropertiesTool.getKeyVariable()]: 'state'
      }
    }

    return palettes[className].value
  }

  /**
   * Adding a saturation property
   *
   * Добавление свойства насыщенности
   * @param palette list of classes / список классов
   * @param classItem list of available values for the class / список доступных значений у класса
   * @param {string} theme the name of the theme / название темы
   * @param {Object<string, *>} items the list of saturation / список насыщенности
   * @private
   */
  __addItem (palette, classItem, theme, items) {
    const keyCategory = PropertiesTool.getKeyCategory()
    const keyVariable = PropertiesTool.getKeyVariable()

    forEach(items?.value, (item, code) => {
      classItem[this.__getNameCode(theme, code)] = {
        value: `{${palette}.${code}}`,
        [keyCategory]: KEY_CATEGORY,
        [keyVariable]: 'var'
      }
    })
  }

  /**
   * Adding a default value
   *
   * Добавление значения по умолчанию
   * @param palette list of classes / список классов
   * @param classItem list of available values for the class / список доступных значений у класса
   * @param {string} theme the name of the theme / название темы
   * @private
   */
  __addDefault (palette, classItem, theme) {
    const defaultValue = this.__getDefaultValue(palette?.item, theme)

    if (
      defaultValue &&
      defaultValue in classItem
    ) {
      classItem['sys-palette'] = {
        ...classItem[this.__getNameCode(theme, defaultValue)],
        [PropertiesTool.getKeyName()]: 'sys-palette',
        [PropertiesTool.getKeyFull()]: true
      }
    }
  }

  /**
   * Checking the default value
   *
   * Проверка значения по умолчанию
   * @param {Object<string,string>|string} item the value to be checked / проверяемое значение
   * @param {string} theme the name of the theme / название темы
   * @return {string}
   * @private
   */
  __getDefaultValue (item, theme) {
    const keyDefault = PropertiesTool.getKeyDefault()

    if (keyDefault in item) {
      if (typeof item[keyDefault] === 'object') {
        return item[keyDefault]?.[theme]
      } else {
        return item[keyDefault]
      }
    }

    return undefined
  }
}
