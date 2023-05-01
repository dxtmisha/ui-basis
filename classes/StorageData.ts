import { ref, watch } from 'vue'
import { isNull } from '../functions/data'

import { Env } from './Env'

import { AnyOrUndefinedType } from '../constructors/types'

export interface StorageItemType<T = any> {
  item: AnyOrUndefinedType<T>
  date: number
}

export const prefix = Env.prefix()
export const cacheAgeDefault = Env.cache()

/**
 * An object used for storing data
 *
 * Объект, используемый для хранения данных
 */
export class StorageData<T = any> {
  /**
   * Storage index
   *
   * Хранилище индексов
   * @private
   */
  private readonly index: string

  private readonly item = ref<AnyOrUndefinedType<T>>()
  private date?: number

  /**
   * @param key key / ключ
   * @param name group of records, from which we get data / группа записей, по которой
   * получаем данные
   * @param method class, with which we will work / класс, с которым будем работать
   */
  constructor (
    name: string,
    key: string,
    private readonly method?: Storage
  ) {
    this.index = `${prefix}-${name}-${key}`

    if (objects.has(this.index)) {
      return objects.get(this.index) as StorageData<T>
    } else {
      const item = this.getItem()

      this.item.value = item.item
      this.date = item.date

      this.watch()
      objects.set(this.index, this)
    }
  }

  get (): AnyOrUndefinedType<T> {
    return this.item.value
  }

  set (value: T): this {
    this.item.value = value
    return this
  }

  /**
   * The method of Date instances returns the number of milliseconds
   * for this date since the epoch
   *
   * Метод возвращает числовое значение, соответствующее указанной дате по
   * всемирному координированному времени
   * @private
   */
  private getDate (): number {
    return new Date().getTime()
  }

  /**
   * The method of the Storage interface, when passed a key name,
   * will return that key's value
   *
   * Метод вернёт значение, лежащее в хранилище по указанному ключу
   * @private
   */
  private getItem (): StorageItemType<T> {
    const read = this.method?.getItem(this.index)

    if (read) {
      try {
        return JSON.parse(read)
      } catch (e) {
      }
    }

    return {
      item: undefined,
      date: this.getDate()
    }
  }

  /**
   * The method of the Storage interface, when passed a key name and value,
   * will add that key to the given Storage object
   *
   * Если методу интерфейса Storage передать ключ и значение,
   * то в хранилище будет добавлено соответствующее ключу значение
   * @private
   */
  private setItem (): this {
    this.method?.setItem(this.index, JSON.stringify({
      item: this.item.value,
      date: this.getDate()
    }))

    return this
  }

  /**
   * The method of the Storage interface, when passed a key name, will
   * remove that key from the given Storage object if it exists
   *
   * Если методу интерфейса Storage передать ключ, то из хранилища будет удалён
   * элемент с указанным ключом
   * @private
   */
  private removeItem (): this {
    this.method?.removeItem(this.index)
    return this
  }

  private watch (): this {
    watch(this.item, value => {
      this.date = this.getDate()

      if (isNull(value)) {
        this.removeItem()
      } else {
        this.setItem()
      }
    })

    return this
  }
}

const objects = new Map<string, StorageData>()
