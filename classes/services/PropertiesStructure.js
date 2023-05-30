const PropertiesCache = require('./PropertiesCache')
const PropertiesFiles = require('./PropertiesFiles')

const FILE_NAME = 'properties.json'

module.exports = class PropertiesStructure {
  constructor (designs, cache = true) {
    this.designs = designs
    this.cache = cache
  }

  /**
   * Возвращает полную ссылку на директорию дизайна
   *
   * Returns the full link to the design directory
   * @returns {{design:string,paths:string[]}[]}
   */
  getFullPath () {
    if (Array.isArray(this.designs)) {
      const designs = []

      this.designs.forEach(design => {
        designs.push({
          design,
          paths: [
            [__dirname, '..', '..', design],
            [__dirname, '..', '..', '..', '..', design]
          ]
        })
      })

      return designs
    } else {
      return []
    }
  }

  getComponentsName () {
    const list = this.getFullPath()
    const data = []

    list.forEach(item => {
      item.paths.forEach(path => {
        const dirs = PropertiesFiles.readDir(path)

        dirs.forEach(dir => {
          if (PropertiesFiles.isDir(dir)) {
            data.push(this.getComponentInfo(path, dir))
          }
        })
      })
    })

    if (this.cache) {
      PropertiesCache.createFile([], 'component-name', data)
    }

    return data
  }

  /**
   * Getting data
   *
   * Получение данных
   * @param {string} paths
   * @param {string} name
   * @return {{path: string, name}}
   */
  getComponentInfo (paths, name) {
    const path = PropertiesFiles.joinPath([...paths, name])

    return {
      name,
      path,
      isProperty: PropertiesFiles.is([path, FILE_NAME])
    }
  }
}
