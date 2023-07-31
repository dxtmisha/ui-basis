import { computed, ComputedRef } from 'vue'
import { forEach } from '../functions/data'
import { getRef } from '../functions/ref'

import { CacheLive } from './CacheLive'

import { DesignProperties, PropertiesMixinType } from './DesignProperties'

import { RefOrNormalType } from '../constructors/typesRef'

export type ClassesSubType = Record<string, string>
export type ClassesSubListType<S extends ClassesSubType> = Record<keyof S, string>

export type ClassesExtraInputType = RefOrNormalType<boolean>
export type ClassesExtraType = Record<string, ClassesExtraInputType>

export type ClassesListType<S extends ClassesSubType> = { main: string[] } & ClassesSubListType<S>

const KEY_CLASS_CUSTOM = 'custom'

/**
 * Class for working with classes in a component
 *
 * Класс для работы с классами в компоненте
 */
export class DesignClasses<S extends ClassesSubType = ClassesSubType> {
  private readonly subclasses: ClassesSubListType<S>

  /**
   * Constructor
   * @param name class name / название класса
   * @param props properties / свойства
   * @param properties list of available properties / список доступных свойств
   * @param subclasses list of subclasses / Список подклассов
   * @param extra TODO
   */
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly name: string,
    private readonly props: Record<string, any>,
    private readonly properties: DesignProperties,
    subclasses?: S,
    private readonly extra?: ClassesExtraType
  ) {
    this.subclasses = this.initSubclasses(name, subclasses)
  }

  /**
   * An object with a full list of classes for work
   *
   * Объект с полным списком классов для работы
   */
  classes = computed<ClassesListType<S>>(
    () => {
      return {
        main: [
          ...this.main.value,
          ...this.getClassesProperties()
        ],
        ...this.subclasses
      }
    }
  )

  /**
   * Returns a list of all active classes
   *
   * Возвращает список всех активных классов
   */
  get (): ClassesListType<S> {
    return this.classes.value
  }

  /**
   * Returns the base class name
   *
   * Возвращает базовое название класса
   */
  getName (): string {
    return this.name
  }

  /**
   * Returns the class names for the status
   *
   * Возвращает название класса для статуса
   * @param names class name / название класса
   */
  getNameByState (names: string[]): string {
    return this.jsonState([this.name, ...names])
  }

  /**
   * Возвращает название класса для подкласса
   *
   * Returns the class names for the subclass
   * @param names class name / название класса
   */
  getNameBySubclass (names: string[]) {
    return this.jsonSubclass([this.name, ...names])
  }

  /**
   * Returns the names of classes and their values by the list
   *
   * Возвращает название классов и их значения по списку
   * @param values list of classes and their names / список классов и их названия
   */
  getListByState (values: Record<string, RefOrNormalType<boolean>>): ComputedRef<string[]> {
    return computed<string[]>(
      () => forEach(values, (item, index) => {
        if (getRef(item)) {
          return this.getNameByState([index.toString()])
        }

        return undefined
      }, true) as string[]
    )
  }

  /**
   * Concatenates class names into a string for state classes
   *
   * Соединяем названия классов в строку для классов состояния
   * @param classes array to class name / массив в название класса
   */
  jsonState (classes: string[]): string {
    return classes.join('--')
  }

  /**
   * Concatenates class names into a string for additional classes
   *
   * Соединяем названия классов в строку для дополнительных классов
   * @param classes array to class name / массив в название класса
   */
  jsonSubclass (classes: string[]): string {
    return classes.join('__')
  }

  /**
   * An object containing all the classes for working with basic data types
   *
   * Объект, содержащий все классы для работы с базовыми типами данных
   * @private
   */
  private main = computed<string[]>(() => {
    const classes = [this.name]

    if (this.extra) {
      forEach<ClassesExtraInputType, string, void>(this.extra, (item, name) => {
        if (getRef(item)) {
          classes.push(name)
        }
      })
    }

    return classes
  })

  /**
   * TODO
   * @param name
   * @param subclasses
   * @private
   */
  private initSubclasses (name: string, subclasses?: S): ClassesSubListType<S> {
    if (subclasses) {
      const list: ClassesSubListType<S> = {} as S

      forEach<string, keyof S, void>(subclasses, (className, index) => {
        list[index] = this.jsonSubclass([name, className])
      })

      return list
    } else {
      return {} as S
    }
  }

  /**
   * List of active state classes
   *
   * Список активных классов состояний
   * @private
   */
  private getClassesProperties () {
    return CacheLive.get(this.getPropsActive(),
      () => forEach(
        this.properties.get(),
        item => [...this.getClassList(item)]
      )
    )
  }

  /**
   * Returns a string for the cache of the element state
   *
   * Возвращает строку для кэша состояния элемента
   * @private
   */
  private getPropsActive (): string {
    let data: string = this.name

    this.properties.get()
      .forEach(({ name }) => {
        if (this.props?.[name]) {
          data += `|${name}:${this.props[name]}`
        }
      })

    return data
  }

  /**
   * Generating a class name based on its property
   *
   * Формирование названия класса по его свойству
   * @param item current property / текущее свойство
   * @param className array of class names / массив с названиями классов
   * @private
   */
  private getClassList (
    item: PropertiesMixinType,
    className: string[] = [this.name]
  ): string[] {
    const prop = this.props?.[item.name]
    const is = this.properties.isValue(item, prop)
    const list: string[] = []

    className = [...this.getClassNameByList(item, className), item.index]

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
      list.push(this.jsonState(className))
    }

    if (is) {
      if (typeof prop === 'string') {
        list.push(this.jsonState([...className, prop]))
      } else if (this.checkByCategory(item)) {
        item.state?.forEach(
          state => list.push(...this.getClassList(state, className))
        )
      }
    } else if (this.properties.isStyle(item, prop)) {
      list.push(this.jsonState([...className, KEY_CLASS_CUSTOM]))
    }

    return list
  }

  /**
   * Returns the class name for the current element
   *
   * Возвращает имя класса для текущего элемента
   * @param item current property / текущее свойство
   * @param className array of class names / массив с названиями классов
   * @private
   */
  private getClassNameByList (
    item: PropertiesMixinType,
    className: string[]
  ): string[] {
    if ('className' in item && item?.className) {
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
  private checkByCategory (item: PropertiesMixinType) {
    if (this.properties.isDefault(item)) {
      const category = this.properties.getCategoryName(item)

      if (category) {
        for (const property of this.properties.getByCategory(category)) {
          if (
            item.name !== property.name &&
            this.props?.[property.name]
          ) {
            return false
          }
        }
      }
    }

    return true
  }
}
