import { computed, ComputedRef, isRef, Ref } from 'vue'
import { executeFunction, isFilled, isFunction, isNull } from '../functions/data'

import { AnyOrUndefinedType, CallbackNullType } from '../constructors/types'
import { RefOrCallbackOrNormalType } from '../constructors/typesRef'

/**
 * Basic abstract class for managing data storage
 *
 * Базовый абстрактный класс для управления хранением данных
 */
export abstract class StorageAbstract<T = any> {
  /**
   * Constructor
   * @param key key / ключ
   * @param value values / значения
   * @param defaultValue default values / значения по умолчанию
   * @protected
   */
  protected constructor (
    protected readonly key: string,
    protected readonly value: Ref<AnyOrUndefinedType<T>>,
    defaultValue?: T | (() => T)
  ) {
    if (!this.is() && defaultValue) {
      this.set(executeFunction(defaultValue))
    }
  }

  /**
   * Is the value filled
   *
   * Заполнено ли значение
   */
  is (): boolean {
    return isFilled<AnyOrUndefinedType<T>>(this.value.value)
  }

  /**
   * Data retrieval
   *
   * Получение данных
   * @param valueCallback if you pass a function, it will execute when there is no value
   * and save the values / если вы передадите функцию, она выполнится при отсутствии
   * значения и сохранит значения
   */
  get (
    valueCallback?: RefOrCallbackOrNormalType<T>
  ): ComputedRef<AnyOrUndefinedType<T>> {
    return computed(() => this.getStatic(valueCallback))
  }

  /**
   * Data retrieval
   *
   * Получение данных
   * @param valueCallback if you pass a function, it will execute when there is no value
   * and save the values / если вы передадите функцию, она выполнится при отсутствии
   * значения и сохранит значения
   */
  getStatic (
    valueCallback?: RefOrCallbackOrNormalType<T>
  ): AnyOrUndefinedType<T> {
    if (!isNull(this.value.value)) {
      return this.value.value
    } else if (isFunction(valueCallback)) {
      this.set(valueCallback())
      return this.value.value
    } else if (isRef(valueCallback)) {
      return valueCallback.value
    } else {
      return valueCallback
    }
  }

  /**
   * Returns a key
   *
   * Возвращает ключ
   */
  getKey (): string {
    return this.key
  }

  /**
   * Getting the most reactive variable
   *
   * Получение самой реактивной переменной
   */
  getItem (): Ref<AnyOrUndefinedType<T>> {
    return this.value
  }

  /**
   * Asynchronous execution of a function when the value is absent
   *
   * Асинхронное выполнение функции при отсутствии значения
   * @param callback executed function / выполняемая функция
   */
  async getAsync (
    callback: CallbackNullType<AnyOrUndefinedType<T>>
  ): Promise<Ref<AnyOrUndefinedType<T>>> {
    await this.getAsyncStatic(callback)
    return this.value
  }

  /**
   * Asynchronous execution of a function when the value is absent
   *
   * Асинхронное выполнение функции при отсутствии значения
   * @param callback executed function / выполняемая функция
   */
  async getAsyncStatic (
    callback: CallbackNullType<AnyOrUndefinedType<T>>
  ): Promise<AnyOrUndefinedType<T>> {
    if (isNull(this.value.value)) {
      this.set(await callback())
    }

    return this.value.value
  }

  /**
   * Change the data
   *
   * Изменить данные
   * @param value value / значение
   */
  set (value: AnyOrUndefinedType<T>): this {
    this.value.value = value
    return this
  }

  /**
   * Deletion of the value
   *
   * Удаление значения
   */
  remove (): this {
    this.value.value = undefined
    return this
  }
}
