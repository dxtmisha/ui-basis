import { computed, Ref } from 'vue'

import { ImageAdaptive } from './ImageAdaptive'
import { ImageBackground } from './ImageBackground'
import { ImageCoordinator, ImageCoordinatorType } from './ImageCoordinator'
import { ImageData, ImageDataType, ImageElementType, ImageOptionType, ImageValueType } from './ImageData'
import { ImagePosition } from './ImagePosition'
import { ImageType } from './ImageType'

import { ClassesExtraListType } from '../../classes/DesignClasses'
import { StylesExtraListType } from '../../classes/DesignStyles'

/**
 * Base class for working with images and icons
 *
 * Базовый класс для работы с изображениями и иконками
 */
export class Image {
  protected type: ImageType

  protected data: ImageData
  protected background: ImageBackground

  protected coordinatorItem?: ImageCoordinator
  protected position?: ImagePosition
  protected adaptiveItem?: ImageAdaptive

  /**
   * Constructor
   * @param element image element for scaling / элемент изображения для масштабирования
   * @param image values from the image / значения из изображения
   * @param coordinator coordinates for margins / координаты для отступов
   * @param x coordinate of the picture on the left / координата картины слева
   * @param y coordinate of the picture on the top / координата картины сверху
   * @param size property determining the size of the picture / свойство определяющее размер картины
   * @param group group name / название группы
   * @param adaptive activity status / статус активности
   * @param adaptiveAlways does the element always participate / участвует ли элемент всегда
   * @param width physical width of the object / физическая ширина объекта
   * @param height physical height of the object / физическая высота объекта
   * @param url link to the folder with images / ссылка на папку с изображениями
   */
  constructor (
    protected readonly element: ImageElementType,
    protected readonly image: ImageValueType,
    url?: Ref<string>,
    size?: ImageOptionType,
    coordinator?: ImageCoordinatorType,
    x?: ImageOptionType,
    y?: ImageOptionType,
    group?: Ref<string>,
    adaptive?: Ref<boolean>,
    adaptiveAlways?: Ref<boolean>,
    width?: Ref<number>,
    height?: Ref<number>
  ) {
    this.type = new ImageType(image)
    this.data = new ImageData(
      this.type,
      this.image,
      url
    )

    if (coordinator) {
      this.coordinatorItem = new ImageCoordinator(coordinator)
    }

    if (x && y) {
      this.position = new ImagePosition(
        x,
        y,
        this.coordinatorItem
      )
    }

    if (
      group &&
      adaptive &&
      adaptiveAlways &&
      width &&
      height
    ) {
      this.adaptiveItem = new ImageAdaptive(
        this.element,
        this.data,
        group,
        adaptive,
        adaptiveAlways,
        width,
        height
      )
    }

    this.background = new ImageBackground(
      this.data,
      this.coordinatorItem,
      this.adaptiveItem,
      size
    )
  }

  /**
   * Destructor
   */
  destructor (): void {
    this.adaptiveItem?.remove()
  }

  /**
   * A method for obtaining an object with values for an image
   *
   * Метод для получения объекта с значениями для изображения
   */
  getDataImage (): Ref<ImageDataType> {
    return this.data.getRef()
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
  readonly classes = computed<ClassesExtraListType>(() => {
    const type = this.type.get()
    const data = {
      [`??type--${type}`]: type !== undefined,
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
  readonly styles = computed<StylesExtraListType>(() => {
    switch (this.type.get()) {
      case 'file':
      case 'image':
        return {
          'background-image': this.background.getImage(),
          'background-size': this.background.get(),
          'background-position-x': this.position?.getX() || 'center',
          'background-position-y': this.position?.getY() || 'center'
        }
      case 'public':
        return { 'mask-image': this.background.getImage() }
      case 'color':
        return { 'background-color': this.image.value } as StylesExtraListType
    }

    return {}
  })
}
