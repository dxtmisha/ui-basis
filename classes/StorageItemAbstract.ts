import { ComputedRef } from 'vue'

import { StorageAbstract } from './StorageAbstract'
import { StorageData } from './StorageData'

import { AnyOrUndefinedType, CallbackNullType } from '../constructors/types'

/**
 * Abstract class for working with storage
 *
 * Абстрактный класс для работы с хранилищем
 */
export abstract class StorageItemAbstract<T = any> extends StorageAbstract<T> {
  protected readonly item: StorageData<T>

  /**
   * Constructor
   * @param name group of records, from which we get data / группа записей, по которой
   * получаем данные
   * @param key key / ключ
   * @param defaultValue default values / значения по умолчанию
   * @param method class, with which we will work / класс, с которым будем работать
   * @protected
   */
  protected constructor (
    name: string,
    key: string,
    defaultValue?: T | (() => T),
    method?: Storage
  ) {
    const item = new StorageData<T>(name, key, method)

    super(key, item.getItem(), defaultValue)

    this.item = item
  }

  /**
   * Getting data with respect to the caching timer
   *
   * Получение данных с учетом таймера кэширования
   * @param callback called function / вызываемая функция
   * @param age cache time / время кэширования
   */
  async cache (
    callback?: CallbackNullType<any>,
    age?: number
  ): Promise<ComputedRef<AnyOrUndefinedType<T>>> {
    return (await this.setByCache(callback, age)).get()
  }

  /**
   * Getting data with respect to the caching timer
   *
   * Получение данных с учетом таймера кэширования
   * @param callback called function / вызываемая функция
   * @param age cache time / время кэширования
   */
  async cacheStatic (
    callback?: CallbackNullType<any>,
    age?: number
  ): Promise<AnyOrUndefinedType<T>> {
    return (await this.setByCache(callback, age)).getStatic()
  }

  /**
   * Fixes taking into account caching time
   *
   * Исправления с учетом времени кэширования
   * @param callback called function / вызываемая функция
   * @param age cache time / время кэширования
   */
  async setByCache (
    callback?: CallbackNullType<any>,
    age?: number
  ): Promise<this> {
    if (
      callback &&
      this.item.isOld(age)
    ) {
      this.set(await callback())
    }

    return this
  }
}
