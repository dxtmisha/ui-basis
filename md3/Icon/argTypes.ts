import { active, disabled, hide, icon, turn } from '../stories/argTypes'

export const argTypes = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :arg-basic
  icon,
  iconActive: icon,
  active: {
    ...active,
    description: 'Switching to a secondary image<br><br>Переход на вторичное изображение'
  },
  turn,
  disabled,
  hide,
  // :arg-basic
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :arg-types
    rounded: {
      control: 'select',
      options: ['none', 'standard', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
      table: {
        category: 'Styles',
        type: { summary: 'none | standard | sm | md | lg | xl | 2xl | full' }
      }
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: {
        category: 'Styles',
        type: { summary: 'xs | sm | md | lg | xl' }
      }
    },
    overlay: {
      control: 'boolean',
      description: 'Adding a background<br><br>Добавление фона',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    dynamic: {
      control: 'boolean',
      description: 'Adding a hover event<br><br>Добавление события hover',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    animationType: {
      control: 'select',
      options: ['type1', 'type2'],
      description: 'Animation when hiding an image<br><br>Анимация при скрытии изображения',
      table: {
        category: 'Styles',
        defaultValue: { summary: 'type1' },
        type: { summary: 'type1 | type2' }
      }
    },
    animationShow: {
      control: 'boolean',
      description: 'Enabling appearance animation after loading<br><br>Включение анимации появления после загрузки',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    start: {
      control: 'boolean',
      description: 'Moving an element to the beginning<br><br>Перемещение элемента в начало',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    end: {
      control: 'boolean',
      description: 'Moving an element to the end<br><br>Перемещение элемента в конец',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    high: {
      control: 'boolean',
      description: 'Raising an element above other elements<br><br>Поднятие элемента поверх других элементов',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    }
    // :arg-types
  }
}
