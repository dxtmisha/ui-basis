import { computed } from 'vue'

import {
  ImageTypeItemType,
  ImageTypeType,
  ImageValueType
} from './types'

/**
 * Class for working with the image type
 *
 * Класс для работы с типом изображения
 */
export class ImageType {
  /**
   * Constructor
   * @param image values from the image / значения из изображения
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly image: ImageValueType
  ) {
  }

  readonly item = computed(() => {
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
  }) as ImageTypeType

  /**
   * Returns the image type
   *
   * Возвращает тип изображения
   */
  get (): ImageTypeItemType | undefined {
    return this.item.value
  }

  /**
   * Returns the image type
   *
   * Возвращает тип изображения
   */
  getItem (): ImageTypeType {
    return this.item
  }
}
