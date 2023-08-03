import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Progress from './Md3Progress.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'MD3/Md3Progress',
  component: Md3Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      min: 0,
      max: 100,
      step: 5
    },
    max: {
      control: 'number',
      min: 0,
      max: 500,
      step: 50
    },
    visible: { control: 'boolean' },
    linear: { control: 'boolean' },
    circular: { control: 'boolean' },
    indeterminate: {
      control: 'select',
      options: ['type1', 'type2']
    },
    position: {
      control: 'select',
      options: ['top', 'bottom']
    },
    dense: { control: 'boolean' },
    inverse: { control: 'boolean' },
    delay: {
      control: 'number',
      min: 0,
      step: 100
    }
  },
  args: {
    max: 100,
    visible: true,
    linear: true,
    indeterminate: 'type1',
    position: 'top',
    delay: 400
  }
} satisfies Meta<typeof Md3Progress>

type Story = StoryObj<typeof meta>;

export default meta

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
