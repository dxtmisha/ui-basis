import { computed, ComputedRef, ref, Ref } from 'vue'
import { executeFunction, forEach } from '../functions/data'
import { getRef } from '../functions/ref'

import {
  DesignProperties,
  PropertiesItemType,
  PropertiesStateType
} from './DesignProperties'

import {
  AssociativeType,
  CallbackOrAnyType
} from '../constructors/types'
import { RefOrNormalType } from '../constructors/typesRef'

export type ClassesItemType = AssociativeType<boolean>

export type ClassesSubClassesType = Record<string, string>
export type ClassesSubClassesListType<T> = Record<keyof T, ClassesItemType>

export type ClassesExtraType = CallbackOrAnyType<RefOrNormalType<boolean>>
export type ClassesExtraItemType = AssociativeType<ClassesExtraType>
export type ClassesExtraRefType = RefOrNormalType<ClassesExtraItemType>
export type ClassesExtraListType = AssociativeType<ClassesExtraRefType>

export type ClassesListType<T> = { main: ClassesItemType } & ClassesSubClassesListType<T>

const KEY_CLASS_CUSTOM = 'custom'

/**
 * Class for working with classes in a component
 *
 * Класс для работы с классами в компоненте
 */
export class DesignClasses<C extends ClassesSubClassesType = ClassesSubClassesType> {
  /**
   * List of subclasses
   *
   * Список подклассов
   * @protected
   */
  protected readonly subClasses = ref<C>()

  /**
   * List of additional classes
   *
   * Список дополнительных классов
   * @protected
   */
  protected readonly extra = ref<ClassesExtraListType>({})

  /**
   * Constructor
   * @param name class name / название класса
   * @param properties list of available properties / список доступных свойств
   * @param props properties / свойства
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly name: Ref<string>,
    protected readonly properties: DesignProperties,
    protected readonly props: AssociativeType
  ) {
  }

  /**
   * Returns a list of all active classes
   *
   * Возвращает список всех активных классов
   */
  get (): ClassesListType<C> {
    return this.classes.value
  }

  /**
   * Returns a list of all active classes
   *
   * Возвращает список всех активных классов
   */
  getItem (): ComputedRef<ClassesListType<C>> {
    return this.classes
  }

  /**
   * Returns the base class name
   *
   * Возвращает базовое название класса
   */
  getName (): string {
    return this.name.value || 'design-component'
  }

  /**
   * Returns the class names for the status
   *
   * Возвращает название класса для статуса
   * @param names class name / название класса
   */
  getNameByState (names: string[]) {
    return this.jsonState([this.getName(), ...names])
  }

  /**
   * Возвращает название класса для подкласса
   *
   * Returns the class names for the subclass
   * @param names class name / название класса
   */
  getNameBySubclass (names: string[]) {
    return this.jsonSubclass([this.getName(), ...names])
  }

  /**
   * Modifying the list of subclasses
   *
   * Изменение списка подклассов
   * @param classes list of subclass values / список значений подкласса
   */
  setSubClasses (classes: C): this {
    this.subClasses.value = classes
    return this
  }

  /**
   * Adding additional classes
   *
   * Добавление дополнительных классов
   * @param data list of additional classes / список дополнительных классов
   */
  setExtra (data: ClassesExtraListType): this {
    this.extra.value = data
    return this
  }

  /**
   * Adding additional classes for the base class
   * Добавление дополнительных классов для базового класса
   * @param data list of additional classes / список дополнительных классов
   */
  setExtraMain (data: ClassesExtraRefType): this {
    this.extra.value.main = data
    return this
  }

  /**
   * An object with a full list of classes for work
   *
   * Объект с полным списком классов для работы
   * @protected
   */
  protected classes = computed<ClassesListType<C>>(
    () => {
      return {
        main: {
          ...this.classesMain.value,
          ...this.classesProperties.value
        },
        ...this.classesSubClasses.value
      }
    }
  )

  /**
   * An object containing all the classes for working with basic data types
   *
   * Объект, содержащий все классы для работы с базовыми типами данных
   * @protected
   */
  protected classesMain = computed<ClassesItemType>(
    () => {
      return {
        [this.getName()]: true,
        ...this.getExtraByName('main')
      }
    }
  )

  /**
   * List of active state classes
   *
   * Список активных классов состояний
   * @protected
   */
  protected classesProperties = computed<ClassesItemType>(() => {
    const data: ClassesItemType = {}

    this.properties.get()?.forEach(
      item => Object.assign(data, this.toClassName(item))
    )

    return data
  })

  protected classesSubClasses = computed<ClassesSubClassesListType<C>>(() => {
    const classBasic = this.getName()
    const classes: ClassesSubClassesListType<C> = {} as ClassesSubClassesListType<C>

    if (this.subClasses.value) {
      forEach(this.subClasses.value, (name, index) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        classes[index] = {
          [this.jsonSubclass([classBasic, name])]: true,
          ...this.getExtraByName('name')
        }
      })
    }

    return classes
  })

  /**
   * Returns additional parameters by their name
   *
   * Возвращает дополнительные параметры по их имени
   * @param name element name / имя элемента
   * @protected
   */
  protected getExtraByName (name: string): AssociativeType<boolean> {
    const extra: AssociativeType<boolean> = {}

    forEach(
      getRef(this.extra.value?.[name]),
      (item, index) => {
        extra[index] = getRef(executeFunction(item))
      }
    )

    return extra
  }

  /**
   * Generating a class name based on its property
   *
   * Формирование названия класса по его свойству
   * @param item current property / текущее свойство
   * @param className array of class names / массив с названиями классов
   * @protected
   */
  protected toClassName (
    item: PropertiesItemType | PropertiesStateType,
    className: string[] = [this.getName()]
  ): ClassesItemType {
    const prop = this.props?.[item.name]
    const is = this.properties.isValue(item, prop)
    const classes: ClassesItemType = {}

    className.push(item.index)

    if (
      (
        is && (
          prop === true ||
          this.properties.isBool(item)
        ) &&
        this.checkByCategory(item)
      ) ||
      this.properties.isExceptions(item, prop)
    ) {
      this.toClassNameByState(classes, item, className)
    }

    if (
      is &&
      typeof prop === 'string'
    ) {
      classes[this.jsonState([...this.getClassName(item, className), prop])] = true
    } else if (this.properties.isStyle(item, prop)) {
      classes[this.jsonState([...this.getClassName(item, className), KEY_CLASS_CUSTOM])] = true
    }

    return classes
  }

  /**
   * A class for generating the class name recursively based on the state tree array
   *
   * Класс для генерации названия класса в глубину по массиву дерева состояния
   * @param data list of active classes / список активных классов
   * @param item current property / текущее свойство
   * @param className array of class names / массив с названиями классов
   * @protected
   */
  protected toClassNameByState (
    data: ClassesItemType,
    item: PropertiesItemType | PropertiesStateType,
    className: string[]
  ): this {
    const index = this.jsonState(this.getClassName(item, className))

    data[index] = true
    item.state?.forEach(
      state => Object.assign(data, this.toClassName(state, [index]))
    )

    return this
  }

  /**
   * Returns the class name for the current element
   *
   * Возвращает имя класса для текущего элемента
   * @param item current property / текущее свойство
   * @param className array of class names / массив с названиями классов
   * @private
   */
  private getClassName (
    item: PropertiesItemType | PropertiesStateType,
    className: string[]
  ): string[] {
    if (
      'className' in item && item.className
    ) {
      return [item.className]
    } else {
      return className
    }
  }

  /**
   * Checks if there are similar elements by property, if there are, then does not add a class for work
   *
   * Проверяет, есть ли схожие элементы по свойству, если есть, то не добавляет класс для работы
   * @param item current property / текущее свойство
   * @private
   */
  private checkByCategory (item: PropertiesItemType | PropertiesStateType) {
    if (this.properties.isDefault(item)) {
      const category = this.properties.getCategoryName(item)

      if (category) {
        let active = true

        this.properties.getByCategory(category)
          ?.forEach(property => {
            if (
              item.name !== property.name &&
              this.props?.[property.name]
            ) {
              active = false
            }
          })

        return active
      }
    }

    return true
  }

  /**
   * Concatenates class names into a string for state classes
   *
   * Соединяем названия классов в строку для классов состояния
   * @param classes array to class name / массив в название класса
   * @private
   */
  private jsonState (classes: string[]): string {
    return classes.join('--')
  }

  /**
   * Concatenates class names into a string for additional classes
   *
   * Соединяем названия классов в строку для дополнительных классов
   * @param classes array to class name / массив в название класса
   * @private
   */
  private jsonSubclass (classes: string[]): string {
    return classes.join('__')
  }
}
