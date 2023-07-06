import { ImageData } from './ImageData'

import { NumberOrStringType } from '../types'

/**
 * Class for generating a link in the background-image property
 *
 * Класс для генерации ссылки в свойстве background-image
 */
export class ImageBackground {
  /**
   * Constructor
   * @param data object for working with values / объект для работы со значениями
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly data: ImageData
  ) {
  }

  /**
   * Returns a string value for the background-image property
   *
   * Возвращает строку значения для свойства background-image
   */
  getImage () {
    const image = this.data.get()

    switch (typeof image) {
      case 'string':
        return `url("${image}")`
      case 'object':
        return `url("${image.src}")`
      default:
        return null
    }
  }

  /**
   * Returns a formatted value for the background-size property
   *
   * Возвращает отформатированное значение для свойства background-size
   * @param width width value / значение ширины
   * @param height height value / значение высоты
   */
  getSize (
    width: NumberOrStringType,
    height: NumberOrStringType
  ): string | undefined {
    const image = this.data.get()

    if (typeof image === 'object') {
      return image.height < image.width ? `auto ${height}` : `${width} auto`
    } else {
      return undefined
    }
  }
}
