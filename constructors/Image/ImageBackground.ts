import { computed } from 'vue'
import { isFilled } from '../../functions/data'

import { ImageAdaptive } from './ImageAdaptive'
import { ImageCoordinator } from './ImageCoordinator'
import { ImageData, ImageOptionType } from './ImageData'

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
   * @param coordinator object for working with coordinates / объект для работы с координатами
   * @param adaptive an object for working with adaptive layout / объект для работы с adaptive
   * @param size property determining the size of the picture / свойство определяющее размер картины
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly data: ImageData,
    protected readonly coordinator?: ImageCoordinator,
    protected readonly adaptive?: ImageAdaptive,
    protected readonly size?: ImageOptionType
  ) {
  }

  /**
   * Values for the background property
   *
   * Значения для свойства background
   * @private
   */
  private readonly item = computed<string | null>(() => {
    if (this.coordinator?.is()) {
      return this.getSizeByCoordinator()
    } else if (this.adaptive?.is()) {
      return this.adaptive?.getSize() || this.getSizeForItem()
    } else {
      return this.getSizeForItem()
    }
  })

  /**
   * Returns values for the background property
   *
   * Возвращает значения для свойства background
   */
  get () {
    return this.item.value
  }

  /**
   * Returns values for the background property
   *
   * Возвращает значения для свойства background
   */
  getRef () {
    return this.item
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
  protected getSize (
    width: NumberOrStringType,
    height: NumberOrStringType
  ): string | null {
    const image = this.data.get()

    if (typeof image === 'object') {
      return image.height < image.width ? `auto ${height}` : `${width} auto`
    } else {
      return null
    }
  }

  /**
   * Returns sizes according to the coordinator property
   *
   * Возвращает размеры по свойству координатора
   * @protected
   */
  protected getSizeByCoordinator () {
    if (this.coordinator) {
      const {
        width,
        height
      } = this.coordinator.getSize()

      return this.getSize(width, height)
    } else {
      return null
    }
  }

  /**
   * Returns the sizes for the value
   *
   * Возвращает размеры для значения
   * @protected
   */
  protected getSizeForItem (): string | null {
    const size = this.size?.value

    if (size && isFilled(size)) {
      return size.toString().match(/%$/) ? this.getSize(size, size) : size.toString()
    } else {
      return null
    }
  }
}
