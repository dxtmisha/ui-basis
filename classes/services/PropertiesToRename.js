const { forEach } = require('../../functions/data')

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
    const keyVariable = PropertiesTool.getKeyVariable()

    this.items.each(({
      item,
      name,
      parents
    }) => {
      switch (item?.[keyVariable]) {
        case 'var':
          item[key] = this.__toNameForVar(parents, item, name)
          break
        default:
          item[key] = this.__getName(item, name)
          break
      }
    })

    this.items.cache(FILE_CACHE_RENAME)

    return this
  }

  /**
   * Returns the standard name
   *
   * Возвращает стандартное имя
   * @param {Object<string,*>} item Object for checking / Объект для проверки
   * @param {string} name Name of the name / Название имени
   * @return {string}
   * @private
   */
  __getName (item, name) {
    const keyRename = PropertiesTool.getKeyRename()

    if (item?.[keyRename]) {
      return PropertiesTool.getName(item?.[keyRename])
    } else {
      return PropertiesTool.getName(name)
    }
  }

  /**
   * Returns ancestor names
   *
   * Возвращает имена предков
   * @param {Object<string,*>} parents
   * @return {string[]}
   * @private
   */
  __getParentsName (parents) {
    return forEach(parents, parent => this.__getName(parent.items, parent.name))
  }

  /**
   * Name transformation for the var type
   *
   * Преобразование имени для типа var
   * @param {Object<string,*>} parents
   * @param {Object<string,*>} item
   * @param {string} name
   * @return {string}
   * @private
   */
  __toNameForVar (parents, item, name) {
    const value = this.__getName(item, name)

    if (item?.[PropertiesTool.getKeyFull()]) {
      return `--${value}`
    } else {
      return `--${this.__getParentsName(parents).join('-')}-${this.__getName(item, name)}`
    }
  }
}
