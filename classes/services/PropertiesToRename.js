// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')

const FILE_CACHE_RENAME = 'properties-rename'

/**
 * Class for working with the property name
 *
 * Класс для работы с именем свойства
 */
module.exports = class PropertiesToRename {
  /**
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Adds the property name to the property
   *
   * Добавляет в свойство название свойства
   * @return {this}
   */
  to () {
    const key = PropertiesTool.getKeyName()
    const keyRename = PropertiesTool.getKeyRename()

    this.items.each(({
      item,
      name
    }) => {
      if (item?.[keyRename]) {
        item[key] = PropertiesTool.getName(item?.[keyRename])
      } else {
        item[key] = PropertiesTool.getName(name)
      }
    })

    this.items.cache(FILE_CACHE_RENAME)

    return this
  }
}
