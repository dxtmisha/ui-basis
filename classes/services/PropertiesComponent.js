const {
  forEach,
  uniqueArray
} = require('../../functions/data')

const { To } = require('../To')

const Properties = require('./Properties')
const PropertiesTool = require('./PropertiesTool')

/**
 * List available for addition to props
 *
 * Список доступный для добавления в props
 * @type {string[]}
 */
const LIST_PROPS = [
  'disabled',
  'focus',
  'read-only'
]

const FILE_INDEX = 'index.vue'
const FILE_PROPS = 'props.ts'
const FILE_PROPS_DESIGN = 'props.design.ts'
const FILE_PROPERTIES = 'properties.json'

/**
 * Class for preparing data for components
 *
 * Класс для подготовки данных для компонентов
 */
module.exports = class PropertiesComponent {
  /**
   * @type {Object<string,{
   *   index:string,
   *   name:string,
   *   value:(string|boolean)[],
   *   map:{
   *     index:string,
   *     name:string,
   *     value:(string|boolean)[],
   *     state:Object<string,*>[]
   *   }[],
   *   style?:boolean,
   *   default?:boolean
   * }>}
   */
  props

  /**
   * Constructor
   * @param {string} name component name / названия компонента
   * @param {boolean} cache enabling caching / включение кэширования
   */
  constructor (
    name,
    cache = true
  ) {
    this.name = name
    this.properties = new Properties(cache)
  }

  /**
   * Returns all properties of this component
   *
   * Возвращает все свойства этого компонента
   * @return {Object<string, *>}
   */
  get () {
    return this.properties.get().getItemByIndex(this.name) || {}
  }

  /**
   * Returns the property available for props
   *
   * Возвращает свойство, доступное для props
   * @return {Object<string,{index:string, name:string, value:(string|boolean)[], style?:boolean, default?:boolean}>}
   */
  getProps () {
    if (this.props === undefined) {
      this.props = this.__getProps()

      this.__toPropsValue()
        .__toPropsUpdate()
        .__toPropsMap()
    }

    return this.props
  }

  /**
   * Returns records that meet state conditions
   *
   * Возвращает записи, удовлетворяющие условиям состояния
   * @param {Object<string,*>} data input data / входной данный
   * @return {{index:string,item:Object<string,*>}[]}
   */
  getState (data = this.get()?.value) {
    const properties = []

    forEach(data, (item, index) => {
      if (this.__isProps(item)) {
        properties.push({
          index,
          item
        })
      }
    })

    return properties
  }

  /**
   * Returns records that meet state conditions and already exist in props
   *
   * Возвращает записи, удовлетворяющие условиям состояния и уже находящиеся в props
   * @param {Object<string,*>} data input data / входной данный
   * @return {{
   *   index:string,
   *   item:Object<string,*>,
   *   props: {
   *     index:string,
   *     name:string,
   *     value:(string|boolean)[],
   *     map:{
   *       index:string,
   *       name:string,
   *       value:(string|boolean)[],
   *       state:Object<string,*>[]
   *     }[],
   *     style?:boolean,
   *     default?:boolean
   *   }
   * }[]}
   */
  getStateOnly (data = this.get()?.value) {
    return forEach(this.getState(data), ({
      index,
      item
    }) => {
      if (index in this.props) {
        return {
          index,
          item,
          props: this.props[index]
        }
      }
    }, true)
  }

  /**
   * Returns all properties as a JSON string
   *
   * Возвращает все свойства в виде строки JSON
   * @return {string}
   */
  getPropsJson () {
    return JSON.stringify(Object.values(this.getProps()))
  }

  /**
   * Returns a list of classes
   *
   * Возвращает список классов
   * @return {string[]}
   */
  getClasses () {
    return forEach(this.get()?.value, (item, name) => {
      if (this.__isClasses(item)) {
        return name
      }
    }, true)
  }

  /**
   * Returns the name of the design
   *
   * Возвращает название дизайна
   * @return {string}
   */
  getDesign () {
    return To.kebabCase(this.name.match(/^[^.]+/)?.[0] || 'd')
  }

  /**
   * Returns the name of the component
   *
   * Возвращает название компонента
   * @return {string}
   */
  getComponent () {
    return To.camelCaseFirst(
      this.name.replace(/^([^.]+\.)(.*?)$/, '$2') || 'component'
    )
  }

  /**
   * Returns the full name of the component
   *
   * Возвращает полное название компонента
   * @return {string}
   */
  getName () {
    return To.camelCaseFirst(`${this.getDesign()}${this.getComponent()}`)
  }

  /**
   * Returns the full name of the component in lower case
   *
   * Возвращает полное название компонента в нижнем регистре
   * @return {string}
   */
  getNameLower () {
    return To.kebabCase(this.getName())
  }

  /**
   * Returns the full name of the component as a path to a list of properties
   *
   * Возвращает полное название компонента в виде пути к списку свойств
   * @return {string}
   */
  getNameForStyle () {
    return To.kebabCase(`${this.getDesign()}.${this.getComponent()}`)
  }

  /**
   * Returns the filename index
   *
   * Возвращает название файла index
   * @return {string}
   */
  getFileIndex () {
    return FILE_INDEX
  }

  /**
   * Returns the filename props
   *
   * Возвращает название файла props
   * @return {string}
   */
  getFileProps () {
    return FILE_PROPS
  }

  /**
   * Returns the filename props.design
   *
   * Возвращает название файла props.design
   * @return {string}
   */
  getFilePropsDesign () {
    return FILE_PROPS_DESIGN
  }

  /**
   * Returns the filename properties
   *
   * Возвращает название файла properties
   * @return {string}
   */
  getFileProperties () {
    return FILE_PROPERTIES
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
    const isProps = item?.[PropertiesTool.getKeyProps()]
    return isProps !== false && (
      isProps === true ||
      item?.[PropertiesTool.getKeyVariable()] === 'state' ||
      LIST_PROPS.indexOf(item?.[PropertiesTool.getKeyName()]) !== -1
    )
  }

  /**
   * Is the property a state type
   *
   * Является ли свойство типом состояния
   * @param {(string|boolean)[]} value
   * @return {boolean}
   * @private
   */
  __isState (value) {
    return value.indexOf(true) !== -1
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
    return item?.[PropertiesTool.getKeyVariable()] === 'subclass'
  }

  /**
   * Checks if the property is available for addition to style
   *
   * Проверяет, доступно ли свойство для добавления в style
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @param {(string|boolean)[]} value available property / доступное свойство
   * @return {boolean}
   * @private
   */
  __isStyle (item, value) {
    return item?.[PropertiesTool.getKeyStyle()] !== false && value?.[0] !== true
  }

  /**
   * Retrieves all properties for preparing data filling
   *
   * Получает все свойства для подготовки заполнения данными
   * @return {Object<string,{
   *   index:string,
   *   name:string,
   *   value:(string|boolean)[],
   *   map:{
   *     index:string,
   *     name:string,
   *     value:(string|boolean)[],
   *     state:Object<string,*>[]
   *   }[],
   *   style?:boolean,
   *   default?:boolean
   * }>}
   * @private
   */
  __getProps () {
    const keyDefault = PropertiesTool.getKeyDefault()
    const properties = {}

    this.getState().forEach(({
      index,
      item
    }) => {
      properties[index] = {
        index,
        name: this.__toName(item, index),
        value: [],
        map: [],
        style: undefined,
        default: item?.[keyDefault]
      }
    })

    return properties
  }

  /**
   * Gets all possible values
   *
   * Получает всех возможных значения
   * @param {Object<string,*>} data
   * @return {this}
   * @private
   */
  __toPropsValue (data = this.get()?.value) {
    this.getStateOnly(data).forEach(({
      item,
      props
    }) => {
      const value = this.__toValue(item?.value)

      props.value.push(...value)

      if (this.__isState(value)) {
        this.__toPropsValue(item.value)
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
  __toPropsUpdate () {
    this.getStateOnly().forEach(({
      item,
      props
    }) => {
      const value = uniqueArray(props.value)

      props.value = value
      props.style = this.__isStyle(item, value)
    })

    return this
  }

  /**
   * Updates values in a map
   *
   * Обновляет значения в карте
   * @param {Object<string,*>} data
   * @param {{
   *     index:string,
   *     name:string,
   *     value:(string|boolean)[],
   *     state:Object<string,*>[]
   *   }[]} state
   * @return {this}
   * @private
   */
  __toPropsMap (
    data = this.get()?.value,
    state = undefined
  ) {
    this.getStateOnly(data).forEach(({
      index,
      item,
      props
    }) => {
      if (state) {
        const newState = {
          index,
          name: props.name,
          value: this.__toValue(item?.value),
          state: []
        }

        state.push(newState)
        this.__toPropsMap(item?.value, newState.state)
      } else {
        this.__toPropsMap(item?.value, props.map)
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
    return To.camelCase(
      item?.[PropertiesTool.getKeyPropsName()] || name
    )
  }

  /**
   * Returns all available values
   *
   * Возвращает все доступные значения
   * @param {Object<string,*>} properties array with all property records / массив со всеми записями свойств
   * @return {(string|boolean)[]}
   * @private
   */
  __toValue (properties) {
    const keyPropsValue = PropertiesTool.getKeyPropsValue()
    const keyVariable = PropertiesTool.getKeyVariable()
    const value = []
    let isTrue = false

    forEach(properties, (property, name) => {
      if (
        !(name in this.props) ||
        property?.[keyPropsValue]
      ) {
        if (property?.[keyVariable] === 'state') {
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
}
