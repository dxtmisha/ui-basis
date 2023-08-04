import { computed } from 'vue'

import { ImageCoordinator } from './ImageCoordinator'
import { ImageOptionType } from './ImageData'

/**
 * Class for working with position
 *
 * Класс для работы с позицией
 */
export class ImagePosition {
  /**
   * Constructor
   * @param x coordinate of the picture on the left / координата картины слева
   * @param y coordinate of the picture on the top / координата картины сверху
   * @param coordinator coordinates for margins / координаты для отступов
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly x: ImageOptionType,
    protected readonly y: ImageOptionType,
    protected readonly coordinator?: ImageCoordinator
  ) {
  }

  /**
   * The position of the picture is on the left
   *
   * Положение картины слева
   * @protected
   */
  protected readonly positionX = computed<string | null>(() => {
    if (this.coordinator?.is()) {
      return `${this.coordinator.getCoordinator()[3] + (this.coordinator.get().width / 2)}%`
    } else {
      return this.x.value?.toString() || null
    }
  })

  /**
   * The position of the picture is on the top
   *
   * Положение картины сверху
   * @protected
   */
  private readonly positionY = computed<string | null>(() => {
    if (this.coordinator?.is()) {
      return `${this.coordinator.getCoordinator()[0] + (this.coordinator.get().height / 2)}%`
    } else {
      return this.y.value?.toString() || null
    }
  })

  /**
   * Returns the position on the left
   *
   * Возвращает позицию слева
   */
  getX (): string | null {
    return this.positionX.value
  }

  /**
   * Returns the position on the top
   *
   * Возвращает позицию сверху
   */
  getY (): string | null {
    return this.positionY.value
  }
}
