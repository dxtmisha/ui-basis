import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Progress from './Md3Progress.vue'
import { stories } from '../stories'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  ...stories,
  title: 'MD3/Md3Progress',
  component: Md3Progress,
  tags: ['autodocs'],
  argTypes: {
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
      description: 'Maximum permissible value<br><br>' +
        'Максимально допустимое значение',
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
      description: 'Bootloader display delay<br><br>' +
        'Задержка отображения загрузчика',
      table: {
        category: 'Options',
        defaultValue: { summary: '400' },
        type: { summary: 'number' }
      }
    },
    linear: {
      control: 'boolean',
      table: {
        category: 'Style',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    circular: {
      control: 'boolean',
      table: {
        category: 'Style',
        type: { summary: 'boolean' }
      }
    },
    indeterminate: {
      control: 'select',
      options: ['type1', 'type2'],
      table: {
        category: 'Style',
        defaultValue: { summary: 'type1' },
        type: { summary: 'type1 | type2' }
      }
    },
    position: {
      control: 'select',
      options: ['top', 'bottom'],
      table: {
        category: 'Style',
        defaultValue: { summary: 'top' },
        type: { summary: 'top | bottom' }
      }
    },
    dense: {
      control: 'boolean',
      table: {
        category: 'Style',
        type: { summary: 'boolean' }
      }
    },
    inverse: {
      control: 'boolean',
      table: {
        category: 'Style',
        type: { summary: 'boolean' }
      }
    }
  },
  args: {
    visible: true
  }
} satisfies Meta<typeof Md3Progress>

type Story = StoryObj<typeof meta>;

export default meta

export const Progress: Story = {
  name: 'Progress, visible'
}

export const LinearType1: Story = {
  name: 'Linear, indeterminate=type1',
  args: {
    visible: true,
    linear: true,
    indeterminate: 'type1'
  }
}

export const LinearType2: Story = {
  name: 'Linear, indeterminate=type2',
  args: {
    visible: true,
    linear: true,
    indeterminate: 'type2'
  }
}

export const CircularType1: Story = {
  name: 'Circular, indeterminate=type1',
  args: {
    visible: true,
    circular: true,
    indeterminate: 'type1'
  }
}

export const CircularType2: Story = {
  name: 'Circular, indeterminate=type2',
  args: {
    visible: true,
    circular: true,
    indeterminate: 'type2'
  }
}
