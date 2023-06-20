'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.GeoIntlStatic = void 0
const To_1 = require('./To')
const GeoAbstract_1 = require('./GeoAbstract')
/**
 * The Intl namespace object contains several constructors as well as functionality common
 * to the internationalization constructors and other language sensitive functions. Collectively,
 * they comprise the ECMAScript Internationalization API, which provides language sensitive
 * string comparison, number formatting, date and time formatting, and more
 *
 * Объект Intl является пространством имён для API интернационализации ECMAScript, предоставляющим
 * языка-зависимое сравнение строк, форматирование чисел и дат со временем. Конструкторы объектов
 * Collator, NumberFormat и DateTimeFormat являются свойствами объекта Intl. На этой странице
 * описаны эти свойства, а также общая функциональность конструкторов интернационализации и других
 * языка-зависимых функций
 */
class GeoIntlStatic extends GeoAbstract_1.GeoAbstract {
  /**
     * The consistent translation of language, region and script display names
     *
     * Последовательный перевод отображаемых названий языка, региона и скрипта
     * @param value the code to provide depends on the type / предоставляемый код зависит от типа
     * @param typeOptions an object with some or all of the following properties / объект
     * с некоторыми или всеми из следующих свойств
     */
  displayStatic (value, typeOptions) {
    let options = { type: 'language' }
    let text
    if (typeOptions) {
      if (typeof typeOptions === 'string') {
        options.type = typeOptions
      } else {
        options = {
          ...options,
          ...typeOptions
        }
      }
    }
    try {
      if (value) {
        text = new Intl.DisplayNames(this.codeStandard.value, options).of(value)
      } else if (options.type === 'language') {
        text = new Intl.DisplayNames(this.codeStandard.value, options).of(this.lang.value)
      } else if (options.type === 'region') {
        text = new Intl.DisplayNames(this.codeStandard.value, options).of(this.country.value)
      }
    } catch (e) {
      text = value
    }
    return text
  }

  /**
     * Get display names of language
     *
     * Получить отображаемые имена языка
     * @param value the code to provide depends on the type / предоставляемый код зависит от типа
     * @param style the formatting style to use / используемый стиль форматирования
     */
  languageStatic (value, style) {
    const options = {
      type: 'language',
      style
    }
    return this.displayStatic(value || this.lang.value, options)
  }

  /**
     * Get display names of region
     *
     * Получить отображаемые имена региона
     * @param value the code to provide depends on the type / предоставляемый код зависит от типа
     * @param style the formatting style to use / используемый стиль форматирования
     */
  countryNameStatic (value, style) {
    const options = {
      type: 'region',
      style
    }
    return this.displayStatic(value || this.country.value, options)
  }

  /**
     * In basic use without specifying a locale, a formatted string
     *
     * При обычном использовании без указания локали форматированная строка
     * @param value a number, bigint, or string, to format / число для форматирования
     * @param options an object with some or all properties / объект с некоторыми
     * или всеми свойствами
     */
  numberStatic (value, options) {
    return this.numberObject(options)?.format(To_1.To.number(value)) || value.toString()
  }

  /**
     * Символ десятичная дробь
     */
  numberDecimalStatic () {
    return this.numberObject()?.formatToParts(1.2)?.find(item => item.type === 'decimal')?.value || '.'
  }

  /**
     * Currency formatting
     *
     * Форматирование валюты
     * @param value a number, bigint, or string, to format / число для форматирования
     * @param currencyOptions the currency to use in currency formatting / валюта для
     * использования в форматировании валюты
     * @param numberOnly do not display the currency symbol / не выводить значок валюты
     */
  currencyStatic (value, currencyOptions, numberOnly = false) {
    const options = ({
      style: 'currency',
      currencyDisplay: 'symbol',
      ...(typeof currencyOptions === 'string' ? { currency: currencyOptions } : currencyOptions || {})
    })
    const number = value
      .toString()
      .replace(/^([\S\s]+[\d ])([a-zA-Z]{3})$/i, (all, s1, s2) => {
        options.currency = s2.toUpperCase()
        return s1
      })
    if (numberOnly) {
      const object = this.numberObject(options)
      if (object) {
        return object.formatToParts(To_1.To.number(value))
          .filter(item => ['literal', 'currency'].indexOf(item.type) === -1)
          .join('')
      } else {
        return value.toString()
      }
    } else {
      return this.numberStatic(number, options)
    }
  }

  /**
     * Unit formatting
     * If the style is 'unit', a unit property must be provided
     *
     * Форматирование юнитов
     * @param value a number, bigint, or string, to format / число для форматирования
     * @param unitOptions the unit to use in unit formatting / блок для использования
     * в форматировании блока
     */
  unitStatic (value, unitOptions) {
    const options = ({
      ...{ style: 'unit' },
      ...(typeof unitOptions === 'string' ? { unit: unitOptions } : unitOptions || {})
    })
    const number = (value)
      .toString()
      .replace(/^([\S\s]+[\d ])([a-zA-Z]+)$/i, (all, s1, s2) => {
        options.unit = s2.toLowerCase()
        return s1
      })
    return this.numberStatic(number, options)
  }

  /**
     * Number as a percentage
     *
     * Число в виде процента
     * @param value a number, bigint, or string, to format / число для форматирования
     * @param options an object with some or all properties / объект с некоторыми
     * или всеми свойствами
     */
  percentStatic (value, options) {
    return this.numberStatic(value, {
      style: 'percent',
      ...(options || {})
    })
  }

  /**
     * Number as a percentage (unit)
     *
     * Число в виде процента (единица)
     * @param value a number, bigint, or string, to format / число для форматирования
     * @param options an object with some or all properties / объект с некоторыми
     * или всеми свойствами
     */
  percentStaticBy100 (value, options) {
    return this.percentStatic(To_1.To.number(value) / 100, options)
  }

  /**
     * Enables language-sensitive relative time formatting
     *
     * Включает форматирование относительного времени с учетом языка
     * @param value a number, bigint, or string, to format / число для форматирования
     * @param styleOptions the length of the internationalized message / длина
     * интернационализированного сообщения
     * @param todayValue current day / текущий день
     */
  relativeStatic (value, styleOptions, todayValue) {
    const date = To_1.To.date(value)
    const today = todayValue || new Date()
    const options = ({
      numeric: 'auto',
      ...(typeof styleOptions === 'string' ? { style: styleOptions } : styleOptions || {})
    })
    let unit = 'second'
    let relative = (date.getTime() - today.getTime()) / 1000
    let text
    if (Math.abs(relative) >= 60) {
      unit = 'minute'
      relative /= 60
      if (Math.abs(relative) >= 60) {
        unit = 'hour'
        relative /= 60
        if (Math.abs(relative) >= 24) {
          unit = 'day'
          relative /= 24
          if (Math.abs(relative) >= 30) {
            unit = 'month'
            relative /= 30
            if (Math.abs(relative) >= 12) {
              unit = 'year'
              relative /= 12
            }
          }
        }
      }
    }
    try {
      text = new Intl.RelativeTimeFormat(this.codeStandard.value, options).format(Math.round(relative), unit)
    } catch (e) {
      text = ''
    }
    return text
  }

  /**
     * The object enables language-sensitive number formatting
     *
     * Объект включает форматирование чисел с учетом языка
     * @param options an object with some or all properties / объект с некоторыми
     * или всеми свойствами
     */
  numberObject (options) {
    let object
    try {
      object = new Intl.NumberFormat(this.codeStandard.value, options)
    } catch (e) {
    }
    return object
  }

  /**
     * Enables language-sensitive date and time formatting
     *
     * Конструктором объектов, включающих языка-зависимое форматирование даты и времени.
     * @param value the date to format / дата для форматирования
     * @param type type of data format / тип формата data
     * @param styleOptions the representation of the month / представление месяца
     * @param hour24 whether to use 12-hour time / использовать ли 12-часовое время
     */
  dateStatic (value, type, styleOptions, hour24) {
    const date = To_1.To.date(value)
    const isDisplay = typeof styleOptions === 'string'
    const options = this.dateOptions(type, isDisplay ? styleOptions : 'short')
    if (hour24) {
      options.hour12 = false
    }
    if (!isDisplay) {
      Object.assign(options, styleOptions)
    }
    return date.toLocaleString(this.codeStandard.value, options)
  }

  /**
     * Names of months
     *
     * Названия месяцев
     * @param value the date to format / дата для форматирования
     * @param style the representation of the month / представление месяца
     */
  monthStatic (value, style) {
    return Intl.DateTimeFormat(this.codeStandard.value, { month: style || 'long' })
      .format(To_1.To.date(value))
  }

  /**
     * Array to list of months
     *
     * Массив в список месяцев
     * @param style the representation of the month / представление месяца
     */
  monthsStatic (style) {
    const date = new Date()
    const format = Intl.DateTimeFormat(this.codeStandard.value, { month: style || 'long' })
    const list = [{
      text: '',
      value: undefined
    }]
    for (let i = 0; i < 12; i++) {
      date.setMonth(i)
      list.push({
        text: format
          .format(date)
          .replace(/^./, (character) => character.toUpperCase()),
        value: i + 1
      })
    }
    return list
  }

  /**
     * Returns names of days of the week
     *
     * Возвращает названия дней недели
     * @param value the date to format / дата для форматирования
     * @param style the representation of the weekday / представление о дне недели
     */
  weekdayStatic (value, style) {
    return Intl.DateTimeFormat(this.codeStandard.value, { weekday: style || 'long' })
      .format(To_1.To.date(value))
  }

  /**
     * An array of the list of names of the days of the week
     *
     * Массив из списка названий дней недели
     * @param style the representation of the weekday / представление о дне недели
     */
  weekdaysStatic (style) {
    const date = new Date()
    const format = Intl.DateTimeFormat(this.codeStandard.value, { weekday: style || 'long' })
    const current = date.getDay() + (this.firstDay.value === 'Mo' ? -1 : 1)
    const list = [{
      text: '',
      value: undefined
    }]
    date.setDate(date.getDate() - current)
    for (let i = 0; i < 7; i++) {
      list.push({
        text: format
          .format(date)
          .replace(/^./, (character) => character.toUpperCase()),
        value: date.getDay()
      })
      date.setDate(date.getDate() + 1)
    }
    return list
  }

  /**
     * Time
     *
     * Время
     * @param value the date to format / дата для форматирования
     */
  timeStatic (value) {
    return this.dateStatic(value, 'time')
  }

  /**
     * Returns options for data according to its type
     *
     * Возвращает options для data по его типу
     * @param type type of data format / тип формата data
     * @param display the representation of the month / представление месяца
     */
  dateOptions (type, display = 'short') {
    const options = {}
    if (['datetime', 'date', undefined, 'month'].indexOf(type) !== -1) {
      options.year = 'numeric'
      options.month = display
    }
    if (['datetime', 'date', undefined].indexOf(type) !== -1) {
      options.day = '2-digit'
    }
    if (type !== undefined) {
      if (['datetime', 'time', 'second'].indexOf(type) !== -1) {
        options.hour = '2-digit'
        options.minute = '2-digit'
      }
      if (['second'].indexOf(type) !== -1) {
        options.second = '2-digit'
      }
    }
    return options
  }
}
exports.GeoIntlStatic = GeoIntlStatic
// # sourceMappingURL=GeoIntlStatic.js.map
