import { StorageAbstract } from './StorageAbstract'

import { StorageItemType } from './StorageData'

/**
 * Abstract class for working with storage
 *
 * Абстрактный класс для работы с хранилищем
 */
export abstract class StorageItemAbstract<T = any> extends StorageAbstract<T> {
  protected readonly item: StorageItemType<T>
}
