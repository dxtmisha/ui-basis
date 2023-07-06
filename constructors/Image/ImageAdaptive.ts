import { Ref, watchEffect } from 'vue'

import { ImageAdaptiveGroup } from './ImageAdaptiveGroup'
import { ImageAdaptiveItem } from './ImageAdaptiveItem'
import { ImageData } from './ImageData'

import { ImageElementType, ImageItemType } from './types'

/**
 * Class for managing the scaling of the element. Class for the entry point
 *
 * Класс для управления масштабированием элемента. Класс для точки входа
 */
export class ImageAdaptive {
  private item?: ImageAdaptiveItem

  /**
   * Constructor
   * @param element image element for scaling / элемент изображения для масштабирования
   * @param data data management object / объект управления данными
   * @param groupName group name / название группы
   * @param adaptive activity status / статус активности
   * @param width physical width of the object / физическая ширина объекта
   * @param height physical height of the object / физическая высота объекта
   */
  constructor (
    protected readonly element: ImageElementType,
    protected readonly data: ImageData,
    protected readonly groupName: Ref<string>,
    protected readonly adaptive: Ref<boolean>,
    protected readonly width: Ref<number>,
    protected readonly height: Ref<number>
  ) {
    watchEffect(() => this.update())
  }

  /**
   * Checks if the element’s conditions are suitable for scaling
   *
   * Проверяет, подходить ли у элемента условия для масштабирования
   */
  is (): boolean {
    return this.adaptive.value && this.data.isImage()
  }

  /**
   * Returns the size for the background-size property
   *
   * Возвращает размер для свойства background-size
   */
  getSize (): string | null {
    return this.item?.backgroundSize.value || null
  }

  /**
   * Removal of the element for scaling
   *
   * Удаления элемента для масштабирования
   */
  remove (): void {
    ImageAdaptiveGroup.remove(this.element)
  }

  /**
   * Update of the element’s status
   *
   * Обновление статуса элемента
   * @private
   */
  private update (): void {
    this.remove()

    if (this.is()) {
      this.item = ImageAdaptiveGroup.add(
        this.element,
        this.data.getItem() as Ref<ImageItemType>,
        this.groupName,
        this.adaptive,
        this.width,
        this.height
      )
    }
  }
}
