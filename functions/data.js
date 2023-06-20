'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.random = exports.maxListLength = exports.minListLength = exports.strFill = exports.arrFill = exports.replaceRecursive = exports.splice = exports.forEach = exports.executeFunction = exports.getClipboardData = exports.getColumn = exports.getExp = exports.isSelectedByList = exports.isSelected = exports.isIntegerBetween = exports.isFunction = exports.isFilled = exports.isNull = void 0
/**
 * Is the variable equal to null or undefined
 *
 * Является ли переменная равной null или undefined
 * @param value value / значение
 */
function isNull (value) {
  return value === null || value === undefined
}
exports.isNull = isNull
/**
 * Checks if the field is filled
 *
 * Проверяет, заполнено ли поле
 * @param value value / значение
 */
function isFilled (value) {
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
exports.isFilled = isFilled
/**
 * Checks if the function is a callback function
 *
 * Проверяет, является ли функция обратного вызова
 * @param callback the value being checked / проверяемое значение
 */
function isFunction (callback) {
  return callback instanceof Function || typeof callback === 'function'
}
exports.isFunction = isFunction
/**
 * Checks if the value is between integers
 *
 * Проверяет, лежит ли значение между целыми числами
 * @param value value / значение
 * @param between value for rounding / значение для округления
 */
function isIntegerBetween (value, between) {
  const floor = Math.floor(between)
  return value >= floor && value < floor + 1
}
exports.isIntegerBetween = isIntegerBetween
/**
 * Checks if value is in the array selected or if value equals selected, if selected is a string
 *
 * Проверяет, есть ли value в массиве selected или равен ли value selected, если selected - строка
 * @param value value / значение
 * @param selected array or string for comparison / массив или строка для сравнения
 */
function isSelected (value, selected) {
  if (isNull(value)) {
    return false
  } else if (Array.isArray(selected)) {
    return selected.indexOf(value) !== -1
  } else {
    return value === selected
  }
}
exports.isSelected = isSelected
/**
 * Testing isSelected property for the entire list of values
 *
 * Проверка свойства isSelected для всех значений списка
 * @param values list of values for comparison / список значений для сравнения
 * @param selected array or string for comparison / массив или строка для сравнения
 */
function isSelectedByList (values, selected) {
  if (Array.isArray(values)) {
    return values.reduce((accumulator, value) => accumulator && isSelected(value, selected), true)
  } else {
    return isSelected(values, selected)
  }
}
exports.isSelectedByList = isSelectedByList
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
function getExp (value, flags = 'ig', pattern = ':value') {
  const data = value.replace(/([[\]\\^$.?*+()])/ig, '\\$1')
  return new RegExp(pattern.replace(':value', data), flags)
}
exports.getExp = getExp
/**
 * Returns an array of values for a specific column in the input array
 *
 * Возвращает массив значений для определенного столбца входного массива
 * @param array a one array or an array of objects from which to pull a column of values
 * from / многомерный массив или массив объектов, из которого будет производиться
 * выборка значений
 * @param column ключ столбца, значения которого нужно вернуть / the column of values to return
 */
function getColumn (array, column) {
  return forEach(array, item => item?.[column])
}
exports.getColumn = getColumn
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
async function getClipboardData (event) {
  return event?.clipboardData?.getData('text') || await navigator.clipboard.readText() || ''
}
exports.getClipboardData = getClipboardData
/**
 * The function is executed and returns its result. Or returns the
 * input data, if it is not a function
 *
 * Выполняется функция и возвращает ее результат. Или возвращает входные
 * данные, если это не функция
 * @param callback function or any value / функция или любое значение
 */
function executeFunction (callback) {
  return isFunction(callback) ? callback() : callback
}
exports.executeFunction = executeFunction
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
function forEach (data, callback, filterUndefined) {
  if (data && typeof data === 'object') {
    const returnData = []
    if (Array.isArray(data) ||
            data instanceof Map) {
      data.forEach((item, key) => returnData.push(callback(item, key, data)))
    } else {
      Object.entries(data).forEach(([key, item]) => returnData.push(callback(item, key, data)))
    }
    if (filterUndefined) {
      return returnData.filter((item) => item !== undefined)
    } else {
      return returnData
    }
  } else {
    return []
  }
}
exports.forEach = forEach
/**
 * This method is used to copy the values of all enumerable own properties from one
 * source object to a target object
 *
 * Метод используется для копирования значений всех перечисляемых свойств одного объекта в другой
 * @param data the target object / целевой объект
 * @param item the source object / исходные объекты
 * @param start index at which to start changing the array / индекс, по которому начинает изменять массив
 * @param isDelete removing the initial value of start / удаление начального значения start
 */
function splice (data, item, start, isDelete) {
  if (typeof data === 'object' &&
        typeof item === 'object') {
    if (start) {
      let init = false
      forEach(Object.assign({}, data), (value, index) => {
        if (start === index ||
                    start === value) {
          init = true
          Object.assign(data, item)
          if (isDelete) {
            delete data[index]
          }
        } else if (init) {
          delete data[index]
          data[index] = value
        }
      })
    } else {
      Object.assign(data, item)
    }
  }
  return data || {}
}
exports.splice = splice
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
function replaceRecursive (array, replacement, isMerge = true) {
  if (typeof array === 'object' &&
        isFilled(replacement)) {
    forEach(replacement, (item, index) => {
      const data = array?.[index]
      if (data &&
                item &&
                typeof data === 'object' &&
                typeof item === 'object') {
        if (isMerge &&
                    Array.isArray(data) &&
                    Array.isArray(item)) {
          data.push(...item)
        } else if (Array.isArray(data)) {
          array[index] = replaceRecursive(replaceRecursive({}, data), item)
        } else {
          replaceRecursive(data, item)
        }
      } else {
        if (Array.isArray(item)) {
          array[index] = [...item]
        } else {
          array[index] = typeof item === 'object' ? JSON.parse(JSON.stringify(item)) : item
        }
      }
    })
  }
  return array
}
exports.replaceRecursive = replaceRecursive
/**
 * The method creates an array of "count" elements with values equal to "value"
 *
 * Метод создает массив из "count" элементов со значениями равными "value"
 * @param value value to fill the array with / значение, заполняющее массив
 * @param count the number of elements in that array / число элементов этого массива
 */
function arrFill (value, count) {
  return Array(count).fill(value)
}
exports.arrFill = arrFill
/**
 * The method creates a string of length count, consisting of the characters value
 *
 * Метод создает строку длиной count, состоящую из символов value
 * @param value character for filling / символ для заполнения
 * @param count length of the string / длина строки
 */
function strFill (value, count) {
  return arrFill(value, count).join('')
}
exports.strFill = strFill
/**
 * Searches for the shortest string in the array and returns its length
 *
 * Ищет самую короткую строку в массиве и возвращает её длину
 * @param data array with values / массив с значениями
 */
function minListLength (data) {
  return forEach(data, item => item.length)
    ?.sort()?.[0]
}
exports.minListLength = minListLength
/**
 * Searches for the longest string in the array and returns its length
 *
 * Ищет самую длинную строку в массиве и возвращает её длину
 * @param data array with values / массив с значениями
 */
function maxListLength (data) {
  return forEach(data, item => item.length)
    ?.sort((a, b) => a > b ? -1 : 1)?.[0]
}
exports.maxListLength = maxListLength
/**
 * Generate a random integer
 *
 * Генерирует случайное число
 * @param min the lowest value to return / наименьшее значение
 * @param max the highest value to return / наибольшее значение
 */
function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
exports.random = random
// # sourceMappingURL=data.js.map
