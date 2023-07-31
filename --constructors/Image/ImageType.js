'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImageType = void 0
const vue_1 = require('vue')
/**
 * Class for working with the image type
 *
 * Класс для работы с типом изображения
 */
class ImageType {
  image
  /**
     * Constructor
     * @param image values from the image / значения из изображения
     */
  // eslint-disable-next-line no-useless-constructor
  constructor (image) {
    this.image = image
  }

  item = (0, vue_1.computed)(() => {
    const image = this.image.value
    if (image) {
      if (image instanceof File) {
        return 'file'
      } else if (image.match(/\//)) {
        return 'image'
      } else if (image.match(/^#/)) {
        return 'color'
      } else if (image.match(/^@/)) {
        return 'public'
      } else {
        return image.match(/^(la|lab|filled|outlined|round|sharp|two-tone)-/)?.[1] || 'material'
      }
    } else {
      return undefined
    }
  })

  /**
     * Returns the image type
     *
     * Возвращает тип изображения
     */
  get () {
    return this.item.value
  }

  /**
     * Returns the image type
     *
     * Возвращает тип изображения
     */
  getItem () {
    return this.item
  }
}
exports.ImageType = ImageType
// # sourceMappingURL=ImageType.js.map
