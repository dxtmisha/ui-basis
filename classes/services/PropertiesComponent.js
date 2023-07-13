const {
  forEach,
  uniqueArray,
  isFilled
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
const FILE_INDEX_COMPOSITION = 'index-composition.vue'
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
  props

  /**
   * Constructor
   * @param {string} name component name / названия компонента
   * @param {boolean} cache enabling caching / включение кэширования
   * @param {string[]} designs list of design names / список названий дизайнов
   */
  constructor (
    name,
    cache = true,
    designs = undefined
  ) {
    this.name = name
    this.properties = new Properties(cache, designs)

    this.__initProps()
  }

  /**
   * Returns all properties of this component
   *
   * Возвращает все свойства этого компонента
   * @return {Object<string, *>}
   */
  get () {
    return this.__getByLink(this.name)
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
   * Returns a list of classes
   *
   * Возвращает список классов
   * @param {Object<string,*>} data list of properties / список свойств
   * @param {string[]} parentName Ancestor name / Название предка
   * @return {Object<string,string>}
   */
  getClasses (
    data = this.get()?.value,
    parentName = []
  ) {
    const list = {}

    forEach(data, (item, name) => {
      if (this.__isClasses(item)) {
        const newName = [...parentName, name]

        list[To.camelCase(newName.join('-'))] = newName.join('__')
        Object.assign(list, this.getClasses(item?.value, newName))
      }
    })

    return list
  }

  /**
   * Converting all classes to string
   *
   * Преобразование всех классов в строку
   * @return {string}
   */
  getClassesJson () {
    return JSON.stringify(this.getClasses())
  }

  /**
   * Returns the property available for props
   *
   * Возвращает свойство, доступное для props
   * @return {Object<string,{
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
  getProps () {
    return this.props
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
   * Returns available types for property
   *
   * Возвращает доступные типы для свойства
   * @param {(string|boolean)[]} value values to check / значения для проверки
   * @return {string[]}
   */
  getPropsType (value) {
    const type = []

    if (this.isBoolean(value)) {
      type.push('Boolean')
    }

    if (this.isString(value)) {
      type.push('String')
    }

    if (type.length === 0) {
      type.push('Boolean')
    }

    return type
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
          item,
          type: 'property',
          className: undefined
        })
      }

      if (this.__isLinkClass(item)) {
        properties.push({
          index,
          item: this.__getByLink(item?.value),
          type: 'link-class',
          className: PropertiesTool.toClass(item?.value)
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
   *     type:string,
   *     className:string,
   *     value:(string|boolean)[],
   *     valueAll:(string|boolean)[],
   *     state:{
   *       index:string,
   *       name:string,
   *       value:(string|boolean)[],
   *       state:Object<string,*>[]
   *     }[],
   *     style?:boolean,
   *     default?:boolean,
   *     category?:string
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
   * Returns a string with the data type
   *
   * Возвращает строку с типом данных
   * @param {(string|boolean)[]} value values to check / значения для проверки
   * @param {boolean} style is the property style present / является ли свойство style
   * @return {string}
   */
  getTypeByName (value, style) {
    const type = []

    if (this.isBoolean(value)) {
      type.push('boolean')
    }

    if (style) {
      type.push('string')
    }

    if (this.isString(value)) {
      value.forEach(item => type.push(item === true ? 'true' : `'${item}'`))
    }

    if (type.length === 0) {
      type.push('boolean')
    }

    return type.join(' | ')
  }

  /**
   * Returns a string with the data type
   *
   * Возвращает строку с типом данных
   * @param {(string|boolean)[]} value values to check / значения для проверки
   * @param {boolean} style is the property style present / является ли свойство style
   * @return {string}
   */
  getTypeOptionsByName (value, style) {
    const type = this.getPropsType(value)
    const typeValue = this.getTypeByName(value, style)

    return `[${type.join(', ')}]${typeValue !== '' && typeValue !== 'boolean' ? ` as PropType<${typeValue}>` : ''}`
  }

  /**
   * Returns default values
   *
   * Возвращает значения по умолчанию
   * @param {string|boolean} value
   * @return {string}
   */
  getDefault (value) {
    if (typeof value === 'string') {
      return `'${value}'`
    } else {
      return `${value}`
    }
  }

  getFileMain () {
    return `${this.getName()}.vue`
  }

  /**
   * Returns the filename index
   *
   * Возвращает название файла index
   * @param {boolean} composition if true, returns a template of type composition / если true,
   * возвращает шаблон типа composition
   * @return {string}
   */
  getFileIndex (composition = true) {
    return composition ? FILE_INDEX_COMPOSITION : FILE_INDEX
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
   * Checks if the data type is boolean
   *
   * Проверяет, является ли тип данных булевым
   * @param {(string|boolean)[]} value values to check / значения для проверки
   * @return {boolean}
   */
  isBoolean (value) {
    return value.indexOf(true) !== -1
  }

  /**
   * Checks if the data type is string
   *
   * Проверяет, является ли тип данных строковым
   * @param {(string|boolean)[]} value values to check / значения для проверки
   * @return {boolean}
   */
  isString (value) {
    return value.length > 0 && value[0] !== true
  }

  /**
   * Generating a record for props
   *
   * Генерация записи для props
   * @return this
   * @private
   */
  __initProps () {
    this.props = this.__getProps()

    this.__toPropsValue()
      .__toPropsValueAll()
      .__toPropsUpdate()
      .__toPropsState()

    return this
  }

  /**
   * Retrieves all properties for preparing data filling
   *
   * Получает все свойства для подготовки заполнения данными
   * @return {Object<string,{
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
   * @private
   */
  __getProps () {
    const keyDefault = PropertiesTool.getKeyDefault()
    const keyCategory = PropertiesTool.getKeyCategory()
    const properties = {}

    this.getState().forEach(({
      index,
      item,
      type,
      className
    }) => {
      properties[index] = {
        index,
        name: this.__toName(item, index),
        type,
        className,
        value: [],
        valueAll: [],
        state: [],
        style: undefined,
        default: item?.[keyDefault],
        category: item?.[keyCategory]
      }
    })

    return properties
  }

  /**
   * Returns all properties of a component by its reference
   *
   * Возвращает все свойства компонента по его reference
   * @param {string} link link to a property / ссылка на свойство
   * @return {Object<string, *>}
   */
  __getByLink (link) {
    return this.properties.get().getItemByIndex(link) || {}
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
   * Checks whether the property is a reference to a class
   *
   * Проверяет, является ли свойство ссылкой на класс
   * @param {Object<string,*>} item object for checking / объект для проверки
   * @return {boolean}
   * @private
   */
  __isLinkClass (item) {
    return item?.[PropertiesTool.getKeyVariable()] === 'link-class' &&
      typeof item?.value === 'string'
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
   * @return {boolean}
   * @private
   */
  __isStyle (item) {
    return !!item?.[PropertiesTool.getKeyStyle()]
  }

  /**
   * Receives the default values
   *
   * Получает базовые значения
   * @param {Object<string,*>} data list of properties / список свойств
   * @return {this}
   * @private
   */
  __toPropsValue (data = this.get()?.value) {
    this.getStateOnly(data).forEach(({
      item,
      props
    }) => props.value.push(...this.__toValue(item?.value)))

    return this
  }

  /**
   * Gets all possible values
   *
   * Получает всех возможных значения
   * @param {Object<string,*>} data list of properties / список свойств
   * @return {this}
   * @private
   */
  __toPropsValueAll (data = this.get()?.value) {
    this.getStateOnly(data).forEach(({
      item,
      props
    }) => {
      const value = this.__toValue(item?.value)

      props.valueAll.push(...value)

      if (this.__isState(value)) {
        this.__toPropsValueAll(item.value)
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
      props.valueAll = uniqueArray(props.valueAll)
      props.style = this.__isStyle(item)

      if (!isFilled(props.value)) {
        props.value = [true]
      }

      if (!isFilled(props.valueAll)) {
        props.valueAll = [true]
      }
    })

    return this
  }

  /**
   * Updates values in a map
   *
   * Обновляет значения в карте
   * @param {Object<string,*>} data list of properties / список свойств
   * @param {{
   *     index:string,
   *     name:string,
   *     value:(string|boolean)[],
   *     state:Object<string,*>[]
   *   }[]} state
   * @return {this}
   * @private
   */
  __toPropsState (
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
        this.__toPropsState(item?.value, newState.state)
      } else {
        this.__toPropsState(item?.value, props.state)
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
        !this.props ||
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
