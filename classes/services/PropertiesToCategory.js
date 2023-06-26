const PropertiesTool = require('./PropertiesTool')

const FILE_CACHE_CATEGORY_CLASS = 'properties-category-class'

/**
 * Class for working with product categories
 *
 * Класс для работы с категориями продуктов
 */
module.exports = class PropertiesToCategory {
  /**
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Category processing method in a class
   *
   * Метод обработки категорий в классе
   */
  toByClass () {
    const key = PropertiesTool.getKeyCategory()

    this.items.each(({
      item,
      properties
    }) => {
      if (
        typeof item?.value === 'object' && (
          properties?.[key] === 'class' ||
          properties?.[key] === 'class-state'
        )
      ) {
        item[key] = 'class-state'
      }
    })

    this.items.cache(FILE_CACHE_CATEGORY_CLASS)
  }
}
