const PropertiesComponent = require('./PropertiesComponent')

/**
 * Class for creating a component or updating data
 *
 * Класс для создания компонента или обновления данных
 */
module.exports = class DesignComponent {
  /**
   * Constructor
   * @param {string} name component name / названия компонента
   * @param {{create:boolean, update:boolean}} options additional parameters / дополнительные параметры
   */
  constructor (
    name,
    options = {}
  ) {
    this.name = name
    this.options = options
    this.component = new PropertiesComponent(name)
  }

  init () {
    console.log('init', this.component.getByProps())
  }
}
