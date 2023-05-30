'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.GeoIntl = void 0
const vue_1 = require('vue')
const ref_1 = require('../functions/ref')
const GeoIntlStatic_1 = require('./GeoIntlStatic')
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
class GeoIntl extends GeoIntlStatic_1.GeoIntlStatic {
  /**
     * The consistent translation of language, region and script display names
     *
     * Последовательный перевод отображаемых названий языка, региона и скрипта
     * @param value the code to provide depends on the type / предоставляемый код зависит от типа
     * @param typeOptions an object with some or all of the following properties / объект
     * с некоторыми или всеми из следующих свойств
     */
  display (value, typeOptions) {
    return (0, vue_1.computed)(() => this.displayStatic((0, ref_1.getRef)(value), typeOptions))
  }

  /**
     * Get display names of language
     *
     * Получить отображаемые имена языка
     * @param value the code to provide depends on the type / предоставляемый код зависит от типа
     * @param style the formatting style to use / используемый стиль форматирования
     */
  language (value, style) {
    return (0, vue_1.computed)(() => this.languageStatic((0, ref_1.getRef)(value), style))
  }

  /**
     * Get display names of region
     *
     * Получить отображаемые имена региона
     * @param value the code to provide depends on the type / предоставляемый код зависит от типа
     * @param style the formatting style to use / используемый стиль форматирования
     */
  countryName (value, style) {
    return (0, vue_1.computed)(() => this.countryNameStatic((0, ref_1.getRef)(value), style))
  }

  /**
     * In basic use without specifying a locale, a formatted string
     *
     * При обычном использовании без указания локали форматированная строка
     * @param value a number, bigint, or string, to format / число для форматирования
     * @param options an object with some or all properties / объект с некоторыми
     * или всеми свойствами
     */
  number (value, options) {
    return (0, vue_1.computed)(() => this.numberStatic((0, ref_1.getRef)(value), options))
  }

  /**
     * Символ десятичная дробь
     * @protected
     */
  numberDecimal () {
    return (0, vue_1.computed)(() => this.numberDecimalStatic())
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
  currency (value, currencyOptions, numberOnly = false) {
    return (0, vue_1.computed)(() => this.currencyStatic((0, ref_1.getRef)(value), currencyOptions, numberOnly))
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
  unit (value, unitOptions) {
    return (0, vue_1.computed)(() => this.unitStatic((0, ref_1.getRef)(value), unitOptions))
  }

  /**
     * Number as a percentage
     *
     * Число в виде процента
     * @param value a number, bigint, or string, to format / число для форматирования
     * @param options an object with some or all properties / объект с некоторыми
     * или всеми свойствами
     */
  percent (value, options) {
    return (0, vue_1.computed)(() => this.percentStatic((0, ref_1.getRef)(value), options))
  }

  /**
     * Number as a percentage (unit)
     *
     * Число в виде процента (единица)
     * @param value a number, bigint, or string, to format / число для форматирования
     * @param options an object with some or all properties / объект с некоторыми
     * или всеми свойствами
     */
  percentBy100 (value, options) {
    return (0, vue_1.computed)(() => this.percentStaticBy100((0, ref_1.getRef)(value), options))
  }

  /**
     * Enables language-sensitive relative time formatting
     *
     * Включает форматирование относительного времени с учетом языка
     * @param value a number, bigint, or string, to format / число для форматирования
     * @param styleTodayOptions the length of the internationalized message / длина
     * интернационализированного сообщения
     * @param todayValue current day / текущий день
     */
  relative (value, styleTodayOptions, todayValue) {
    return (0, vue_1.computed)(() => {
      if (styleTodayOptions instanceof Date) {
        return this.relativeStatic((0, ref_1.getRef)(value), undefined, styleTodayOptions)
      } else {
        return this.relativeStatic((0, ref_1.getRef)(value), styleTodayOptions, todayValue)
      }
    })
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
  date (value, type, styleOptions, hour24) {
    return (0, vue_1.computed)(() => this.dateStatic((0, ref_1.getRef)(value), type, styleOptions, hour24))
  }

  /**
     * Names of months
     *
     * Названия месяцев
     * @param value the date to format / дата для форматирования
     * @param style the representation of the month / представление месяца
     */
  month (value, style) {
    return (0, vue_1.computed)(() => this.monthStatic((0, ref_1.getRef)(value), style))
  }

  /**
     * Array to list of months
     *
     * Массив в список месяцев
     * @param style the representation of the month / представление месяца
     */
  months (style) {
    return (0, vue_1.computed)(() => this.monthsStatic(style))
  }

  /**
     * Returns names of days of the week
     *
     * Возвращает названия дней недели
     * @param value the date to format / дата для форматирования
     * @param style the representation of the weekday / представление о дне недели
     */
  weekday (value, style) {
    return (0, vue_1.computed)(() => this.weekdayStatic((0, ref_1.getRef)(value), style))
  }

  /**
     * An array of the list of names of the days of the week
     *
     * Массив из списка названий дней недели
     * @param style the representation of the weekday / представление о дне недели
     */
  weekdays (style) {
    return (0, vue_1.computed)(() => this.weekdaysStatic(style))
  }

  /**
     * Time
     *
     * Время
     * @param value the date to format / дата для форматирования
     */
  time (value) {
    return (0, vue_1.computed)(() => this.timeStatic((0, ref_1.getRef)(value)))
  }
}
exports.GeoIntl = GeoIntl
// # sourceMappingURL=GeoIntl.js.map
