import { StorageAbstract } from './StorageAbstract'
import { CookieCollect, CookieItemType, CookieSameSiteType } from './CookieCollect'

/**
 * Class for working with cookies
 *
 * Класс для управления Cookie
 */
export class Cookie extends StorageAbstract<string> {
  protected readonly item: CookieItemType

  /**
   * Constructor
   * @param key key name / названия ключа
   * @param defaultValue default values / значения по умолчанию
   */
  constructor (
    key: string,
    defaultValue?: string | (() => string)
  ) {
    const item = CookieCollect.get(key)

    super(key, item.item, defaultValue)
    this.item = item

    if (objects.has(key)) {
      return objects.get(key) as Cookie
    }
  }

  /**
   * Send a cookie
   *
   * Отправляет cookie
   * @param value the value of the cookie / значение cookie
   * @param age the time the cookie expires / время, когда срок действия
   * cookie истекает
   * @param sameSite the value of the sameSite element should be either None,
   * Lax or Strict / значение элемента sameSite должно быть либо None, либо Lax,
   * либо Strict
   * @param argument an associative array which may have any of the keys expires,
   * path, domain, secure, httponly and sameSite / ассоциативный массив (array), который
   * может иметь любой из ключей: expires, path, domain, secure, httponly и sameSite
   */
  set (
    value: string,
    age?: number,
    sameSite?: CookieSameSiteType,
    argument?: Array<string>
  ): this {
    this.setAge(age)
      .setSameSite(sameSite)
      .setArgument(argument)

    super.set(value.toString().trim())

    return this
  }

  /**
   * The time the cookie expires
   *
   * Время, когда срок действия cookie истекает
   * @param value new values / новые значения
   * @private
   */
  private setAge (value?: number): this {
    if (value !== undefined) {
      this.item.age = value
    }

    return this
  }

  /**
   * Prevents the browser from sending this cookie along with cross-site requests.
   * Possible values for the flag are lax or strict.
   *
   * Не позволяет браузеру отправлять этот файл cookie вместе с межсайтовыми запросами.
   * Возможные значения флага: lax или strict.
   * @param value new values / новые значения
   * @private
   */
  private setSameSite (value?: CookieSameSiteType): this {
    if (value !== undefined) {
      this.item.sameSite = value
    }

    return this
  }

  /**
   * Changes of properties of the writing cookie
   *
   * Изменения свойств записывающего cookie
   * @param value new values / новые значения
   * @private
   */
  private setArgument (value?: Array<string>): this {
    if (value !== undefined) {
      this.item.argument = value
    }

    return this
  }
}

const objects = new Map<string, Cookie>()
