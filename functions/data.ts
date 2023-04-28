import {
  AssociativeOrArrayType,
  AssociativeType,
  EmptyType,
  NumberOrStringType,
  UndefinedType
} from '../constructors/types'

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

/**
 * Returns an array of values for a specific column in the input array
 *
 * Возвращает массив значений для определенного столбца входного массива
 * @param array a one array or an array of objects from which to pull a column of values
 * from / многомерный массив или массив объектов, из которого будет производиться
 * выборка значений
 * @param column ключ столбца, значения которого нужно вернуть / the column of values to return
 */
export function getColumn<T = any> (array: AssociativeOrArrayType, column: string): T[] {
  return forEach(array, item => item?.[column])
}

/**
 * The method retrieves drag data (as a string) for the specified type.
 * If the drag operation does not include data, this method returns an empty string
 *
 * Метод извлекает данные перетаскивания (в виде строки) для указанного типа
 * @param event the ClipboardEvent interface represents events providing information
 * related to modification of the clipboard, that is cut, copy, and paste events /
 * интерфейс ClipboardEvent представляет события, предоставляющие информацию, связанную
 * с изменением буфера обмена, этими события являются cut, copy и paste.
 */
export async function getClipboardData (event: ClipboardEvent): Promise<string> {
  return event?.clipboardData?.getData('text') || await navigator.clipboard.readText() || ''
}

/**
 * The function is executed and returns its result. Or returns the
 * input data, if it is not a function
 *
 * Выполняется функция и возвращает ее результат. Или возвращает входные
 * данные, если это не функция
 * @param callback function or any value / функция или любое значение
 */
export function executeFunction<T> (callback: T | (() => T)): T {
  return isFunction(callback) ? callback() : callback
}

/**
 * The function performs the specified function once for each element in the object. And returns
 * an array with the results of executing the function
 *
 * Функция выполняет указанную функцию один раз для каждого элемента в объекте. И возвращает
 * массив с результатами выполнения функции
 * @param data object for iteration / объект для перебора
 * @param callback a function to execute for each element in the array / функция,
 * которая будет вызвана для каждого элемента
 * @param filterUndefined removal of all records with the value undefined / удаление
 * всех записей со значением undefined
 */
export function forEach<T, K = NumberOrStringType, R = undefined> (
  data: AssociativeOrArrayType<T>,
  callback: (item: T, key: K, data: AssociativeOrArrayType<T>) => R,
  filterUndefined?: boolean
): Array<R> {
  if (data && typeof data === 'object') {
    const returnData = [] as Array<R>

    if (Array.isArray(data)) {
      data.forEach((item, key) => returnData.push(callback(item, key as K, data)))
    } else {
      Object.entries(data).forEach(([key, item]) => returnData.push(callback(item, key as K, data)))
    }

    if (filterUndefined) {
      return returnData.filter((item: R | undefined) => item !== undefined)
    } else {
      return returnData
    }
  } else {
    return []
  }
}

/**
 * Merge one or more arrays recursively
 *
 * Рекурсивное слияние одного или более массивов
 * @param array the array in which elements are replaced / массив, элементы которого
 * будут заменены
 * @param replacement arrays from which elements will be extracted / массивы, из которых
 * будут браться элементы для замены
 * @param isMerge merge one or more arrays / сливает один или большее количество массивов
 */
export function replaceRecursive<T = any> (
  array: AssociativeType<T>,
  replacement?: AssociativeOrArrayType<T>,
  isMerge = true as boolean
): AssociativeType<T> {
  if (
    typeof array === 'object' &&
    isFilled(replacement)
  ) {
    forEach(replacement, (item, index) => {
      const data = array?.[index] as T

      if (
        data &&
        item &&
        typeof data === 'object' &&
        typeof item === 'object'
      ) {
        if (
          isMerge &&
          Array.isArray(data) &&
          Array.isArray(item)
        ) {
          data.push(...item)
        } else if (Array.isArray(data)) {
          array[index] = replaceRecursive<T>(
            replaceRecursive<T>({}, data),
            item
          ) as T
        } else {
          replaceRecursive<T>(
            data as AssociativeType<T>,
            item
          )
        }
      } else {
        if (Array.isArray(item)) {
          array[index] = [...item] as T
        } else {
          array[index] = typeof item === 'object' ? JSON.parse(JSON.stringify(item)) : item
        }
      }
    })
  }

  return array
}

/**
 * The method creates an array of "count" elements with values equal to "value"
 *
 * Метод создает массив из "count" элементов со значениями равными "value"
 * @param value value to fill the array with / значение, заполняющее массив
 * @param count the number of elements in that array / число элементов этого массива
 */
export function arrFill<T = any> (value: T, count: number): T[] {
  return Array(count).fill(value)
}
