import {
  detail,
  disabled,
  focus,
  hide,
  icon,
  label,
  progress,
  selected,
  tagForButton,
  turn,
  value
} from '../stories/argTypes'

export const argTypes = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :arg-basic
  label,
  icon,
  iconTrailing: icon,
  value: {
    ...value,
    description: 'Data for passing to events<br><br>Данные для передачи в события'
  },
  iconTurn: {
    ...turn,
    description: 'Flipped right icon<br><br>Перевернутая правая иконка'
  },
  iconHide: {
    ...hide,
    description: 'Hide the left icon<br><br>Скрыть левую иконку'
  },
  detail,
  focus,
  selected,
  progress,
  disabled,
  tag: tagForButton,
  // :arg-basic
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :arg-types
    filled: {
      control: 'boolean',
      table: {
        category: 'Styles',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    elevated: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    adaptive: {
      control: 'select',
      options: ['icon'],
      table: {
        category: 'Styles',
        type: { summary: 'icon' }
      }
    }
    // :arg-types
  }
}
