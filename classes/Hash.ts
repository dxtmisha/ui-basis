import { StorageAbstract } from './StorageAbstract'
import { HashCollect } from './HashCollect'

/**
 * Working with data stored in hash
 *
 * Работа с данными сохраненными в хеш
 */
export class Hash extends StorageAbstract<string> {
  constructor (
    key: string,
    defaultValue?: string | (() => string)
  ) {
    if (objects.has(key)) {
      return objects.get(key) as Hash
    }

    super(key, HashCollect.get(key), defaultValue)

    objects.set(key, this)
  }
}

const objects = new Map<string, Hash>()
