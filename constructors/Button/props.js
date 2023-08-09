'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.propsButton = exports.defaultsButton = exports.subclassesButton = void 0
const ButtonEvent_1 = require('./ButtonEvent')
const ButtonLabel_1 = require('./ButtonLabel')
const ButtonIcon_1 = require('./ButtonIcon')
const ButtonProgress_1 = require('./ButtonProgress')
// Type describing subclasses<br>
// Тип, описывающий подклассы
exports.subclassesButton = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    label: 'label',
    icon: 'icon',
    trailing: 'trailing',
    progress: 'progress'
    // :subclass
  }
}
// Default value for property<br>
// Значение по умолчанию для свойства
exports.defaultsButton = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  },
  tag: 'button'
}
// Button for property
// Конструктор для свойства
exports.propsButton = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    selected: Boolean,
    disabled: Boolean,
    adaptive: String
    // :prop
  },
  ...ButtonLabel_1.propsButtonLabel,
  ...ButtonIcon_1.propsButtonIcon,
  ...ButtonEvent_1.propsButtonEvent,
  ...ButtonProgress_1.propsButtonProgress,
  // Options
  tag: {
    type: String,
    default: exports.defaultsButton?.tag
  }
}
// # sourceMappingURL=props.js.map
