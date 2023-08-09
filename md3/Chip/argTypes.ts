export const argTypes = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :arg-basic
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
    selected: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    outlined: {
      control: 'boolean',
      table: {
        category: 'Styles',
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
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    assist: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    filter: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    suggestion: {
      control: 'boolean',
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
    focus: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    dragged: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    progress: {
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
