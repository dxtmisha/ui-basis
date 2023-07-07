'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Image = void 0
const vue_1 = require('vue')
const ImageAdaptive_1 = require('./ImageAdaptive')
const ImageBackground_1 = require('./ImageBackground')
const ImageCoordinator_1 = require('./ImageCoordinator')
const ImageData_1 = require('./ImageData')
const ImagePosition_1 = require('./ImagePosition')
const ImageType_1 = require('./ImageType')
/**
 * Base class for working with images and icons
 *
 * Базовый класс для работы с изображениями и иконками
 */
class Image {
  element
  className
  image
  coordinator
  size
  x
  y
  group
  adaptive
  adaptiveAlways
  width
  height
  url
  type
  data
  background
  coordinatorItem
  position
  adaptiveItem
  /**
     * Constructor
     * @param element image element for scaling / элемент изображения для масштабирования
     * @param className base name of the current class / базовое название текущего класса
     * @param image values from the image / значения из изображения
     * @param coordinator coordinates for margins / координаты для отступов
     * @param size property determining the size of the picture / свойство определяющее размер картины
     * @param x coordinate of the picture on the left / координата картины слева
     * @param y coordinate of the picture on the top / координата картины сверху
     * @param group group name / название группы
     * @param adaptive activity status / статус активности
     * @param adaptiveAlways does the element always participate / участвует ли элемент всегда
     * @param width physical width of the object / физическая ширина объекта
     * @param height physical height of the object / физическая высота объекта
     * @param url link to the folder with images / ссылка на папку с изображениями
     */
  constructor (element, className, image, coordinator, size, x, y, group, adaptive, adaptiveAlways, width, height, url) {
    this.element = element
    this.className = className
    this.image = image
    this.coordinator = coordinator
    this.size = size
    this.x = x
    this.y = y
    this.group = group
    this.adaptive = adaptive
    this.adaptiveAlways = adaptiveAlways
    this.width = width
    this.height = height
    this.url = url
    this.type = new ImageType_1.ImageType(image)
    this.data = new ImageData_1.ImageData(this.type, this.image, this.url)
    this.coordinatorItem = new ImageCoordinator_1.ImageCoordinator(this.coordinator)
    this.position = new ImagePosition_1.ImagePosition(this.coordinatorItem, this.x, this.y)
    this.adaptiveItem = new ImageAdaptive_1.ImageAdaptive(this.element, this.data, this.group, this.adaptive, this.adaptiveAlways, this.width, this.height)
    this.background = new ImageBackground_1.ImageBackground(this.data, this.coordinatorItem, this.adaptiveItem, this.size)
  }

  /**
     * Destructor
     */
  destructor () {
    this.adaptiveItem.remove()
  }

  /**
     * Values for the text
     *
     * Значения для текста
     */
  text = (0, vue_1.computed)(() => {
    const image = this.image.value
    const type = this.type.get()
    if (type &&
            typeof image === 'string' &&
            [
              'filled',
              'outlined',
              'round',
              'sharp',
              'two-tone',
              'material'
            ].indexOf(type) !== -1) {
      return image.replace(/^(filled|outlined|round|sharp|two-tone)-/, '')
    } else {
      return undefined
    }
  })

  /**
     * Values for the class
     *
     * Значения для класса
     */
  classes = (0, vue_1.computed)(() => {
    const type = this.type.get()
    const data = {
      [`${this.className}--type--${type}`]: type !== undefined,
      notranslate: true
    }
    switch (type) {
      case 'la':
      case 'lab':
        if (typeof this.image.value === 'string') {
          data[`lab ${this.image.value.replace('lab-', 'la-')}`] = true
        }
        break
      case 'filled':
      case 'outlined':
      case 'round':
      case 'sharp':
      case 'two-tone':
      case 'material':
        data['material-icons'] = true
        break
    }
    return data
  })

  /**
     * Values for the style
     *
     * Значения для стиля
     */
  styles = (0, vue_1.computed)(() => {
    switch (this.type.get()) {
      case 'file':
      case 'image':
        return {
          'background-image': this.background.getImage(),
          'background-size': this.background.get(),
          'background-position-x': this.position.getX(),
          'background-position-y': this.position.getY()
        }
      case 'public':
        return { 'mask-image': this.background.getImage() }
      case 'color':
        return { 'background-color': this.image.value }
    }
    return {}
  })
}
exports.Image = Image
// # sourceMappingURL=Image.js.map
