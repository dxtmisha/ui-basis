const PropertiesTool = require('./PropertiesTool')

/**
 * A class for working with properties that support additional values
 *
 * Класс для работы со свойствами с поддержкой дополнительных значений
 */
module.exports = class PropertiesToStyle {
  /**
   * Constructor
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  /**
   * Handling a style record
   *
   * Обработка записи стиля
   */
  to () {
    const key = PropertiesTool.getKeyStyle()
    const keyName = PropertiesTool.getKeyName()
    const keyVariable = PropertiesTool.getKeyVariable()
    const designs = this.items.getDesigns()

    this.items.each(({
      item,
      name,
      design,
      component
    }) => {
      if (
        item?.[key] &&
        !item?.value?.custom
      ) {
        item[keyVariable] = 'state'
        item.value.custom = {
          value: {
            [name]: {
              value: PropertiesTool.toFull(`{??sys.${name}}`, design, component, designs),
              [keyName]: name,
              [keyVariable]: 'property'
            }
          },
          [keyVariable]: 'state'
        }
      }
    })
  }
}
