import { ImageCalculation } from './ImageCalculation'

/**
 * Class for managing all ImageCalculation objects
 *
 * Класс для управления всеми объектами ImageCalculation
 */
export class ImageCalculationList {
  protected static items: ImageCalculation[] = []

  /**
   * Если у элемента есть размер
   *
   * If the element has a size
   */
  static isSize (): boolean {
    return this.items.find(item => item.isSize()) !== undefined
  }

  /**
   * Returning an object for calculation by its name
   *
   * Возвращение объекта для вычисления по его имени
   * @param name group name / название группы
   */
  static get (name: string): ImageCalculation {
    return this.find(name) || this.init(name)
  }

  /**
   * Updating all records for all groups
   *
   * Обновление всех записей у всех групп
   */
  static reset () {
    this.items.forEach(item => item.reset())
  }

  /**
   * Поиск значения по названия группа
   * @param name group name / название группы
   */
  protected static find (name: string): ImageCalculation | undefined {
    return this.items.find(item => item.is(name))
  }

  /**
   * Creating a new object
   *
   * Создание нового объекта
   * @param name group name / название группы
   * @protected
   */
  protected static init (name: string): ImageCalculation {
    const item = new ImageCalculation(name)

    this.items.push(item)
    return item
  }
}
