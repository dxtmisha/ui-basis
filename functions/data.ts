import { EmptyType, UndefinedType } from '../constructors/types'

/**
 * Is the variable equal to null or undefined
 *
 * Является ли переменная равной null или undefined
 * @param value value / значение
 */
export function isNull<T = any> (value: T | UndefinedType): value is UndefinedType {
  return value === null || value === undefined
}

/**
 * Checks if the field is filled
 *
 * Проверяет, заполнено ли поле
 * @param value value / значение
 */
export function isFilled<T = any> (value: T): value is Exclude<T, EmptyType> {
  if (value) {
    switch (typeof value) {
      case 'bigint':
      case 'number':
        return value !== 0
      case 'boolean':
        return value
      case 'function':
      case 'symbol':
        return true
      case 'object':
        if (Array.isArray(value)) {
          return value.length > 0
        } else {
          return Object.entries(value).length > 0
        }
      case 'string':
        return value !== '' && value !== 'undefined'
      case 'undefined':
        return false
      default:
        return !!value
    }
  }

  return false
}

/**
 * Checks if the function is a callback function
 *
 * Проверяет, является ли функция обратного вызова
 * @param callback the value being checked / проверяемое значение
 */
export function isFunction<T = any> (callback: T | (() => T)): callback is (() => T) {
  return callback instanceof Function || typeof callback === 'function'
}

/**
 * Checks if the value is between integers
 *
 * Проверяет, лежит ли значение между целыми числами
 * @param value value / значение
 * @param between value for rounding / значение для округления
 */
export function isIntegerBetween (value: number, between: number): boolean {
  const floor = Math.floor(between)
  return value >= floor && value < floor + 1
}

/**
 * Checks if value is in the array selected or if value equals selected, if selected is a string
 *
 * Проверяет, есть ли value в массиве selected или равен ли value selected, если selected - строка
 * @param value value / значение
 * @param selected array or string for comparison / массив или строка для сравнения
 */
export function isSelected<T = any> (value: T, selected: T | T[]): boolean {
  if (isNull(value)) {
    return false
  } else if (Array.isArray(selected)) {
    return selected.indexOf(value) !== -1
  } else {
    return value === selected
  }
}

/**
 * Testing isSelected property for the entire list of values
 *
 * Проверка свойства isSelected для всех значений списка
 * @param values list of values for comparison / список значений для сравнения
 * @param selected array or string for comparison / массив или строка для сравнения
 */
export function isSelectedByList (values: any | any[], selected: any | any[]): boolean {
  if (Array.isArray(values)) {
    return values.reduce((accumulator, value) => accumulator && isSelected(value, selected), true)
  } else {
    return isSelected(values, selected)
  }
}

/**
 * The object is used for matching text with a pattern
 *
 * Конструктор создаёт объект регулярного выражения для сопоставления текста с шаблоном
 * @param value test for replacement / тест для замены
 * @param flags если определён, может принимать любую комбинацию нижеследующих значений:
 * g - глобальное сопоставление,
 * i - игнорирование регистра при сопоставлении
 * m - сопоставление по нескольким строкам.
 * @param pattern Regular expression text in which the value :value will be replaced with
 * the optimized value of value / Текст регулярного выражения, в котором значение :value
 * заменится на оптимизированное значение value
 */
export function getExp (
  value: string,
  flags = 'ig' as string,
  pattern = ':value' as string
): RegExp {
  const data = value.replace(/([[\]\\^$.?*+()])/ig, '\\$1')

  return new RegExp(pattern.replace(':value', data), flags)
}
