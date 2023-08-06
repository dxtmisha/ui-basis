export const argTypes = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :arg-basic
  value: {
    control: {
      type: 'number',
      min: 0,
      max: 100,
      step: 5
    },
    table: {
      category: 'Value',
      type: { summary: 'number' }
    }
  },
  max: {
    control: {
      type: 'number',
      min: 0,
      max: 500,
      step: 50
    },
    description: 'Maximum permissible value<br><br>Максимально допустимое значение',
    table: {
      category: 'Value',
      defaultValue: { summary: '100' },
      type: { summary: 'number' }
    }
  },
  visible: {
    control: 'boolean',
    table: {
      category: 'Status',
      type: { summary: 'boolean' }
    }
  },
  delay: {
    control: {
      type: 'number',
      min: 0,
      step: 100
    },
    description: 'Bootloader display delay<br><br>Задержка отображения загрузчика',
    table: {
      category: 'Options',
      defaultValue: { summary: '400' },
      type: { summary: 'number' }
    }
  },
  // :arg-basic
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :arg-types
    linear: {
      control: 'boolean',
      table: {
        category: 'Styles',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    circular: {
      control: 'boolean',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    indeterminate: {
      control: 'select',
      options: ['type1', 'type2'],
      table: {
        category: 'Styles',
        defaultValue: { summary: 'type1' },
        type: { summary: 'type1 | type2' }
      }
    },
    position: {
      control: 'select',
      options: ['top', 'bottom'],
      table: {
        category: 'Styles',
        defaultValue: { summary: 'top' },
        type: { summary: 'top | bottom' }
      }
    },
    dense: {
      control: 'boolean',
      description: 'Remove the indents<br><br>Убрать отступы',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    },
    inverse: {
      control: 'boolean',
      description: 'Make the color the same as the text color<br><br>Сделать цвет таким же, как у текста',
      table: {
        category: 'Styles',
        type: { summary: 'boolean' }
      }
    }
    // :arg-types
  }
}
