import { isFilled } from '../functions/data'

import { ClassesExtraType, ClassesSubType, DesignClasses } from './DesignClasses'
import { DesignProperties, PropertiesMapListType } from './DesignProperties'

/**
 * TODO
 */
export class Design<S extends ClassesSubType = ClassesSubType> {
  private readonly properties?: DesignProperties
  private readonly classes?: DesignClasses<S>

  /**
   * Constructor
   * @param name class name / название класса
   * @param props properties / свойства
   * @param map list of available properties / список доступных свойств
   * @param subclasses list of subclasses / Список подклассов
   * @param extra TODO
   */
  constructor (
    name: string,
    props: Record<string, any>,
    map?: PropertiesMapListType,
    subclasses?: S,
    extra?: ClassesExtraType
  ) {
    if (map && isFilled(map)) {
      this.properties = new DesignProperties(map)
      this.classes = new DesignClasses(
        name,
        props,
        this.properties,
        subclasses,
        extra
      )
    }
  }

  /**
   * TODO
   */
  getClass () {
    return this.classes?.classes
  }
}
