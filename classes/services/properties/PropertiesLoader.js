const {
  forEach,
  isFilled,
  isObject,
  uniqueArray
} = require('../../../functions/data')
const { To } = require('../../To')

const Properties = require('./Properties')

const Cache = require('./PropertiesCache')
const Files = require('./PropertiesFiles')
const Keys = require('./PropertiesKeys')
const Type = require('./PropertiesType')

const FILE_NAME = 'property'

/**
 * List available for addition to props
 *
 * Список доступный для добавления в props
 * @type {string[]}
 */
const LIST_PROPS = [
  'disabled',
  'focus',
  'readonly',
  'read-only'
]

module.exports = class PropertiesLoader {
  /**
   * @type {{
   *   index: string,
   *   type: string,
   *   item:Object<string,*>,
   *   className?: string,
   *   state: Object<string,*>[]
   * }[]}
   */
  states

  /**
   * @type {Object<string,{
   *   index:string,
   *   name:string,
   *   type:string,
   *   className:string,
   *   value:(string|boolean)[],
   *   valueAll:(string|boolean)[],
   *   state:{
   *     index:string,
   *     name:string,
   *     value:(string|boolean)[],
   *     state:Object<string,*>[]
   *   }[],
   *   style?:boolean,
   *   default?:boolean,
   *   category?:string
   * }>}
   */
  properties

  /**
   * @type {Object<string,*>}
   */
  data

  /**
   * Constructor
   * @param {string} pathDesign design name / название дизайна
   * @param {string} component component name / название компонента
   */
  constructor (pathDesign, component = undefined) {
    if (pathDesign && component) {
      this.design = pathDesign
      this.component = component
    } else {
      const dirs = Files.splitForDir(pathDesign)

      this.design = To.kebabCase(dirs[dirs.length - 2])
      this.component = To.kebabCase(dirs[dirs.length - 1])
    }
  }

  get () {
    this.__init()
    return this.properties
  }

  getData () {
    this.__init()
    return this.data?.item?.value
  }

  getJson () {
    return JSON.stringify(Object.values(this.get()))
  }

  getName () {
    return `${this.design}-${this.component}`
  }

  getNameForStyle () {
    return `${this.design}.${this.component}`
  }

  getNameForFile () {
    return To.camelCaseFirst(this.getName())
  }

  /**
   * Returns the name of the design
   *
   * Возвращает название дизайна
   * @return {string}
   */
  getDesign () {
    return this.design
  }

  /**
   * Returns the name of the component
   *
   * Возвращает название компонента
   * @return {string}
   */
  getComponent () {
    return To.camelCaseFirst(this.component)
  }

  /**
   * Returns a list of classes
   *
   * Возвращает список классов
   * @param {Object<string,*>} data list of properties / список свойств
   * @param {string[]} parent Ancestor name / Название предка
   * @return {Object<string,string>}
   */
  getClasses (
    data = this.getData(),
    parent = []
  ) {
    const list = {}

    forEach(data, (item, name) => {
      if (this.__isClasses(item)) {
        const names = [...parent, name]

        list[To.camelCase(names.join('-'))] = names.join('__')
        Object.assign(list, this.getClasses(item?.value, names))
      }
    })

    return list
  }

  /**
   * Does this property belong to the class
   *
   * Является ли это свойство частью класса
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @return {boolean}
   * @private
   */
  __isClasses (item) {
    return item?.[Keys.variable] === Type.subclass || item?.[Keys.subclass]
  }

  /**
   * Генерация данный
   * @return {this}
   * @private
   */
  __init () {
    if (!this.properties) {
      const read = Cache.getBySize(
        [this.getName()],
        FILE_NAME,
        Cache.getPathComponent(this.getName()),
        (data) => {
          this.__initState(data?.item?.value)
            .__initMain()
            .__initValue()
            .__initValueAll()
            .__initValueUnique()
            .__initValueState()

          return {
            data,
            properties: this.properties
          }
        }
      )

      this.data = read.data
      this.properties = read.properties
    }

    return this
  }

  /**
   * Returns all available values
   *
   * Возвращает все доступные значения
   * @param {Object<string,*>} item array with all property records / массив со всеми записями свойств
   * @return {(string|boolean)[]}
   * @private
   */
  __getValue (item) {
    const value = []
    let isTrue = false

    forEach(item, (property, name) => {
      if (
        !(this.properties) ||
        !(name in this.properties) ||
        property?.[Keys.propsValue]
      ) {
        if (property?.[Keys.variable] === Type.state) {
          value.push(name)
        } else {
          isTrue = true
        }
      }
    })

    if (isTrue) {
      value.push(true)
    }

    return value
  }

  /**
   * Returns records that meet state conditions
   *
   * Возвращает записи, удовлетворяющие условиям состояния
   * @param {Object<string,*>} properties input data / входной данный
   * @return {this}
   */
  __initState (properties) {
    this.states = this.__getStateItem(properties)
    return this
  }

  /**
   * Returns records that meet state conditions
   *
   * Возвращает записи, удовлетворяющие условиям состояния
   * @param {Object<string,*>} properties input data / входной данный
   * @return {{
   *   index: string,
   *   type: string,
   *   item:Object<string,*>,
   *   className?: string,
   *   state: Object<string,*>[]
   * }[]}
   */
  __getStateItem (properties) {
    const state = []

    if (
      isFilled(properties) &&
      isObject(properties)
    ) {
      forEach(properties, (item, index) => {
        if (this.__isProps(item)) {
          state.push({
            index,
            type: Type.property,
            item,
            className: undefined,
            state: this.__getStateItem(item.value)
          })
        }

        if (this.__isLinkClass(item)) {
          const value = item?.[Keys.css] || item.value
          const link = this.__getClassState(value)

          if (link) {
            state.push({
              index,
              type: Type.linkClass,
              item: link,
              className: this.__getClass(value),
              state: this.__getStateItem(link.value)
            })
          }
        }
      })
    }

    return state
  }

  /**
   * Checks if the property is available for addition to props
   *
   * Проверяет, доступно ли свойство для добавления в props
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @return {boolean}
   * @private
   */
  __isProps (item) {
    const is = item?.[Keys.props]

    return is !== false && (
      is === true ||
      item?.[Keys.variable] === Type.state ||
      LIST_PROPS.indexOf(item?.[Keys.name]) !== -1
    )
  }

  /**
   * Checks whether the property is a reference to a class
   *
   * Проверяет, является ли свойство ссылкой на класс
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @return {boolean}
   * @private
   */
  __isLinkClass (item) {
    return item?.[Keys.variable] === Type.linkClass &&
      typeof item?.value === 'string'
  }

  /**
   * Transformations to a class name
   *
   * Преобразование в имя класса
   * @param {string} value values of properties from the value field / значения свойств из поля value
   * @return {string}
   * @private
   */
  __getClass (value) {
    return To.kebabCase(
      value
        .replace(/[{}]/g, '')
        .replace('.', '-')
        .replaceAll('.', '--')
    )
  }

  /**
   * Returns all properties of a component by its reference
   *
   * Возвращает все свойства компонента по его reference
   * @param {string} index link to a property / ссылка на свойство
   * @return {Object<string, *>}
   */
  __getClassState (index) {
    return new Properties().getBasic().getItemByIndex(index)
  }

  /**
   * Retrieves all properties for preparing data filling
   *
   * Получает все свойства для подготовки заполнения данными
   * @return {this}
   * @private
   */
  __initMain () {
    this.properties = {}

    this.states?.forEach(({
      index,
      type,
      item,
      className
    }) => {
      this.properties[index] = {
        index,
        name: this.__toName(item, index),
        type,
        className,
        value: [],
        valueAll: [],
        state: [],
        style: !!item?.[Keys.style],
        default: item?.[Keys.default],
        category: item?.[Keys.category]
      }
    })

    return this
  }

  /**
   * Returns a formatted string with the property name
   *
   * Возвращает отформатированную строку с названием свойства
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @param {string} name name of the name / название имени
   * @return {string}
   * @private
   */
  __toName (item, name) {
    return To.camelCase(item?.[Keys.rename] || name)
  }

  /**
   * Receives the default values
   *
   * Получает базовые значения
   * @return {this}
   * @private
   */
  __initValue () {
    this.states?.forEach(({
      index,
      item
    }) => {
      const value = this.__getValue(item?.value)

      this.properties[index].value.push(
        ...(isFilled(value) ? value : [true])
      )
    })

    return this
  }

  /**
   * Gets all possible values
   *
   * Получает всех возможных значения
   * @param {{
   *   index: string,
   *   type: string,
   *   item:Object<string,*>,
   *   className?: string,
   *   state?: *[]
   * }[]} state basic values / базовые значения
   * @return {this}
   * @private
   */
  __initValueAll (state = this.states) {
    state?.forEach(({
      index,
      item,
      state
    }) => {
      if (index in this.properties) {
        const value = this.__getValue(item?.value)
        this.properties[index].valueAll.push(...value)

        if (state && value.indexOf(true) !== -1) {
          this.__initValueAll(state)
        }
      }
    })

    return this
  }

  /**
   * Updates values by removing duplicates and updating the style property value
   *
   * Обновляет значения, удаляя все повторы и обновляя значения свойства style
   * @return {this}
   * @private
   */
  __initValueUnique () {
    forEach(this.properties, property => {
      property.valueAll = uniqueArray(property.valueAll)

      if (!isFilled(property.valueAll)) {
        property.valueAll = [true]
      }
    })

    return this
  }

  /**
   * Updates values in a map
   *
   * Обновляет значения в карте
   * @param {{
   *   index: string,
   *   type: string,
   *   item:Object<string,*>,
   *   className?: string,
   *   state?: *[]
   * }[]} states basic values / базовые значения
   * @param {{
   *     index:string,
   *     name:string,
   *     value:(string|boolean)[],
   *     state:Object<string,*>[]
   *   }[]} parent
   * @return {this}
   * @private
   */
  __initValueState (
    states = this.states,
    parent = undefined
  ) {
    states?.forEach(({
      index,
      item,
      state
    }) => {
      const property = this.properties[index]

      if (property) {
        if (parent) {
          const value = {
            index,
            name: property.name,
            value: this.__getValue(item?.value),
            state: []
          }

          parent.push(value)
          this.__initValueState(state, value.state)

          if (
            value.state.length > 0 &&
            value.value.length === 0
          ) {
            value.value.push(true)
          }
        } else {
          this.__initValueState(state, this.properties[index]?.state)
        }
      }
    })

    return this
  }
}
