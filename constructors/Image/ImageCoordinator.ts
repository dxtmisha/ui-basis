import { computed, Ref } from 'vue'

import { ImageSizeType } from './ImageData'

// Supported format for photo cropping of the image
// Поддерживаемый формат для фото обрезки изображения
export type ImageCoordinatorType = Ref<
  [number] |
  [number, number] |
  [number, number, number] |
  [number, number, number, number] |
  undefined
>

/**
 * Class for working with coordinates
 *
 * Класс для работы с координатами
 */
export class ImageCoordinator {
  /**
   * Constructor
   * @param coordinator coordinates for margins / координаты для отступов
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly coordinator: ImageCoordinatorType
  ) {
  }

  /**
   * Size for the picture
   *
   * Размер для картины
   * @protected
   */
  protected readonly item = computed<ImageSizeType>(() => {
    const coordinator = this.getCoordinator()

    return {
      width: 100 - coordinator[1] - coordinator[3],
      height: 100 - coordinator[2] - coordinator[0]
    }
  })

  /**
   * Checking for availability of coordinates
   *
   * Проверка на доступность координат
   */
  is () {
    return Array.isArray(this.coordinator.value) &&
      this.coordinator.value.length > 0 &&
      this.coordinator.value.length < 5
  }

  /**
   * Returns sizes by the input parameter of coordinates
   *
   * Возвращает размеры по входному параметру координаты
   */
  get (): ImageSizeType {
    return this.item.value
  }

  /**
   * Returns sizes by the input parameter of coordinates
   *
   * Возвращает размеры по входному параметру координаты
   */
  getRef (): Ref<ImageSizeType> {
    return this.item
  }

  /**
   * Returns coordinates
   *
   * Возвращает координаты
   */
  getCoordinator (): [number, number, number, number] {
    if (this.coordinator.value) {
      const coordinator: number[] = Array.isArray(this.coordinator.value)
        ? this.coordinator.value
        : Object.values(this.coordinator.value)

      switch (coordinator.length) {
        case 1:
          return [
            coordinator[0],
            coordinator[0],
            coordinator[0],
            coordinator[0]
          ]
        case 2:
          return [
            coordinator[0],
            coordinator[1],
            coordinator[0],
            coordinator[1]
          ]

        case 3:
          return [
            coordinator[0],
            coordinator[1],
            coordinator[2],
            coordinator[1]
          ]
        case 4:
          return coordinator as [number, number, number, number]
      }
    }

    return [0, 0, 0, 0]
  }

  /**
   * Getting the adapted size for the property
   *
   * Получение адаптированного размера для свойства
   */
  getSize (): ImageSizeType<string> {
    return {
      width: `${100 / this.get().width * 100}%`,
      height: `${100 / this.get().height * 100}%`
    }
  }
}
