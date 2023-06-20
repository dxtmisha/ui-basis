'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.GeoPhone = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
const Geo_1 = require('./Geo')
const GeoAbstract_1 = require('./GeoAbstract')
const GeoFlag_1 = require('./GeoFlag')
/**
 * Class for working with phone numbers
 *
 * Класс для работы с номерами телефонов
 */
class GeoPhone extends GeoAbstract_1.GeoAbstract {
  static list
  static map
  item = (0, vue_1.ref)(undefined)
  phone = (0, vue_1.ref)('')
  /**
     * Constructor
     * @param code country and language code / код страны и языка
     * @param phone phone number / номер телефона
     */
  constructor (code, phone) {
    super(code)
    if (phone) {
      this.set(phone)
    }
  }

  /**
     * Getting an object with information about the phone code and country
     *
     * Получение объекта с информацией о телефонном коде и стране
     */
  getInfo () {
    return (0, vue_1.computed)(() => this.getInfoStatic())
  }

  /**
     * Getting an object with information about the phone code and country
     *
     * Получение объекта с информацией о телефонном коде и стране
     */
  getInfoStatic () {
    return GeoPhone.list.value.find(item => this.country.value === item.value)
  }

  /**
     * Returns a mask
     *
     * Возвращает маску
     */
  getMask () {
    return (0, vue_1.computed)(() => this.getMaskStatic())
  }

  /**
     * Getting a phone mask
     *
     * Получение маски телефона
     */
  getMaskStatic () {
    return this.getInfoStatic()?.mask
  }

  /**
     * Changing data by phone number
     *
     * Изменение данных по номеру телефона
     * @param phone phone number / номер телефон
     */
  set (phone) {
    const data = GeoPhone.getItemByPhone(phone)
    if (data.item) {
      this.item.value = data.item
      this.phone.value = data.value
    } else {
      this.item.value = undefined
      this.phone.value = ''
    }
    return this
  }

  /**
     * Convert to phone mask
     *
     * Преобразовать в маску телефона
     */
  toMask () {
    return (0, vue_1.computed)(() => {
      let data = ''
      if (this.phone.value !== '') {
        const length = this.phone.value.length
        if (this.item.value?.mask) {
          for (const mask of this.item.value.mask) {
            if (mask.replace(/[^*]+/ig, '').length === length) {
              let character = 0
              data = mask.replace(/\*/ig, () => this.phone.value[character++])
              break
            }
          }
        }
      }
      return data === '' ? `+${this.data.value?.phone}${this.phone.value}` : data
    })
  }

  /**
     * Getting information by phone
     *
     * Получение информации по телефону
     * @param phone phone number / номер телефон
     */
  static getItemByPhone (phone) {
    let focus = this.map.value
    let value
    let valuePhone = ''
    this.toNumber(phone).forEach(number => {
      if (valuePhone === '' &&
                number in focus &&
                focus[number].code) {
        value = focus[number]
        focus = focus[number].next
      } else {
        valuePhone += number
      }
    })
    return {
      item: value,
      value: valuePhone
    }
  }

  /**
     * Returns an instance of the GeoPhone class for the specified phone number
     *
     * Возвращает экземпляр класса GeoPhone для указанного номера телефона
     * @param phone phone number / номер телефона
     */
  static getObjectByPhone (phone) {
    const data = this.getItemByPhone(phone)
    return new GeoPhone(data.item?.code, phone)
  }

  /**
     * Creating a list for the map
     *
     * Формирование списка для карты
     * @protected
     */
  static initList () {
    this.list = (0, vue_1.computed)(() => {
      const collator = new Intl.Collator(Geo_1.Geo.code.value)
      const data = (0, data_1.forEach)(Geo_1.Geo.getBase(), (item) => {
        const flag = new GeoFlag_1.GeoFlag().get(item.country).value
        if (item?.phoneMask && flag) {
          const mask = Array.isArray(item.phoneMask) ? item.phoneMask : [item.phoneMask]
          return {
            icon: flag.icon,
            text: flag.country,
            country: flag.country,
            language: flag.language,
            value: flag.value,
            phone: item.phone ? parseInt(item.phone) : undefined,
            mask
          }
        } else {
          return undefined
        }
      }, true)
      return data.sort((a, b) => collator.compare(a.country, b.country))
    })
  }

  /**
     * Creating a map for search
     *
     * Создание карты для поиска
     * @protected
     */
  static initMap () {
    this.map = (0, vue_1.computed)(() => {
      const data = {}
      this.list.value.forEach((item) => {
        item.mask.forEach((mask) => {
          let focus = data
          let value
          this.toNumber(mask).forEach((number) => {
            if (!(number in focus)) {
              focus[number] = {
                code: undefined,
                info: undefined,
                items: [],
                mask: [],
                maskFull: [],
                next: {}
              }
            }
            value = focus[number]
            focus = focus[number].next
          })
          if (value) {
            if (value.code === undefined) {
              value.code = item.value
              value.info = item
            }
            value.mask.push(mask)
            value.maskFull.push(mask.replace(/\d/ig, '*'))
            value.items.push(item)
          }
        })
      })
      return data
    })
  }

  /**
     * The method parses a string argument and returns a floating point number
     *
     * Метод принимает строку в качестве аргумента и возвращает десятичное число
     * @param value the value to parse / текстовая строка
     */
  static toNumber (value) {
    return value
      .replace(/\D+/ig, '')
      .split('')
  }

  static {
    this.initList()
    this.initMap()
  }
}
exports.GeoPhone = GeoPhone
// # sourceMappingURL=GeoPhone.js.map
