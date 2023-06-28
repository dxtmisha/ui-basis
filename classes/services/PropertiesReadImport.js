const {
  forEach
} = require('../../functions/data')

const PropertiesTool = require('./PropertiesTool')

module.exports = class PropertiesReadImport {
  paths

  /**
   * Changes the path to the file
   *
   * Изменяет путь к файлу
   * @param {string[]} paths path to the directory / путь к директории
   * @return {this}
   */
  setPaths (paths) {
    this.paths = paths
    return this
  }

  /**
   *
   * @param {string[]} paths path to the directory / путь к директории
   * @param {Object<string,*>} properties array with all property records / массив со всеми записями свойств
   * @return {{}}
   */
  to (paths, properties) {
    return this
      .setPaths(paths)
      .__toGo(properties)
  }

  __toGo (properties) {
    const data = {}

    forEach(properties?.value, (item, name) => {
      if (this.__isFile(item, name)) {
        // TODO
      } else if (typeof item === 'object') {
        data[name] = this.__toGo(item)
      } else {
        data[name] = item
      }
    })

    properties.value = data
    return properties
  }

  /**
   * Checks whether a property is a link to a file
   *
   * Проверяет, является ли свойство ссылкой на файл
   * @param {Object<string,*>|string} item object with data / объект с данными
   * @param {string} name key name / название ключа
   * @private
   */
  __isFile (item, name) {
    return name.match(/^file|/) || (
      typeof item === 'object' &&
      item?.[PropertiesTool.getKeyVariable()] === 'file'
    )
  }
}
