export const argTypes = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :arg-basic
  // :arg-basic
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :arg-types
    filled: {
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
    progress: {
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
