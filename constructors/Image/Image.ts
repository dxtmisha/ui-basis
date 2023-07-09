import { computed, Ref } from 'vue'

import { ImageAdaptive } from './ImageAdaptive'
import { ImageBackground } from './ImageBackground'
import { ImageCoordinator } from './ImageCoordinator'
import { ImageData } from './ImageData'
import { ImagePosition } from './ImagePosition'
import { ImageType } from './ImageType'

import { ClassesExtraItemType } from '../../classes/DesignClasses'
import { StylesListType } from '../../classes/DesignStyles'

import {
  ImageCoordinatorType,
  ImageDataType,
  ImageElementType,
  ImageOptionType,
  ImageValueType
} from './types'

/**
 * Base class for working with images and icons
 *
 * Базовый класс для работы с изображениями и иконками
 */
export class Image {
  protected type: ImageType

  protected data: ImageData
  protected background: ImageBackground

  protected coordinatorItem: ImageCoordinator
  protected position: ImagePosition
  protected adaptiveItem: ImageAdaptive

  /**
   * Constructor
   * @param element image element for scaling / элемент изображения для масштабирования
   * @param className base name of the current class / базовое название текущего класса
   * @param image values from the image / значения из изображения
   * @param coordinator coordinates for margins / координаты для отступов
   * @param size property determining the size of the picture / свойство определяющее размер картины
   * @param x coordinate of the picture on the left / координата картины слева
   * @param y coordinate of the picture on the top / координата картины сверху
   * @param group group name / название группы
   * @param adaptive activity status / статус активности
   * @param adaptiveAlways does the element always participate / участвует ли элемент всегда
   * @param width physical width of the object / физическая ширина объекта
   * @param height physical height of the object / физическая высота объекта
   * @param url link to the folder with images / ссылка на папку с изображениями
   */
  constructor (
    protected readonly element: ImageElementType,
    protected readonly className: string,
    protected readonly image: ImageValueType,
    protected readonly coordinator: ImageCoordinatorType,
    protected readonly size: ImageOptionType,
    protected readonly x: ImageOptionType,
    protected readonly y: ImageOptionType,
    protected readonly group: Ref<string>,
    protected readonly adaptive: Ref<boolean>,
    protected readonly adaptiveAlways: Ref<boolean>,
    protected readonly width: Ref<number>,
    protected readonly height: Ref<number>,
    protected readonly url: Ref<string>
  ) {
    this.type = new ImageType(image)

    this.data = new ImageData(
      this.type,
      this.image,
      this.url
    )

    this.coordinatorItem = new ImageCoordinator(this.coordinator)
    this.position = new ImagePosition(
      this.coordinatorItem,
      this.x,
      this.y
    )

    this.adaptiveItem = new ImageAdaptive(
      this.element,
      this.data,
      this.group,
      this.adaptive,
      this.adaptiveAlways,
      this.width,
      this.height
    )

    this.background = new ImageBackground(
      this.data,
      this.coordinatorItem,
      this.adaptiveItem,
      this.size
    )
  }

  /**
   * Destructor
   */
  destructor (): void {
    this.adaptiveItem.remove()
  }

  /**
   * A method for obtaining an object with values for an image
   *
   * Метод для получения объекта с значениями для изображения
   */
  getDataImage (): Ref<ImageDataType> {
    return this.data.getItem()
  }

  /**
   * Values for the text
   *
   * Значения для текста
   */
  readonly text = computed<string | undefined>(() => {
    const image = this.image.value
    const type = this.type.get()

    if (
      type &&
      typeof image === 'string' &&
      [
        'filled',
        'outlined',
        'round',
        'sharp',
        'two-tone',
        'material'
      ].indexOf(type) !== -1
    ) {
      return image.replace(/^(filled|outlined|round|sharp|two-tone)-/, '')
    } else {
      return undefined
    }
  })

  /**
   * Values for the class
   *
   * Значения для класса
   */
  readonly classes = computed<ClassesExtraItemType>(() => {
    const type = this.type.get()
    const data = {
      [`${this.className}--type--${type}`]: type !== undefined,
      notranslate: true
    }

    switch (type) {
      case 'la':
      case 'lab':
        if (typeof this.image.value === 'string') {
          data[`lab ${this.image.value.replace('lab-', 'la-')}`] = true
        }

        break
      case 'filled':
      case 'outlined':
      case 'round':
      case 'sharp':
      case 'two-tone':
      case 'material':
        data['material-icons'] = true
        break
    }

    return data
  })

  /**
   * Values for the style
   *
   * Значения для стиля
   */
  readonly styles = computed<StylesListType>(() => {
    switch (this.type.get()) {
      case 'file':
      case 'image':
        return {
          'background-image': this.background.getImage(),
          'background-size': this.background.get(),
          'background-position-x': this.position.getX(),
          'background-position-y': this.position.getY()
        }
      case 'public':
        return { 'mask-image': this.background.getImage() }
      case 'color':
        return { 'background-color': this.image.value } as StylesListType
    }

    return {}
  })
}
