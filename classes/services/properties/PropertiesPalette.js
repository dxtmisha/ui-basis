const { To } = require('../../To')
const {
  forEach,
  getColumn
} = require('../../../functions/data')

const Category = require('./PropertiesCategory')
const Keys = require('./PropertiesKeys')
const Type = require('./PropertiesType')

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
  }

  /**
   * Returns a list of available saturation levels
   *
   * Возвращает список доступных уровней насыщенности
   * @return {{design: string, value: string[]}[]}
   */
  getShade () {
    return forEach(
      this.items.findCategory(Category.shade), ({
        design,
        value
      }) => {
        return {
          design,
          value: getColumn(value, 'value')
        }
      })
  }

  /**
   * Getting a list of used values
   *
   * Получаем список использованных значений
   * @return {{name:string,value:string[]}[]}
   */
  getUsed () {
    const list = this.__getList()

    /**
     * @type {{name:string,value:string[]}[]}
     */
    const data = []

    this.items.each(({
      design,
      component,
      value,
      item,
      parents
    }) => {
      if (
        typeof value === 'string' &&
        item?.[Keys.variable] === Type.var &&
        item?.[Keys.category] !== Category.color &&
        list.indexOf(To.kebabCase(this.items.toFullLink(
          design,
          component,
          value
        ))) !== -1
      ) {
        const name = item?.[Keys.name]
        const code = data.find(code => code.name === name)
        const theme = parents.find(parent => parent.item[Keys.category] === 'theme')?.name || 'basic'
        const color = `--${design}-palette-${theme}-${value.match(/\.([^.{}]+)}/)?.[1]}`

        if (code) {
          code.value.push(color)
        } else {
          data.push({
            name,
            value: [color]
          })
        }
      }
    })

    return data
  }

  /**
   * Getting a list of all colors
   *
   * Получение списка всех цветов
   * @return {string[]}
   * @private
   */
  __getList () {
    return forEach(
      this.items.findCategory(Category.color),
      ({ value }) => value
    )
  }
}
