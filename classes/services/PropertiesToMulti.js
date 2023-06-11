module.exports = class PropertiesToMulti {
  /**
   * @param {PropertiesItems} items
   */
  constructor (items) {
    this.items = items
  }

  to () {
    this.items.each(({ item }) => {
      // Close
    })
  }
}
