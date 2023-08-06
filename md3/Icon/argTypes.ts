import { active, disabled, hide, icon, turn } from '../stories/argTypes'

export const argTypes = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :arg-basic
  icon,
  iconActive: icon,
  active,
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
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    dynamic: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    animationType: {
      control: 'select',
      options: ['type1', 'type2'],
      table: {
        category: 'Styles',
        type: { summary: 'type1 | type2' }
      }
    },
    animationShow: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    start: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    end: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    high: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    }
    // :arg-types
  }
}
