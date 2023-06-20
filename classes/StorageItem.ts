import { StorageItemAbstract } from './StorageItemAbstract'

/**
 * Class for working with localStorage
 *
 * Класс для работы с localStorage
 */
export class StorageItem<T = any> extends StorageItemAbstract<T> {
  /**
   * Constructor
   * @param key key name / названия ключа
   * @param defaultValue default values / значения по умолчанию
   */
  constructor (key: string, defaultValue?: T | (() => T)) {
    super('local', key, defaultValue, window?.localStorage)
  }
}
