import { ref, Ref, watchEffect } from 'vue'

import { ImageFile } from './ImageFile'
import { ImageIcon } from './ImageIcon'
import { ImageType } from './ImageType'

import {
  ImageDataType,
  ImageDataTypeFilled,
  ImageItemType,
  ImageValueType
} from './types'

/**
 * Class for working and processing the image
 *
 * Класс для работы и обработки изображения
 */
export class ImageData {
  protected readonly item = ref<ImageDataType>()

  /**
   * Constructor
   * @param type image type / тип изображения
   * @param image values from the image / значения из изображения
   * @param url link to the folder with images / ссылка на папку с изображениями
   */
  constructor (
    protected readonly type: ImageType,
    protected readonly image: ImageValueType,
    protected readonly url: Ref<string>
  ) {
    watchEffect(async () => {
      this.item.value = await this.update()
    })
  }

  /**
   * Data update
   *
   * Обновление данных
   * @protected
   */
  protected async update (): Promise<ImageDataType> {
    switch (this.type.get()) {
      case 'image':
      case 'file':
        return await ImageFile.createImage(this.image.value)
      case 'public':
        if (typeof this.image.value === 'string') {
          return ImageIcon.get(this.image.value, this.url.value)
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
  is (): this is { item: Ref<ImageDataTypeFilled> } {
    return this.item.value !== undefined
  }

  /**
   * Checks if the value is a link, that is, a type of string
   *
   * Проверяет, является ли значение ссылкой, то есть видом строки
   */
  isLink (): this is { item: Ref<string> } {
    return this.is() && typeof this.item.value === 'string'
  }

  /**
   * Checks if the value is an image object
   *
   * Проверяет, является ли значение объектом изображения
   */
  isImage (): this is { item: Ref<ImageItemType> } {
    return this.is() && typeof this.item.value !== 'string'
  }

  /**
   * Returns images
   *
   * Возвращает изображения
   */
  get (): ImageDataType {
    return this.item.value
  }

  /**
   * Returns images
   *
   * Возвращает изображения
   */
  getItem (): Ref<ImageDataType> {
    return this.item
  }
}
