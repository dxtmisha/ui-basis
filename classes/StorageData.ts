import { ref, Ref, watch } from 'vue'
import { Env } from './Env'
import { isNull } from '../functions/data'
import { AnyOrUndefinedType } from '../constructors/types'

export declare interface StorageItemType<T = any> {
  key: string
  item: Ref<T>
  date: number
}

export declare interface StorageType<T = any> {
  [key: string]: StorageItemType<T>
}

export const prefix = Env.prefix()
export const cacheAgeDefault = Env.cache()

/**
 * An object used for storing data
 *
 * Объект, используемый для хранения данных
 */
export class StorageData<T = any> {
  private readonly item = ref<AnyOrUndefinedType<T>>()
  private readonly date: number

  /**
   * @param key key / ключ
   * @param name group of records, from which we get data / группа записей, по которой
   * получаем данные
   * @param method class, with which we will work / класс, с которым будем работать
   */
  constructor (
    private readonly name: string,
    private readonly key: string,
    private readonly method?: Storage
  ) {
    const index = this.getIndex()

    if (objects.has(index)) {
      return objects.get(index)
    }
  }

  /**
   * Returns the index in the record
   *
   * Возвращает индекс в записи
   * @private
   */
  private getIndex (): string {
    return `${this.name}-${this.key}`
  }

  /**
   * Returns an index for a storage
   *
   * Возвращает индекс для хранилища
   * @private
   */
  private getStorageIndex (): string {
    return `${prefix}-${this.getIndex()}`
  }

  /**
   * Getting saved data
   *
   * Получение сохраненных данных
   * @param key key / ключ
   * @param name group of records, from which we get data / группа записей, по которой
   * получаем данные
   * @param method class, with which we will work / класс, с которым будем работать
   */
  static get (
    name: string,
    key: string,
    method?: Storage
  ): StorageItemType {
    const indexData = this.getIndex(name, key)

    if (!(indexData in this.data)) {
      const indexStorage = this.getStorageIndex(indexData)
      const data = this.getItem(
        key,
        method?.getItem(indexStorage)
      )

      this.data[indexData] = data

      if (method) {
        watch(data.item, value => {
          const date = new Date().getTime()

          if (isNull(value)) {
            method?.removeItem(indexStorage)
          } else {
            method?.setItem(indexStorage, JSON.stringify({
              key,
              item: value,
              date
            }))
          }

          data.date = date
        })
      }
    }

    return this.data[indexData]
  }

  /**
   * The method returns a new object for further processing
   *
   * Метод возвращает новый объект для дальнейшей работы
   * @param key key / ключ
   * @param item stored data / сохраненный данный
   * @private
   */
  private static getItem (key: string, item: any): StorageItemType {
    if (item) {
      try {
        const json = JSON.parse(item)

        return {
          ...json,
          item: ref(json.item)
        }
      } catch (e) {
      }
    }

    return {
      key,
      item: ref(undefined),
      date: new Date().getTime()
    }
  }

  private static initWatch (data: StorageItemType): void {
    watch(data.item, value => {
      const date = new Date().getTime()

      if (isNull(value)) {
        method?.removeItem(indexStorage)
      } else {
        method?.setItem(indexStorage, JSON.stringify({
          key,
          item: value,
          date
        }))
      }

      data.date = date
    })
  }
}

const data = new Map<string, StorageItemType>()
const objects = new Map<string, StorageData>()
