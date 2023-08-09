import { forEach, getExp } from '../functions/data'

import {
  AssociativeType,
  NumberOrStringOrDateType,
  NumberOrStringType
} from '../constructors/types'

/**
 * Class for type conversion
 *
 * Класс для преобразования типов
 */
export class To {
  /**
   * Conversion to array
   *
   * Преобразование в массив
   * @param value input value / входное значение
   */
  static array<T = any> (value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value]
  }

  /**
   * Creates a copy of the object
   *
   * Создает копию объекта
   * @param value Object for copying / Объект для копирования
   */
  static copy<T = any> (value: T): T {
    return JSON.parse(JSON.stringify(value))
  }

  /**
   * Conversion to Date object
   *
   * Преобразование в объект Date
   * @param value input value / входное значение
   */
  static date<Type = Date> (value?: NumberOrStringOrDateType): Type | Date {
    if (value instanceof Date) {
      return value
    } else if (value === undefined) {
      return new Date()
    } else if (typeof value === 'number') {
      return new Date(value)
    } else {
      let date = value as string
      let timeZone = '' as string

      value.replace(/^([\s\S]+)([-+]\d{2}:?\d{2})$/, (all: string, d: string, z: string) => {
        date = d
        timeZone = z

        return ''
      })

      const data = date.match(/^\d{4}-\d{2}-\d{2}$/)
        ? `${date} 00:00:00`
        : date.match(/^\d{4}-\d{2}$/)
          ? `${date}-01 00:00:00`
          : date.match(/^\d{4}$/)
            ? `${date}-01-01 00:00:00`
            : date.match(/^\d{2}:\d{2}$/)
              ? `2000-01-01 ${date}:00`
              : date.match(/^\d{2}:\d{2}:\d{2}$/)
                ? `2000-01-01 ${date}`
                : date

      return new Date(data.replace(' ', 'T') + timeZone)
    }
  }

  /**
   * The method parses a string argument and returns a floating point number
   *
   * Метод принимает строку в качестве аргумента и возвращает десятичное число
   * @param value the value to parse / текстовая строка
   */
  static number<Type = number> (value: number | string): Type | number {
    if (typeof value === 'number') {
      return value
    } else {
      const number = To.numberReplace(value)
      return Number.isNaN(number) ? 0 : number
    }
  }

  /**
   * Converts the input value to one of the available types
   *
   * Преобразует входное значение в один из доступных типов
   * @param value входной значения
   * @param isFunction преобразовывать в функция
   */
  static transformation (value: any, isFunction = true): any {
    if (typeof value === 'string') {
      value = value.trim()

      if (value === 'true') {
        return true
      } else if (value === 'false') {
        return false
      } else if (value === 'undefined') {
        return undefined
      } else if (value === 'null') {
        return null
      } else if (value.match(/^[{[]/)) {
        try {
          return JSON.parse(value)
        } catch (e) {
        }
      } else if (value.match(/^[0-9]+\.[0-9.]+$/)) {
        return parseFloat(value)
      } else if (value.match(/^[0-9]+$/)) {
        return parseInt(value)
      } else if (
        isFunction &&
        value in window &&
        typeof window[value as any] === 'function'
      ) {
        return window[value as any]
      }
    }

    return value
  }

  /**
   * Method for processing a number
   *
   * Метод для обработки числа
   * @param value the value to parse / текстовая строка
   * @private
   */
  private static numberReplace (value: string): number {
    let number = value.replace(/[^\d., ]+/ig, '')

    if (number.match(/( [0-9]{3}[ ,.]|[0-9] [0-9])/ig)) {
      number = number
        .replace(/ /ig, '')
        .replace(/,/ig, '.')
    } else if (number.match(/,[0-9]{3}[,.]/ig)) {
      number = number.replace(/,/ig, '')
    } else if (number.match(/[.][0-9]{3}[,.]/ig)) {
      number = number
        .replace(/[.]/ig, '')
        .replace(/,/ig, '.')
    } else {
      number = number.replace(/,/ig, '.')
    }

    return parseFloat(number)
  }

  /**
   * Convert a String to Camel Case (upper)
   *
   * Преобразование строки в Camel Case (upper)
   * @param value value / значения
   */
  static camelCase (value: NumberOrStringType): string {
    return value
      .toString()
      .trim()
      .replace(/-([a-zA-Z])/g, (all, char) => `${char.toUpperCase()}`)
      .replace(/^([A-Z])/g, (all, char) => `${char.toLowerCase()}`)
  }

  /**
   * Convert a String to Camel Case (+ first letter)
   *
   * Преобразование строки в Camel Case (+ первая буква)
   * @param value value / значения
   */
  static camelCaseFirst (value: NumberOrStringType): string {
    return value
      .toString()
      .trim()
      .replace(/-([a-zA-Z])/g, (all, char) => `${char.toUpperCase()}`)
      .replace(/^([a-zA-Z])/g, (all, char) => `${char.toUpperCase()}`)
  }

  /**
   * Convert a string to kebab case (lower)
   *
   * Преобразование строки в kebab case (lower)
   * @param value value / значения
   */
  static kebabCase (value: NumberOrStringType): string {
    return value
      .toString()
      .trim()
      .replace(/^[A-Z]/g, all => all.toLowerCase())
      .replace(/(?<=\w)[A-Z]/g, all => `-${all.toLowerCase()}`)
      // .replace(/-+/g, '-')
      .replace(/[A-Z]/g, all => all.toLowerCase())
  }

  /**
   * Replacing the value from replaces in value
   *
   * Замена значения из replaces в value
   * @param value template string / строка шаблона
   * @param replaces object with values for replacement / объект с значениями для замены
   */
  static replaceTemplate (value: string, replaces: AssociativeType<string>): string {
    let data = value

    forEach<string, string, void>(replaces, (replacement, pattern) => {
      data = data.replace(getExp(`[${pattern}]`), replacement)
    })

    return data
  }
}
