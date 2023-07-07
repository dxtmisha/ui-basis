'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImageData = void 0
const vue_1 = require('vue')
const ImageFile_1 = require('./ImageFile')
const ImageIcon_1 = require('./ImageIcon')
/**
 * Class for working and processing the image
 *
 * Класс для работы и обработки изображения
 */
class ImageData {
  type
  image
  url
  item = (0, vue_1.ref)()
  /**
     * Constructor
     * @param type image type / тип изображения
     * @param image values from the image / значения из изображения
     * @param url link to the folder with images / ссылка на папку с изображениями
     */
  constructor (type, image, url) {
    this.type = type
    this.image = image
    this.url = url;
    (0, vue_1.watchEffect)(async () => {
      this.item.value = await this.update()
    })
  }

  /**
     * Data update
     *
     * Обновление данных
     * @protected
     */
  async update () {
    switch (this.type.get()) {
      case 'image':
      case 'file':
        return await ImageFile_1.ImageFile.createImage(this.image.value)
      case 'public':
        if (typeof this.image.value === 'string') {
          return ImageIcon_1.ImageIcon.get(this.image.value, this.url.value)
        }
        break
    }
    return undefined
  }

  /**
     * Checks if there are values
     *
     * Проверяет, есть ли значения
     */
  is () {
    return this.item.value !== undefined
  }

  /**
     * Checks if the value is a link, that is, a type of string
     *
     * Проверяет, является ли значение ссылкой, то есть видом строки
     */
  isLink () {
    return this.is() && typeof this.item.value === 'string'
  }

  /**
     * Checks if the value is an image object
     *
     * Проверяет, является ли значение объектом изображения
     */
  isImage () {
    return this.is() && typeof this.item.value !== 'string'
  }

  /**
     * Returns images
     *
     * Возвращает изображения
     */
  get () {
    return this.item.value
  }

  /**
     * Returns images
     *
     * Возвращает изображения
     */
  getItem () {
    return this.item
  }
}
exports.ImageData = ImageData
// # sourceMappingURL=ImageData.js.map
