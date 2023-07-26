/**
 * Class with a list of available categories
 *
 * Класс со списком доступных категорий
 */
module.exports = class PropertiesCategory {
  /**
   * Such category will be treated as a global variable
   *
   * Такая категория будет обрабатываться как глобальная переменная
   * @type {string}
   */
  static root = 'root'

  static theme = 'theme'
  static palette = 'palette'
  static shade = 'shade'
}
