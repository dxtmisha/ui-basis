const {
  forEach,
  isObject,
  replaceRecursive
} = require('../../functions/data')

const PropertiesFiles = require('./properties/PropertiesFiles')
const PropertiesTool = require('./PropertiesTool')

/**
 * Class for working with external files, which adds them to the current list of properties
 *
 * Класс для работы с внешними файлами, который подключает их к текущему списку свойств
 */
module.exports = class PropertiesReadImport {
  /**
   *
   * @param {string[]} paths path to the directory / путь к директории
   * @param {Object<string,*>} properties array with all property records / массив со всеми записями свойств
   * @return {{}}
   */
  to (paths, properties) {
    paths.pop()

    return this.__toGo(properties, paths)
  }

  /**
   * Method that adds external files to the current property
   *
   * Метод подключает внешние файлы к текущему свойству
   *
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @param {string[]} root path to the directory / путь к директории
   * @return {*}
   * @private
   */
  __toGo (
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

  /**
   * Returns the path to the file
   *
   * Возвращает путь к файлу
   * @param {string[]} root base path to the readable file / базовый путь к читаемому файлу
   * @param {Object<string,*>|string} item object with data / объект с данными
   * @return {string[]}
   * @private
   */
  __getPath (root, item) {
    const path = PropertiesTool.getValue(item)?.split('/')

    return [...root, ...path]
  }

  /**
   * Reads a file or an entire directory
   *
   * Читает файл или всю директорию
   * @param {string[]} path path to file / путь к файлу
   * @return {Object<string, *>}
   * @private
   */
  __read (path) {
    if (PropertiesFiles.isDir(path)) {
      return this.__readByDir(path)
    } else {
      const data = this.__readByFile(path)

      path.pop()
      return data
    }
  }

  /**
   * Reads a file
   *
   * Читает файл
   * @param {string[]} path path to file / путь к файлу
   * @return {Object<string, *>}
   * @private
   */
  __readByFile (path) {
    return PropertiesFiles.readFile(path)
  }

  /**
   * Reads a directory
   *
   * Читает директорию
   * @param {string[]} path path to file / путь к файлу
   * @return {Object<string, *>}
   * @private
   */
  __readByDir (path) {
    const files = PropertiesFiles.readDir(path)
    const data = {}

    files?.sort()
    files?.forEach(fileName => {
      const parse = PropertiesFiles.parse(fileName)

      if (parse.ext === '.json') {
        data[parse.name] = this.__readByFile([...path, fileName])
      }
    })

    return data
  }
}
