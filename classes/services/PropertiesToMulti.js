// const PropertiesItems = require('./PropertiesItems')
const PropertiesTool = require('./PropertiesTool')
const { forEach } = require('../../functions/data')

const FILE_CACHE_MULTI = 'properties-multi'

module.exports = class PropertiesToMulti {
  /**
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  to () {
    const key = PropertiesTool.getKeyVariable()

    this.items.each(({
      item,
      name
    }) => {
      if (
        item?.[key] === 'property' &&
        typeof item?.value === 'object'
      ) {
        this.__toGo(name, item.value)
      }
    })

    this.items.cache(FILE_CACHE_MULTI)
  }

  __toGo (name, properties) {
    forEach(properties, item => {
      if (
        typeof item?.value !== 'object'
      ) {
        item.value = {
          [name]: {
            value: item.value,
            [PropertiesTool.getKeyName()]: name,
            [PropertiesTool.getKeyVariable()]: 'property'
          }
        }
      }
    })
  }
}
