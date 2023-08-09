import {
  category,
  detail,
  disabled,
  dragged,
  focus,
  hide,
  icon,
  label,
  progress,
  selected,
  tagForChip,
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
  dragged,
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
  tag: tagForChip,
  // :arg-basic
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :arg-types
    height: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Styles',
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' }
      }
    },
    outlined: {
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
    input: {
      control: 'boolean',
      description: 'Input chips represent discrete pieces of information entered by a user, such as Gmail contacts or filter options within a search field<br><br>They enable user input and verify that input by converting text into chips',
      table: {
        category: 'Styles',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    assist: {
      control: 'boolean',
      description: 'Assist chips represent smart or automated actions that can span multiple apps, such as opening a calendar event from the home screen. Assist chips function as though the user asked an assistant to complete the action. They should appear dynamically and contextually in a UI<br><br>An alternative to assist chips are buttons, which should appear persistently and consistently',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    filter: {
      control: 'boolean',
      description: 'Filter chips use tags or descriptive words to filter content. They can be a good alternative to toggle buttons or checkboxes<br><br>Tapping on a filter chip activates it and appends a leading checkmark icon to the starting edge of the chip label',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    suggestion: {
      control: 'boolean',
      description: 'Suggestion chips help narrow a user’s intent by presenting dynamically generated suggestions, such as possible responses or search filters',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    avatar: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    palette: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'error', 'neutral', 'neutral-variant'],
      table: {
        category: 'Styles',
        type: { summary: 'primary | secondary | tertiary | error | neutral | neutral-variant' }
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
