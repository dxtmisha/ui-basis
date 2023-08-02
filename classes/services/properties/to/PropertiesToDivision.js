const Cache = require('../PropertiesCache')
const Keys = require('../PropertiesKeys')
const Type = require('../PropertiesType')

/**
 * A class for splitting components into different files
 *
 * Класс для разделения компонентов на разные файлы
 */
module.exports = class PropertiesToDivision {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Processes the data of the component and splits it into files
   *
   * Обрабатывает данные компонента и разделяет его на файлы
   */
  to () {
    this.items.findVariable(Type.component)
      .forEach(property => {
        const {
          design,
          component,
          name,
          item,
          index
        } = property

        Cache.createComponents(item?.[Keys.name] || name, {
          design,
          component,
          name,
          item,
          index
        })
      })
  }
}
