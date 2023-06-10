// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')

const FILE_CACHE_LINK = 'properties-link'

module.exports = class PropertiesToLink {
  /**
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  to () {
    const list = this.__getList()
    const designs = this.items.getDesigns()

    let max = 10
    let update = true

    while (update && max-- > 0) {
      update = false

      list.forEach(property => {
        console.log('value', PropertiesTool.toFull(
          property.item.value,
          property.design,
          property.component,
          designs
        ))

        if (!this.__is(property.item)) {
          update = true
        }
      })

      console.log('max', max)
    }

    this.items.cache(FILE_CACHE_LINK, list)
  }

  __is (properties) {
    return this.items.each(({
      item,
      name
    }) => {
      return item[PropertiesTool.getKeyVariable()] === 'link' ? name : undefined
    }, {}, properties).length > 0
  }

  /**
   * Returns a list of all links
   *
   * Возвращает список всех ссылок
   * @return {{item?: Object<string,*>, name?: string, design?: string, component?: string, properties?: Object<string,*>}[]}
   * @private
   */
  __getList () {
    return this.items.each((property) => {
      if (property.item[PropertiesTool.getKeyVariable()] === 'link') {
        return property
      } else {
        return undefined
      }
    })
  }
}
