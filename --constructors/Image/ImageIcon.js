'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImageIcon = void 0
const data_1 = require('../../functions/data')
/**
 * Class for managing icons
 *
 * Класс для управления иконками
 */
class ImageIcon {
  static icons = {}
  /**
     * Returns the icon by the name
     *
     * Возвращает иконку по названию
     * @param index icon name / название иконки
     * @param url path to the storage location of the icon, if the icon does
     * not exist / путь к месту хранения иконки, если иконка не существует
     */
  static get (index, url = '') {
    return this.icons?.[index] || index.replace(/^@/, url) + '.svg'
  }

  /**
     * Adding custom icons
     *
     * Добавление пользовательских иконок
     * @param index icon name / название иконки
     * @param file path to the file / путь к файлу
     */
  static add (index, file) {
    this.icons[`@${index}`] = file
  }

  /**
     * Adding an icon by the list
     *
     * Добавление иконки по списку
     * @param list список иконки
     */
  static addByList (list) {
    (0, data_1.forEach)(list, (file, index) => this.add(index, file))
  }
}
exports.ImageIcon = ImageIcon
// # sourceMappingURL=ImageIcon.js.map
