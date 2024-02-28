import { PropType } from 'vue'

import { propsButtonEvent, PropsButtonEventType } from './ButtonEvent'
import { propsButtonLabel, PropsButtonLabelType } from './ButtonLabel'
import { propsButtonIcon, PropsButtonIconType } from './ButtonIcon'
import { propsButtonProgress, PropsButtonProgressType } from './ButtonProgress'

// Type describing subclasses<br>
// Тип, описывающий подклассы
export const subclassesButton = {
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

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsButtonBasicType = PropsButtonLabelType
  & PropsButtonEventType
  & PropsButtonIconType
  & PropsButtonProgressType
  & {
  // Options
  tag?: 'button' | 'a' | 'span' | string
}

// Type describing incoming properties<br>
// Тип, описывающий входящие свойства
export type PropsButtonType = PropsButtonBasicType & {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :type
  selected?: boolean
  disabled?: boolean
  // :type
  /* :type.adaptive.none */
  /* :type.progress.none */
}

// Default value for property<br>
// Значение по умолчанию для свойства
export const defaultsButton: PropsButtonType = {
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
export const propsButton = {
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :prop
    selected: Boolean,
    disabled: Boolean
    // :prop
    /* :prop.adaptive.none */
    /* :prop.progress.none */
  },
  ...propsButtonLabel,
  ...propsButtonIcon,
  ...propsButtonEvent,
  ...propsButtonProgress,

  // Options
  tag: {
    type: String as PropType<PropsButtonType['tag']>,
    default: defaultsButton?.tag
  }
}
