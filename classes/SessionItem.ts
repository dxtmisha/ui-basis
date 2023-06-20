import { StorageItemAbstract } from './StorageItemAbstract'

/**
 * Class for working with sessionStorage
 *
 * Класс для работы с sessionStorage
 */
export class SessionItem<T = any> extends StorageItemAbstract<T> {
  /**
   * Constructor
   * @param key key name / названия ключа
   * @param defaultValue default values / значения по умолчанию
   */
  constructor (key: string, defaultValue?: T | (() => T)) {
    super('session', key, defaultValue, window?.sessionStorage)
  }
}
