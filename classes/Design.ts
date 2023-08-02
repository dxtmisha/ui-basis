import { DesignProperties, PropertiesMapListType } from './DesignProperties'
import { ClassesExtraType, ClassesSubType, DesignClasses } from './DesignClasses'
import { DesignStyles, StylesExtraType } from './DesignStyles'

export interface DesignOptionsInterface<S extends ClassesSubType> {
  subclasses?: S
  extra?: ClassesExtraType
  styles?: StylesExtraType
}

/**
 * Class for managing data from tokens
 *
 * Класс для управления данными из токенов
 */
export class Design<S extends ClassesSubType> {
  private readonly properties: DesignProperties
  private readonly classes: DesignClasses<S>
  private readonly styles: DesignStyles

  /**
   * Constructor
   * @param name class name / название класса
   * @param props properties / свойства
   * @param map list of available properties / список доступных свойств
   * @param options list of additional parameters / список дополнительных параметров
   */
  constructor (
    name: string,
    props: Record<string, any>,
    map: PropertiesMapListType,
    options?: DesignOptionsInterface<S>
  ) {
    this.properties = new DesignProperties(map)

    this.classes = new DesignClasses(
      name,
      props,
      this.properties,
      options?.subclasses,
      options?.extra
    )

    this.styles = new DesignStyles(
      name,
      props,
      this.properties,
      options?.styles
    )
  }

  /**
   * Returns data for classes
   *
   * Возвращает данные для классов
   */
  getClasses () {
    return this.classes.get()
  }

  /**
   * Returns data for classes
   *
   * Возвращает данные для классов
   */
  getClassesRef () {
    return this.classes.classes
  }

  /**
   * Returns the class names for the status
   *
   * Возвращает название класса для статуса
   * @param names class name / название класса
   */
  getClassesByState (names: string[]) {
    return this.classes.getNameByState(names)
  }

  /**
   * Returns the class names for the status
   *
   * Возвращает название класса для статуса
   * @param names class name / название класса
   */
  getClassesBySubclass (names: string[]) {
    return this.classes.getNameBySubclass(names)
  }

  /**
   * Returns data for styles
   *
   * Возвращает данные для стилей
   */
  getStyles () {
    return this.styles.get()
  }

  /**
   * Returns data for styles
   *
   * Возвращает данные для стилей
   */
  getStylesRef () {
    return this.styles.styles
  }
}
