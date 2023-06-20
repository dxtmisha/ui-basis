import { ref, Ref, watch } from 'vue'
import { forEach, isFilled } from '../functions/data'

export type HashItemType = Ref<string>

/**
 * Class for managing hash strings
 *
 * Класс для управления hash-строкой
 */
export class HashCollect {
  public static readonly data = new Map<string, HashItemType>()

  /**
   * Getting a value by its key
   *
   * Получение значения по его ключу
   * @param key key name / названия ключа
   */
  static get (key: string): HashItemType {
    return this.data.has(key) ? (this.data.get(key) as HashItemType) : this.newItem(key)
  }

  /**
   * Changing a value by its key
   *
   * Изменение значения по его ключу
   * @param key key name / названия ключа
   * @param value new values / новые значения
   */
  static set (key: string, value?: string) {
    if (value) {
      if (this.data.has(key)) {
        this.get(key).value = value
      } else {
        this.newItem(key, value)
        this.collect()
      }
    } else {
      this.remove(key)
    }
  }

  /**
   * Deleting a record
   *
   * Удаление записи
   * @param key key name / названия ключа
   */
  static remove (key: string) {
    if (this.data.has(key)) {
      this.data.delete(key)
      this.collect()
    }
  }

  /**
   * Creating a new entry in a Map
   *
   * Создание новой записи в Map
   * @param key key name / названия ключа
   * @param value new values / новые значения
   * @private
   */
  private static newItem (key: string, value?: string): HashItemType {
    const item = ref<string>(value || '')

    this.data.set(key, item)
    watch(item, () => this.collect())

    return item
  }

  /**
   * Обновления данных в хеш
   *
   * Обновления данный в hash
   * @protected
   */
  static collect () {
    const hash = forEach<HashItemType, string, string>(this.data,
      (item, key) => isFilled(item.value) ? `${key}=${encodeURIComponent(item.value)}` : ''
    )

    if (hash) {
      hash.sort()
      history.replaceState(null, '', `#${hash.join(';')}`)
    }
  }

  /**
   * Translation: "Processing a hash string to obtain data
   *
   * Обработка строки hash для получения данных
   */
  static init () {
    location.hash.replace(
      /([\w-]+)[:=]([^;]+)/ig,
      (
        all: string,
        key: string,
        value: string
      ) => {
        this.newItem(key, value)
        return ''
      }
    )
  }

  static {
    this.init()
  }
}
