import { Ref, watch } from 'vue'

import { EventScroll } from '../../classes/EventScroll'

import { ImageAdaptiveItem } from './ImageAdaptiveItem'
import { ImageCalculationList } from './ImageCalculationList'

import {
  ImageElementType,
  ImageItemType
} from './types'

/**
 * Class for working with image scaling
 *
 * Класс для работы с масштабированием изображения
 */
export class ImageAdaptiveGroup {
  protected static objects: ImageAdaptiveItem[] = []
  protected static objectsAdaptive: ImageAdaptiveItem[] = []

  private static cache: string[] = []

  protected static event?: EventScroll
  protected static time?: number

  /**
   * Adding a new element for tracking
   *
   * Добавление нового элемента для отслеживания
   * @param element image element for scaling / элемент изображения для масштабирования
   * @param info basic information about the picture / базовая информация о картине
   * @param groupName group name / название группы
   * @param adaptive activity status / статус активности
   * @param width physical width of the object / физическая ширина объекта
   * @param height physical height of the object / физическая высота объекта
   */
  static add (
    element: ImageElementType,
    info: Ref<ImageItemType>,
    groupName: Ref<string>,
    adaptive: Ref<boolean>,
    width: Ref<number>,
    height: Ref<number>
  ): ImageAdaptiveItem {
    const object = new ImageAdaptiveItem(
      element,
      info,
      groupName,
      adaptive,
      width,
      height
    )

    this.objects.push(object)

    watch([
      element,
      info,
      groupName,
      adaptive,
      width,
      height
    ], () => this.init(), { immediate: true })

    return object
  }

  /**
   * Removal of the element
   *
   * Удаления элемента
   * @param element image element for scaling / элемент изображения для масштабирования
   */
  static remove (element: ImageElementType): void {
    const key = this.objects.findIndex(item => item.getElement() === element.value)

    if (key !== -1) {
      this.objects.splice(key, 1)
    }

    this.init()
  }

  /**
   * Starting or stopping tracking the image size
   *
   * Запуск или отключение слежения за размером изображения
   */
  static init (): void {
    if (
      this.event &&
      this.objects.length < 1
    ) {
      this.event.stop()
      this.event = undefined
    } else {
      this.event = new EventScroll(window, () => this.start())
        .go()

      requestAnimationFrame(() => this.start())
    }
  }

  /**
   * Method for checking the conditions for starting the update of parameters
   *
   * Метод проверки условий запуска обновления параметров
   * @protected
   */
  protected static start (): void {
    if (this.isAdaptive()) {
      this.updateAdaptive()

      const visible = this.updateVisible()

      if (this.isCache(visible)) {
        this.cache = visible

        this.updateSize()
        this.updatePercent()
        this.updateFactorMax()
      }
    } else {
      this.event?.stop()
    }
  }

  /**
   * Updates the list of active records
   *
   * Обновляет список активных записей
   * @protected
   */
  protected static updateAdaptive (): void {
    this.objectsAdaptive = []
    this.objects.forEach(item => {
      item.update()

      if (item.isBeyond()) {
        this.objectsAdaptive.push(item)
      }
    })
  }

  /**
   * Updates the list of visible values and returns this list
   *
   * Обновляет список видимых значений и возвращает этот список
   * @protected
   */
  protected static updateVisible (): string[] {
    const visible: string[] = []

    this.objectsAdaptive.forEach(item => {
      if (item.isVisible()) {
        visible.push(item.getId())
      }
    })

    return visible
  }

  /**
   * Updates the physical and virtual sizes
   *
   * Обновляет физические и виртуальные размеры
   * @protected
   */
  protected static updateSize (): void {
    ImageCalculationList.reset()

    this.objectsAdaptive.forEach(item => {
      const element = item.getElement()

      if (
        element &&
        item.isVisible()
      ) {
        ImageCalculationList.get(item.getGroup())
          .setWidth(item.getWidth())
          .setHeight(item.getHeight())
          .setOffsetWidth(element.offsetWidth)
          .setOffsetHeight(element.offsetHeight)
      }
    })
  }

  /**
   * Change of the output size
   *
   * Изменение выводимого размера
   * @protected
   */
  protected static updatePercent (): void {
    if (ImageCalculationList.isSize()) {
      this.objectsAdaptive.forEach(item => {
        const element = item.getElement()
        const calculation = ImageCalculationList.get(item.getGroup())

        if (element) {
          const width = calculation.getWidth()
          const height = calculation.getHeight()

          item.setPercent(
            item.getWidth() * (width ? 1 / width : 0) * (calculation.getOffsetWidth() / element.offsetWidth),
            item.getHeight() * (height ? 1 / height : 0) * (calculation.getOffsetHeight() / element.offsetHeight)
          )
        }
      })
    }
  }

  /**
   * Changes of the scaling value
   *
   * Изменения масштабирования значения
   * @protected
   */
  protected static updateFactorMax (): void {
    if (ImageCalculationList.isSize()) {
      this.objectsAdaptive.forEach(item => {
        if (item.isVisible()) {
          ImageCalculationList.get(item.getGroup())
            .setFactorMax(item.factor.value)
        }
      })
    }
  }

  /**
   * Checks if the composition of visible values has changed
   *
   * Проверяет, изменился ли состав видимых значений
   * @param visible list of indexes of visible values / список индексов видимых значений
   * @private
   */
  private static isCache (visible: string[]): boolean {
    return this.cache.join('|') !== visible.join('|')
  }

  /**
   * Checks if there is an active element at the moment
   *
   * Проверяет, есть ли в текущий момент активный элемент
   * @private
   */
  private static isAdaptive (): boolean {
    return !!this.objects.find(item => item.isAdaptive())
  }
}
