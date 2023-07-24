const {
  isFilled,
  isObject,
  forEach,
  replaceRecursive
} = require('../../../functions/data')

const Files = require('./PropertiesFiles')
const Cache = require('./PropertiesCache')
const Keys = require('./PropertiesKeys')
const Standard = require('./PropertiesStandard')

/**
 * Class for working with external files, which adds them to the current list of properties
 *
 * Класс для работы с внешними файлами, который подключает их к текущему списку свойств
 */
module.exports = class PropertiesImport {
  /**
   * Constructor
   * @param {Object<string,*>} properties array with all property records / массив со всеми записями свойств
   * @param {string[]} paths path to the directory / путь к директории
   */
  constructor (
    properties,
    paths
  ) {
    this.properties = properties
    this.root = [Files.getPathDir(paths)]
  }

  /**
   * Method that adds external files to the current property
   *
   * Метод подключает внешние файлы к текущему свойству
   * @param {Object<string,*>} properties An array that needs to be
   * transformed / Массив, который нужно преобразовать
   * @param {string[]} root path to the directory / путь к директории
   * @return {Object<string,*>}
   */
  to (
    properties = this.properties,
    root = this.root
  ) {
    const data = {}

    forEach(properties, (item, name) => {
      if (
        item?.[Keys.type] === 'file' &&
        item?.value
      ) {
        const path = this.__getPath(root, item)
        const read = this.__read(path)

        if (isFilled(read)) {
          replaceRecursive(
            data,
            this.to(
              Standard.to(read),
              [Files.getPathDir(path)]
            )
          )
        }
      } else if (
        isFilled(item?.value) &&
        isObject(item?.value)
      ) {
        replaceRecursive(data, { [name]: { value: this.to(item.value, root) } })
      } else {
        data[name] = item
      }
    })

    return data
  }

  /**
   * Returns the path to the file
   *
   * Возвращает путь к файлу
   * @param {string[]} root path to the directory / путь к директории
   * @param {{value: string}} item object with data / объект с данными
   * @return {string[]}
   * @private
   */
  __getPath (root, item) {
    return [
      ...root,
      ...item.value.split('/')
    ]
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
    if (Files.isDir(path)) {
      return this.__readByDir(path)
    } else {
      return Cache.read(path)
    }
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
    const files = Files.readDir(path)
    const data = {}

    files?.sort()
    files?.forEach(file => {
      const parse = Files.parse(file)

      if (parse.ext === '.json') {
        data[parse.name] = Cache.read([...path, file])
      }
    })

    return data
  }
}
