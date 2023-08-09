'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.propsChip = exports.defaultsChip = exports.subclassesChip = void 0
const props_1 = require('../Button/props')
// Type describing subclasses<br>
// Тип, описывающий подклассы
exports.subclassesChip = {
  ...props_1.subclassesButton,
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
exports.defaultsChip = {
  ...props_1.defaultsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}
// Chip for property
// Конструктор для свойства
exports.propsChip = {
  ...props_1.propsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    selected: Boolean,
    disabled: Boolean,
    adaptive: String
    // :prop
  }
}
// # sourceMappingURL=props.js.map
