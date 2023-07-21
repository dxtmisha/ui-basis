import { executeFunction } from '../functions/data'

/**
 * Class for working with fast cache during code execution
 *
 * Класс для работы с быстрым кэшем во время выполнения кода
 */
export class CacheLive {
  private static data: Record<string, any> = {}

  /**
   * Getting data for the cache, and if there is no cache, it performs a function to save the cache
   *
   * Получение данных для кэша, и если нет кэша, выполняет функцию для сохранения кэша
   * @param name cache name / название кэша
   * @param callback function for the cache / функция для кэша
   */
  static get (name: string, callback: () => any) {
    if (!(name in this.data)) {
      this.set(name, callback)
    }

    return this.data[name]
  }

  /**
   * Overwrites or adds new values for the cache
   *
   * Перезаписывает или добавляет новые значения для кэша
   * @param name cache name / название кэша
   * @param valueCallback if you pass a function, it will execute when there is no value
   * and save the values / если вы передадите функцию, она выполнится при отсутствии
   * значения и сохранит значения
   */
  static set (name: string, valueCallback: any | (() => any)) {
    this.data[name] = executeFunction(valueCallback)
  }
}
