import { ref, Ref, watchEffect } from 'vue'

import { ImageFile } from './ImageFile'
import { ImageIcon } from './ImageIcon'
import { ImageType } from './ImageType'

import { NumberOrStringType } from '../types'

export type ImageElementType = Ref<HTMLElement | undefined>
export type ImageValueType = Ref<string | File>
export type ImageOptionType = Ref<NumberOrStringType | undefined>

export interface ImageSizeType<T extends NumberOrStringType = number> {
  width: T
  height: T
}

// Parameters for the uploaded image or the one available by a direct link
// Параметры для загруженного изображения или доступного по прямой ссылке
export interface ImageItemType extends ImageSizeType {
  image: HTMLImageElement
  src: string
}

// Available data type for the image
// Доступный тип данных для изображения
export type ImageDataType = ImageItemType | string | undefined
export type ImageDataTypeFilled = ImageItemType | string

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
    protected readonly url?: Ref<string>
  ) {
    watchEffect(async () => (this.item.value = await this.update()))
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
          return ImageIcon.get(this.image.value, this.url?.value)
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
  getRef (): Ref<ImageDataType> {
    return this.item
  }
}
