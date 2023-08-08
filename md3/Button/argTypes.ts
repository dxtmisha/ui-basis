import {
  category,
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
  detail,
  focus,
  selected,
  progress,
  disabled,
  iconTurn: {
    ...turn,
    description: 'Flipped right icon<br><br>Перевернутая правая иконка',
    table: {
      category: category.icon,
      type: { summary: 'boolean' }
    }
  },
  iconHide: {
    ...hide,
    description: 'Hide the left icon<br><br>Скрыть левую иконку',
    table: {
      category: category.icon,
      type: { summary: 'boolean' }
    }
  },
  tag: tagForButton,
  // :arg-basic
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :arg-types
    filled: {
      control: 'boolean',
      description: 'Filled buttons have the most visual impact after the FAB, and should be used for important, final actions that complete a flow, like Save, Join now, or Confirm',
      table: {
        category: 'Styles',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    outlined: {
      control: 'boolean',
      description: 'Outlined buttons are medium-emphasis buttons. They contain actions that are important, but aren’t the primary action in an app<br><br>Outlined buttons pair well with filled buttons to indicate an alternative, secondary action',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    text: {
      control: 'boolean',
      description: 'Text buttons are used for the lowest priority actions, especially when presenting multiple options<br><br>Text buttons can be placed on a variety of backgrounds. Until the button is interacted with, its container isn’t visible',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    elevated: {
      control: 'boolean',
      description: 'Elevated buttons are essentially filled tonal buttons with a shadow. To prevent shadow creep, only use them when absolutely necessary, such as when the button requires visual separation from a patterned background',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    tonal: {
      control: 'boolean',
      description: 'A filled tonal button is an alternative middle ground between filled and outlined buttons. They’re useful in contexts where a lower-priority button requires slightly more emphasis than an outline would give, such as "Next" in an onboarding flow. Tonal buttons use the secondary color mapping',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    adaptive: {
      control: 'select',
      options: ['sm', 'md', 'icon'],
      description: 'Adapts the size of the button by removing text when the screen width matches<br><br>Адаптирует размер кнопки, убирая текст при соответствии ширины экрана',
      table: {
        category: 'Styles',
        type: { summary: 'sm | md | icon' }
      }
    }
    // :arg-types
  }
}
