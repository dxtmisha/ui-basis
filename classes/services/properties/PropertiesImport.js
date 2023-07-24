const {
  isObject,
  forEach,
  replaceRecursive
} = require('../../../functions/data')

const PropertiesFiles = require('./PropertiesFiles')
const PropertiesTool = require('../PropertiesTool')

module.exports = class PropertiesImport {
  constructor (
    paths,
    properties
  ) {
    this.root = PropertiesFiles.getPathDir(paths)
    this.properties = properties
  }

  /**
   * Method that adds external files to the current property
   *
   * Метод подключает внешние файлы к текущему свойству
   *
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @param {string[]} root path to the directory / путь к директории
   * @return {void}
   */
  init (
    properties,
    root
  ) {
    const values = PropertiesTool.getValue(properties)

    if (isObject(values)) {
      const data = {}

      forEach(values, (item, name) => {
        if (this.__isFile(item, name)) {
          const path = this.__getPath(root, item)
          const read = this.__read(path)

          replaceRecursive(data, this.__toGo(read, path))
        } else {
          replaceRecursive(data, { [name]: this.__toGo(item, root) })
        }
      })

      return PropertiesTool.getPropertiesByValue(properties, data)
    } else {
      return properties
    }
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
    return name.match(/^file\|/i) || (
      isObject(item) &&
      item?.[PropertiesTool.getKeyVariable()] === 'file'
    )
  }
}
