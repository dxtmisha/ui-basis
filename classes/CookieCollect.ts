import { ref, Ref, watch } from 'vue'
import { isFilled } from '../functions/data'

import { Env } from './Env'
import { StorageItem } from './StorageItem'

export type CookieSameSiteType = 'strict' | 'lax'

export interface CookieItemType {
  item: Ref<string | undefined>
  age: number
  sameSite: CookieSameSiteType
  argument: Array<string>
}

export const cacheAgeDefault = Env.cache()

/**
 * Class for managing cookies
 *
 * Класс для управления cookie-файлами
 */
export class CookieCollect {
  public static readonly data = new Map<string, CookieItemType>()
  public static readonly block = new StorageItem('cookie-block')

  static get (key: string): CookieItemType {
    return this.data.has(key) ? (this.data.get(key) as CookieItemType) : this.newItem(key)
  }

  static set (key: string, value?: string) {
    if (value) {
      if (this.data.has(key)) {
        this.get(key).item.value = value
      } else {
        this.newItem(key, value)
        this.update(key)
      }
    } else {
      this.remove(key)
    }
  }

  static setBlock (value: boolean): void {
    this.block.set(value ? '1' : undefined)
  }

  static remove (key: string) {
    if (this.data.has(key)) {
      this.data.delete(key)
      this.update(key)
    }
  }

  /**
   * Creating a new entry in a Map
   *
   * Создание новой записи в Map
   * @param key key of the value / ключ значения
   * @param value значения обновления
   * @private
   */
  private static newItem (key: string, value?: string): CookieItemType {
    const item: CookieItemType = {
      item: ref<string>(value || ''),
      age: cacheAgeDefault,
      sameSite: 'strict',
      argument: []
    }

    this.data.set(key, item)
    watch(item.item, () => this.update(key))

    return item
  }

  /**
   * Updating data by key
   *
   * Обновление данных по ключу
   * @param key key of the value / ключ значения
   * @private
   */
  private static update (key: string): void {
    const item = this.get(key)
    const age = isFilled(item.item.value) ? item.age : -1

    if (this.block.getStatic() !== '1') {
      document.cookie = [
        `${encodeURIComponent(key)}=${encodeURIComponent(item.item.value || '')}`,
        `max-age=${age}`,
        `SameSite=${item.sameSite}`,
        ...item.argument
      ].join('; ')
    }
  }

  static {
    for (const item of document.cookie.split(';')) {
      const [key, value] = item.trim().split('=') as [string, string]

      if (key && isFilled(value)) {
        this.newItem(key, value)
      }
    }
  }
}
