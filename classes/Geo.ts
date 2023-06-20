import { computed, ref } from 'vue'
import { isFilled } from '../functions/data'
import { Env } from './Env'
import { StorageItem } from './StorageItem'

import * as geo from '../constructors/geo.json'

import { RefOrNormalType } from '../constructors/typesRef'

export type GeoCodeType = RefOrNormalType<string>
export type GeoDateType = 'datetime' | 'date' | 'month' | 'time' | 'second'
export type GeoFirstDayType = 1 | 6 | 0
export type GeoHoursType = '12' | '24'
export type GeoTimeZoneStyleType = 'minute' | 'hour' | 'ISO8601' | 'RFC'

export interface GeoType {
  country: string
  countryAlternative?: string[]
  firstDay?: string | null
  language: string
  languageAlternative?: string[]
  phone?: string
  phoneMask?: string | string[]
  zone?: string | null
}

/**
 * Base class for working with geographic data
 *
 * Базовый класс для работы с географическими данными
 */
export class Geo {
  protected static storage: StorageItem
  protected static focusLanguage = ref<string>('en')

  /**
   * Information about the current country
   *
   * Информация об текущей стране
   */
  public static readonly data = ref<GeoType | undefined>()

  /**
   * Current language
   *
   * Текущий язык
   */
  public static readonly lang = computed<string>(
    () => this.focusLanguage.value || this.data.value?.language || this.findLanguage() || 'en'
  )

  /**
   * Current country
   *
   * Текущая страна
   */
  public static readonly country = computed<string>(
    () => this.data.value?.country || this.findCountry() || 'GB'
  )

  /**
   * Full format
   *
   * Полный формат
   */
  public static readonly code = computed<string>(
    () => `${this.lang.value}-${this.country.value}`
  )

  /**
   * Full format according to the standard
   *
   * Полный формат согласно стандарту
   */
  public static readonly codeStandard = computed<string>(() => {
    const lang = Geo.getDataByLanguage(this.lang.value)
    return `${lang?.language || this.lang.value}-${this.country.value}`
  })

  /**
   * First day of the week
   *
   * Первый день недели
   */
  public static readonly firstDay = computed<string>(() => this.data.value?.firstDay || 'Mo')

  /**
   * Determines the current location
   *
   * Определяет текущую локацию
   */
  static findLocation (): string {
    return this.storage.get().value ||
      document.querySelector('html')?.lang ||
      navigator.language ||
      navigator.languages[0] ||
      Env.language() ||
      'en-GB'
  }

  /**
   * Determines the current language
   *
   * Определяет текущий язык
   */
  static findLanguage (): string {
    return this.toLanguage(this.findLocation())
  }

  /**
   * Determines the current country
   *
   * Определяет текущую страну
   */
  static findCountry (): string {
    return this.toCountry(this.findLocation())
  }

  /**
   * Determines the current country by its full name
   *
   * Определяет текущую страну по ее полному названию
   * @param code country code, full form language-country or one of them / код
   * страны, полный вид язык-страна или один из них
   */
  static findData (code?: string): GeoType | undefined {
    if (code) {
      return this.getDataByCode(code) || this.getDataByCountry(this.toCountry(code))
    } else {
      return this.data.value
    }
  }

  /**
   * Returns the full list of countries
   *
   * Возвращает полный список стран
   */
  static getBase (): GeoType[] {
    return geo
  }

  /**
   * Returns the full data by language and country
   *
   * Возвращает полные данные по языку и стране
   * @param code string in the form of language-country / строка в виде язык-страна
   */
  static getData (code: string): GeoType | undefined {
    return geo?.find(item => `${item?.language}-${item?.country}` === code)
  }

  /**
   * Returns the full data by language
   *
   * Возвращает полные данные по языку
   * @param language language / язык
   */
  static getDataByLanguage (language: string): GeoType | undefined {
    return geo?.find(item => {
      return item?.language === language ||
        item?.languageAlternative?.find(languageAlternative => languageAlternative === language)
    })
  }

  /**
   * Returns the full data by country
   *
   * Возвращает полные данные по стране
   * @param country country / страна
   */
  static getDataByCountry (country: string): GeoType | undefined {
    return geo?.find(item => {
      return item?.country === country ||
        item?.countryAlternative?.find(countryAlternative => countryAlternative === country)
    })
  }

  /**
   * Returns the data about the country by its full code
   *
   * Возвращает данные о стране по ее полному коду
   * @param code country code, full form language-country or one of them / код
   * страны, полный вид язык-страна или один из них
   */
  static getDataByCode (code?: string): GeoType | undefined {
    let data: GeoType | undefined

    if (code) {
      if (code.match(/-/)) {
        data = this.getData(code)
      } else if (code.match(/^[a-z]{2}$/)) {
        data = this.getDataByLanguage(code)
      } else if (code.match(/^[A-Z]{2}$/)) {
        data = this.getDataByCountry(code)
      }
    }

    return data
  }

  /**
   * Returns the language code by its full language-country
   *
   * Возвращает код языка по его полному язык-страна
   * @param code country code / код страна
   */
  static toLanguage (code: string): string {
    return code.replace(/[^a-z]+/g, '')
  }

  /**
   * Returns the country code by its full language-country
   *
   * Возвращает код страны по ее полному язык-страна
   * @param code country code / код страна
   */
  static toCountry (code: string): string {
    return code.replace(/[^A-Z]+/g, '')
  }

  /**
   * We get the full code by the data of the country
   *
   * Получаем полный код по данным страны
   * @param data data / данный
   */
  static toCode (data?: GeoType): string | undefined {
    return data ? `${data?.language}-${data?.country}` : undefined
  }

  /**
   * Changes the data by the full code
   *
   * Изменяет данные по полному коду
   * @param code country code, full form language-country or one of them / код
   * страны, полный вид язык-страна или один из них
   * @param save save the result / сохранить результат
   */
  static set (code: string, save?: boolean): void {
    const data = this.findData(code)
    const language = this.toLanguage(code)

    this.data.value = {
      ...(data || this.getDataByCountry(this.findCountry()))
    } as GeoType

    if (data && save) {
      this.storage.set(code)
    }

    this.focusLanguage.value = isFilled(language) ? language : this.data.value?.language
  }

  /**
   * Changes language
   *
   * Изменяет язык
   * @param language language / язык
   * @param save save the result / сохранить результат
   */
  static setLanguage (language: string, save?: boolean) {
    this.set(`${language}-${this.country.value}`, save)
  }

  /**
   * Changes the country
   *
   * Изменяет страну
   * @param country language / язык
   * @param save save the result / сохранить результат
   */
  static setCountry (country: string, save?: boolean) {
    this.set(`${this.lang.value}-${country}`, save)
  }

  static {
    this.storage = new StorageItem('geo-code')
    this.set(this.findLocation())
  }
}
