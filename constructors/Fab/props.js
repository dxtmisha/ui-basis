'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.propsFab = exports.defaultsFab = exports.subClassesFab = void 0
const props_1 = require('../Button/props')
// Type describing subclasses
// Тип, описывающий подклассы
exports.subClassesFab = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :subclass
    inscription: 'inscription',
    icon: 'icon',
    trailing: 'trailing'
    // :subclass
  }
}
// Default value for property
// Значение по умолчанию для свойства
exports.defaultsFab = {
  ...props_1.defaultsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :default
    // :default
  }
}
// Fab for property
// Конструктор для свойства
exports.propsFab = {
  ...props_1.propsButton,
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    selected: Boolean,
    disabled: Boolean,
    progress: Boolean,
    adaptive: String,
    align: String
    // :prop
  }
}
// # sourceMappingURL=props.js.map
